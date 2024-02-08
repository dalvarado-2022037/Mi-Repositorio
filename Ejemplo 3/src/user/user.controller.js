//Logica
'use strict'

import User from './user.model.js'
import { encrypt } from '../utils/validator.js'

//Logica

export const test = (req, res)=>{
    return res.send('Hello World')
}

export const register = async(req, res)=>{
    try{
        //Capturar la información del cliente (body)
        let data = req.body; //console.log(data)
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT' //Si viene con otro valor o no viene, lo asigna a rol CLIENTE
        //Crear una instancia del modelo (Schema)
        let user = new User(data)
        //Guardar la información
        await user.save()
        //Responder al usuari
        return res.send({message: 'Registered successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err})
    }
}


