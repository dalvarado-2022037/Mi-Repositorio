//import Factura from './factura.model.js'

export const testFactura = (req, res)=>{
    return res.send('Conectado a Factura')
}

export const shoppingCart = async(req, res)=>{
    try{
        return res.send({message: 'Product added to shopping cart'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error when placing the shopping cart',err})
    }
}

export const buyOnlyProduct = async(req, res)=>{
    
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
        let { id } = req.body
        let factura = await Factura.findOne({_id:id})
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
