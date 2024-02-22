'use strict'

import User from './user.model.js'
import { checkPassword, encrypt, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const testUser = (req, res)=>{
    return res.send('Connect User')
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registered successfully'})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error registering user', err})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOn({username})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({message: `Welcome ${user.username}`, loggedUser, token})
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const updateUser = async(req, res)=>{
    try{
        let { id } = req.params
        let { uid, role } = req.user
        let data = req.body
        if(role == 'CLIENT')
            if(id!=uid) 
                return res.status(403).send({message: 'You cannot alter this users information.'})
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbmitted some data that cannot be updated or missing data'})
        let updateUser = await User.findOneAndUpdate(
            {uid: id},
            data,
            {new: true}
        )
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'}) 
    }
}