'use strict'

//Levantar el servidor HTTP
//Conectar a la BD

//CommonJS

const mongoose = require('mongoose')
const express = require('express')
const productRouter = require('./sr/routes/product.router')


//Promise / Callback
//Alt Shift a
/* const connect = ()=>{
    const uriMongo = 'mongodb://127.0.0.1:27017/EjemploIN6BV2024'
    mongoose.Promise = global.Promise //No sirve
    mongoose.connection.on('connecting', ()=>{
        console.log('MongoDB | Try connecting')
    })
    mongoose.connection.once('open', ()=>{
        console.log('MongoDB | connected to DB')
    })
    //Hasta aka
    mongoose.connect(uriMongo,{
        connectTimeoutMS: 8000,
        maxPoolSize: 50
    })//Ip de loopback 127.0.0.1
    .then(()=> console.log('Connected to DB'))
    .catch(err => console.error(err))
}
 */

//Async/Await
const connect = async ()=>{
    try{
        const uriMongo = 'mongodb://127.0.0.1:27017/EjemploIN6BV2024'
        await mongoose.connect(uriMongo)//Si falla -> catch
        return console.log('Connected to DB')
    }catch(err){
        console.error(err)
    }
}

//-------------------- Servidor de express ----------------
//Configurar servidor
const app = express()
const port = 3200
app.use(express.urlencoded({extended: false}))//Configurar la codigicacion
app.use(express.json())//Siempre formato JSON
app.use(productRouter)

//Levantar el servidor
const initServer = ()=> app.listen(port, ()=> console.log(`Listening on port ${port}`))

initServer()
connect()