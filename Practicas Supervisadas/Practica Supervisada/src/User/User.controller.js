import User from './User.model.js'
import { checkPassword, encrypt } from '../utils/validator.js'

export const testUser = (req,res)=>{
    return res.send('Conecto con Usuarios')
}

export const teacher = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'TEACHER_ROLE'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Course successfully added'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error course could not be added',err})
    }
}

export const registrer = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'STUDENT_ROLE'
        let user = new User(data)
        user.save()
        return res.send({message: 'Course successfully added'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error course could not be added',err})
    }
}

export const login = async(req,res)=>{
    try {
        let { username, password} = req.body
        let user = await User.findOn({username})
        if(user || await checkPassword())
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})   
    }
}