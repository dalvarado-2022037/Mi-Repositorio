'use stric'

import Comment from './comment.model.js'
import Publication from '../publicacion/public.model.js'

export const test = (req, res)=>{
    res.send({message: 'Connected to comment'})
}

export const addComment = async(req, res)=>{
    try{
        let { uid } = req.user
        let { id } = req.params
        let data = req.body
        let publication = await Publication.findOne({_id:id})
        if(!publication) return res.status(404).send({message: 'Publication not found'})
        data.user = uid
        data.publication = id
        let comment = new Comment(data)
        try{
            await comment.save()
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'Error save to comment'}) 
        }
        return res.send({message: 'Saved comment'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to addComment'}) 
    }
}

export const updateComment = async(req, res)=>{
    try{
        let { uid } = req.user
        let { id } = req.params
        let data = req.body
        let comment = await Comment.findOne({_id:id})
        if(!comment) return res.status(404).send({message: 'Comment not found'})
        if(comment.user != uid) return res.status(401).send({message: 'You cannot modify other people`s comments'})
        if(data.user || data.publication) return res.status(401).send({message: 'You cannot alter this data'})
        let commentUpdate = await Comment.findOneAndUpdate(
        {_id: id},
        data,
        {new: true})
        if(!commentUpdate) return res.status(404).send({message: 'Internal error could not update'})
        return res.send({message: 'Comment updated successfully', commentUpdate})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to updateComment'}) 
    }
}

export const deleteCommen = async(req, res)=>{
    try{
        let { id } = req.params
        let { uid } = req.user
        let comment = await Comment.findOne({_id:id})
        if(!comment) return res.status(404).send({message: 'Comment not found'})
        if(comment.user !=uid) return res.status(401).send({message: 'You cannot modify other people`s comments'})
        let commentDelete = await Comment.findOneAndDelete({_id:id})
        if(!commentDelete) return res.status(404).send({message: 'Internal error could not delete'})
        return res.send({message: `The comment delete successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to deleteCommenS'}) 
    }
}

/**
    try{
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to name'}) 
    }
 */