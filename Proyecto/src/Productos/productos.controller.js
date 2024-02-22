'use strict'

import Product from './productos.model.js'

export const testProducts = (req, res)=>{
    return res.send('Conectado a productos')
}

export const addProduct = async(req, res)=>{
    try{
        let data = req.body
        let product = new Product(data)
        await product.save()
        return res.send({message: 'Product successfully added'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error product could not be added',err})
    }
}

export const viewProduct = async(req, res)=>{
    try{
        let { name } = req.body
        let product = await Product.findOne({name})
        if (product){
            let loggedProduct = {
                username: product.name,
                name: product.category,
                role: product.dueDate,
                description:  product.description,
                price: product.price
            }
            return res.send({message: `The ${product.name} found`, loggedProduct})
        }
        return res.status(404).send({message: 'Invalid Name'})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

export const lookForAllProducts = async(req, res)=>{
    try{
        let all = await Product.find({})
        return res.send({message: all})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

export const updateProdu = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedProduct = await Product.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedProduct) return res.status(401).send({message: 'The product could not be updated'})
        return res.send({message: 'Updated product', updateProdu})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Unexpected error while updating'})
    }
}

export const deleteProdu = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedProduct = await Product.findOneAndDelete({_id: id})
        if(!deletedProduct) return res.status(404).send({message: 'The product could not be deleted'})
        return res.send({message: `The product: ${deletedProduct.name} has been successfully removed`})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Unexpected error while deleting'})
    }
}