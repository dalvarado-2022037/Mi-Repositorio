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
            return res.send({message: 'Producto add, current products:  ', newCart})
        }else{
            let cantidadExistente = 0
            let { data } = await Carrito.findOne({_id: exist.id, "data.products": id})
            for (let i = 0; i < data.length; i++) 
                if(data[i].products == id)
                    cantidadExistente = data[i].cantida
            if(parseInt(cantidad)+cantidadExistente>productEsxit.stock)
                return res.status(400).send({message: 'You cannot buy more than what exists'})
            let inc = await Carrito.findOneAndUpdate({_id: exist.id, "data.products": id}, {$inc: {"data.$.cantida": parseInt(cantidad)}})
            if(!inc){
                exist.data.push({products:productEsxit, cantida: cantidad})
                await exist.save()
                return res.send({message: 'Producto add, current products: ', exist})
            }
            return res.send({message: 'Producto add, current products: ', inc})
        }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to shoppingCart'}) 
    }
}

export const deletedProduct = (req, res)=>{
    try{
        let { id } = req.params
        let { producto, cantidad } = req.body
        let { uid } = req.user

        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to shoppingCart'}) 
    }
}