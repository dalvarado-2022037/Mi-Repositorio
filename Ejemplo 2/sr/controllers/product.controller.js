'use strict'

const Product = require('../models/product.model')//<- Objeto / Instancia

//Funciones Handler (lógica)
//Mejor versión actualmente //Buenas practicás
                        //Request , Response
exports.newProduct = async (req, res)=>{//Post
    try{
        //console.log(req.body) //Body es un objeto
        let {name, description, price} = req.body;
        let product = new Product() //Creamos una instancia (No se llama intancia no es orientado a objetos)
        product.name = name
        product.description = description
        product.price = price
        await product.save() //< - "await" Espera a que se termine de ejecutar est linea
        res.send({message: 'Product saved successfully'})
    }catch(err){
        console.error(err)
        res.status(500).send({message: 'Error creating product'})
    }
}



