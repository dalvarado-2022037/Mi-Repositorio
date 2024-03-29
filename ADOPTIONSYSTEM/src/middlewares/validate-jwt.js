'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try{
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY 
        //Obtener el token de los headers
        let { token } = req.headers
        //Verificar si viene el token
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //Obtener el uid que envió el token
        let { uid } = jwt.verify(token,secretKey)
        //Validar si el usuario aún existe en la BD
        let user = await User.findOne({_id:uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'})
        //Ok del Middleware
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}

// Profe
export const isAdmin = async(req, res, next)=>{
    try{
        let { role, username } = req.user
        if(!role || role != 'ADMIN') return res.status(403).send({message: `You dont have acces | username ${username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorizes role'}) 
    }
}

/* Yo
export const isAdmin = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        let { role } = jwt.verify(token,secretKey)
        if(role == 'ADMIN') return next()
        console.log('el rol es: '+ role)
        return res.status(400).send({message: 'Error indetectado'})
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorizes role'}) 
    }
}*/