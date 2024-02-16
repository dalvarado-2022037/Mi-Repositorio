import { hash } from 'bcrypt';

export const encrypt = async(password)=>{
    try{
        return await hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}

export const checkPassword = async(password, has)=>{
    try{
        return await compare(password, has)
    }catch(err){
        console.error(err)
        return err
    }
}
