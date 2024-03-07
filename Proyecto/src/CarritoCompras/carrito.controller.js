import Carrito from './carrito.model.js'
import Products from '../Productos/productos.model.js'
import mongoose from 'mongoose'

export const test = (req, res)=>{
    return res.send({message: 'Connected to Cart'})
}

export const shoppingCart = async(req, res)=>{
    try{
        let { id } = req.params
        let { cantidad } = req.body
        let { uid } = req.user
        let regex = /^\d+$/
        
        let productEsxit = await Products.findOne({_id: id})
        if(!productEsxit) 
            return res.status(404).send({message: 'The product does not exist'})
        
        if(!regex.test(cantidad))
            return res.status(400).send({message: 'Only numerical data in Cantidad'})
        
        if(parseInt(cantidad)>productEsxit.stock) 
            return res.status(400).send({message: 'There are not enough products'})
        
        let exist = await Carrito.findOne({cliente: uid})
        if(!exist){
            let dataCart = {
                cliente: uid,
                data: {
                    products: productEsxit,
                    cantida: parseInt(cantidad)
                }
            }
            let newCart = new Carrito(dataCart)
            await newCart.save()
            return res.send({message: 'Producto add'})
        }else{
            for (let i = 0; i < exist.data.length; i++) {
                if(id==exist.data[i].products);{
                    console.log('Zi');
                    break
                }
            }
            if(exist.data.incluides(id).products){
                let lugar = exist.data.indexOf(id)
                if(exist.data[lugar].cantidad+cantidad > productEsxit.stock){
                    let posibleCompra = productEsxit.stock-exist.data[lugar].cantidad
                    return res.send({message: `There arent that many products to buy ${posibleCompra}`})
                }
                exist.data[lugar].cantidad =  exist.data[lugar].cantidad + cantidad
                await exist.save()
            }else{
                exist.data.push(id, cantidad)
                await exist.save()
            }
        }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to shoppingCart'}) 
    }
}