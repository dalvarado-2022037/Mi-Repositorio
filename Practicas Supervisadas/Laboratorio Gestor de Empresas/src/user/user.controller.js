'use strinct'

import User from './user.model.js'
import { encryt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res)=>{
    return res.send({message: 'Connetec to user'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        if(!data) return res.status(400).send({message: 'No data sent'})
        data.password = await encryt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: 'Saved user'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to register'}) 
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password, gmail} = req.body
        let user = await User.findOne({
            $or: [
                {userName: username},
                {gmail: gmail}
            ]
        })
        if(user && await checkPassword(password, user.password)){
            let loggerdUser = {
                uid: user.id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggerdUser)
            return res.send({message: `Welcome ${user.name}`,loggerdUser,token})
        }
        return res.status(401).send({message: 'Invalid credentials'})   
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to login'}) 
    }
}

export const update = async(req, res)=>{
    try{
        let { uid } = req.user
        let { id } = req.params
        let data = req.body
        let updateVerify = checkUpdate(data, 'user')

        if(!updateVerify) 
            return res.status(400).send({message: 'Have sumbmitted some data that cannot be updated or missing data'})
        
        if(data.passwordModify)
            if(!data.passwordInto)
                return res.status(400).send({message: 'Please enter your account passwordInto'})
            else{
                let userCheck = await User.findOne({_id: uid})
                if(!await checkPassword(data.passwordInto, userCheck.password))
                    return res.status(400).send({message: 'Invalid credentials'})
                data.password = await encryt(data.passwordModify)
            }

        if(uid != id) 
            return res.status(403).send({message: 'You cannot alter this users information.'})

        let updateUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true})

        if(!updateUser) 
            return res.status(401).send({message: 'User not found and not updated'})
        
        return res.send({message: 'Updated user', updateUser})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to update'}) 
    }
}
