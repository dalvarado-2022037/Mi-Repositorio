import Factura from './factura.model.js'

export const testFactura = (req, res)=>{
    return res.send('Conectado a Factura')
}

export const addFactura = async(req,res)=>{
    try{
        let data = req.body
        let factura = new Factura(data)
        await factura.save()
        return res.send({message: 'Added invoice'})
    }catch(error){
        console.error(err)
        return res.status(500).send({message: 'Error course could not be added',err})
    }
}

export const viewFactura = async(req, res)=>{
    try{
        let { name } = req.body
        let factura = await Factura.findOne({name})
        if (factura){
            let loggedFactura = {
                name: factura.name
            }
            return res.send({message: `The ${factura.name} found`, loggedFactura})
        }
        return res.status(404).send({message: 'Invalid Name'})
    }catch(error){
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

export const lookForAllFactura = async(req,res)=>{
    try{
        let all = await Factura.find({})
        return res.send({message: all})
    }catch(error){        
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

export const updateFactura = async(req,res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedFactu = await Factura.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateFactu) return res.status(401).send({message: 'The bill could not be updated'})
        return res.send({message: 'Updated bill', updatedFactu})
    }catch(error){
        console.error(err)
        return res.status(404).send({message: 'Unexpected error while updating'})
    }
}

export const daleteFactura = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteFactu = await Factura.findOneAndDelete({_id:id})
        if(!deleteFactu) return res.status(404).send({message: 'The bill could not be deleted'})
        return res.send({message: `The course: ${deleteFactu.name} has been successfully removed`})
    }catch(error){
        
    }
}