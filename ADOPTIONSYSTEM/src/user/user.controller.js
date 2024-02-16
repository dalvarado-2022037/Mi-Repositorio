//Logica
'use strict'

import User from './user.model.js'
import { checkPassword, encrypt, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

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

export const login = async(req, res)=>{
    try{
        //Capturar la informacion (body)
        let { username, password } = req.body
        //Validar que el usuario existe
        let user = await User.findOne({username}) //username: 'Lo que manda el usuario'
        //Verifico que la contraseña coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user.id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            //Responder (dar acceso)
            return res.send({
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                })
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const update = async(req, res)=>{//Usuarios logeado
    try{
        //Obtener el id del usuario actualizar
        let { id } = req.params
        //Obtener datos que vamosn a actualizar
        let data = req.body
        //Validar si trae datos a actualizar
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbmitted some data that cannot be updated or missing data'})
        //Validar si tiene permisos (tokenización) x Hoy no lo vemos x
        //Actualizamos en la BD
        let updatedUser = await User.findOneAndUpdate(
            {_id: id}, //ObjetctId <- hexadecimal (Hora sys, version mongo, llave privada...)
            data, //Datos que va a actualizar
            {new: true} //Objeto de la BD ya actualizado (/Retorna el valor actualizado)
        )
        //Validar si se actualizo
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        //Responder con el dato actualizado
        return res.send({message: 'Updated user', updatedUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try{
        //Obtener el id
        let { id } = req.params
        //Validar si está logeado y es el mismo x
        //Eliminar (deleteOne / findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({_id: id})
        //Verificar que se eliminó
        if(!deletedUser) return res.status(404).send({message: 'Account not foud and not deleted'})
        //Responder
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`})
    }catch(err){
        console.err(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}