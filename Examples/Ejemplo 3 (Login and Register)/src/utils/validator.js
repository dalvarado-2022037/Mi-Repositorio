//Encriptar, validar... diferentes datos

import { hash } from 'bcrypt';

export const encrypt = async(password)=>{
    try{
        return await hash(password, 10)//El valor y cuantas capas
    }catch(err){
        console.error(err)
        return err
    }
}


