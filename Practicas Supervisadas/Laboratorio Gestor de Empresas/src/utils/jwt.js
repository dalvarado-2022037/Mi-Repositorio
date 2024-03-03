'use strict'
import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRETKEY || '@LlaveSecretaParaGestorEmpresas@'

export const generateJwt = async(payload)=>{
    try{
        return jwt.sign(payload, secretKey, {
            expiresIn: '6h',
            algorithm: 'HS256' 
        })
    }catch(err){
        console.error(err)
        return err 
    }
}