'use stric'

import Publication from './public.model.js'

export const test = (req, res)=>{
    res.send({message: 'Connected to publication'})
}

export const addPublication = async(req, res)=>{
    try{
        let { uid } = req.user
        let data = req.body
        if(!data) return res.status().send({message: 'No data sent'})
        data.user = uid
        let publication = new Publication(data)
        try{
            await publication.save()
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'Error saving user respect all data'}) 
        }
        return res.send({message: 'Saved publication'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to addPublication'}) 
    }
}

export const lookAllPublication = async(req, res)=>{
    try{
        let publications = await Publication.find({}).populate('user', ['userName'])
        return res.send({message: 'Publications: ', publications})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to lookAllPublication'}) 
    }
}

export const lookAtMyPosts = async(req, res)=>{
    try{
        let { uid } = req.user
        let publications = await Publication.find({user:uid})
        return res.send({message: 'Publications: ', publications})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to lookAtMyPosts'}) 
    }
}

export const updatePublication = async(req, res)=>{
    try{
        let { id } = req.params
        let publication = await Publication.findOne({_id:id})
        if(!publication) return res.status(404).send({message: 'The publication has not been found'})
        
        let { uid } = req.user
        if(publication.user!=uid) return res.status(404).send({message: 'You cannot modify other people`s posts'})
        
        let data = req.body
        let publicationUpdate = await Publication.findOneAndUpdate(
            {_id:id},
            data,
            {new: true})
        
        if(!publicationUpdate) return res.status(404).send({message: 'Internal error could not update'})
        return res.send({message: 'Post updated successfully', publicationUpdate})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to updatePublication'}) 
    }
}

export const deletePublication = async(req, res)=>{
    try{
        let { uid } = req.user
        let { id } = req.params
        let publication = await Publication.findOne({_id:id})
        if(!publication) return res.status(404).send({message: 'The publication has not been found'})
        if(publication.user!=uid) return res.status(404).send({message: 'You cannot delete other people`s posts'})
        let publicationDelete = await Publication.findOneAndDelete({_id:id})
        if(!publicationDelete) return res.status(404).send({message: 'Internal error could not deleted'})
        return res.send({message: `The publication ${publicationDelete.titulo} delete successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to deletePublication'}) 
    }
}