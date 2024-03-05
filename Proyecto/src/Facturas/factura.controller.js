import Factura from './factura.model.js'
import Products from '../Productos/productos.model.js'
let productosLista = []

export const testFactura = (req, res)=>{
    return res.send('Conectado a Factura')
}

export const shoppingCart = async(req, res)=>{
    try{
        let { id } = req.params
        let { cantidad } = req.body
        let regex = /^\d+$/
        let productEsxit = await Products.findOne({_id: id})
        if(!productEsxit) 
            return res.status(404).send({message: 'The product does not exist'})
        if(!regex.test(cantidad))
            return res.status(400).send({message: 'Only numerical data in Cantidad'})
        if(cantidad>productEsxit.stock) 
            return res.status(400).send({message: 'There are not enough products'})

        let stock = productEsxit.stock - cantidad
        let updatedProduct = await Products.findOneAndUpdate(
            {_id: id},
            {stock: stock,
             venta: stock},
            {new: true}
        )
        if(!updatedProduct) return res.status(401).send({message: 'Product could not be added'})
        productosLista.push(productEsxit)
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
