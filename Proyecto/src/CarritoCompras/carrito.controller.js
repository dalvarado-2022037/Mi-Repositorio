import Carrito from './carrito.model.js'
import Products from '../Productos/productos.model.js'

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
        
        if(cantidad>productEsxit.stock) 
            return res.status(400).send({message: 'There are not enough products'})
        
        let exist = await Carrito.findOne({cliente: uid})
        if(!exist){
            let data = {
                cliente: uid,
                products: productEsxit,
                cantidad: cantidad
            }
            let newCart = new Carrito(data)
            await newCart.save()
            return res.send({message: 'Producto add'})
        }else{
            if(exist.products.incluides(id)){
                let lugar = exist.products.indexOf(id)
                if(exist.cantidad[lugar]+cantidad > productEsxit.stock){
                    let posibleCompra = productEsxit.stock-exist.cantidad[lugar]
                    return res.send({message: `There arent that many products to buy ${posibleCompra}`})
                }
                exist.cantidad[lugar] =  exist.cantidad[lugar] + cantidad
                await exist.save()
            }else{
                exist.products.push(id)
                exist.cantidad.push(cantidad)
                await exist.save()
            }
        }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to shoppingCart'}) 
    }
}