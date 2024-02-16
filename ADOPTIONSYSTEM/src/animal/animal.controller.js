'use strict'

import Animal from './animal.model.js'
import User from '../user/user.model.js'

export const test = (req,res)=>{
    return res.send('Hello World')
}

export const addAnimal = async(req, res)=>{
    try{
        let data = req.body
        let { keeper } = req.body
        let user = await User.findOn({keeper})
        //if(user) return res.send({message: 'Si existe'})
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: 'Added animal '})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error adding'})
    }
}

export const lookForAll = async(req, res)=>{
    try{
        let all = await Animal.find({})
        return res.send({message: all})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

//Ver
export const lookFor = async(req, res)=>{
    try{
        let { name } = req.body
        let animal = await Animal.findOne({name})
        return res.send({message: `The animal ${name}`})
        if(animal){
            return res.send({message: `The animal was found: ${animal}`})
        }
        return res.send({message: 'No encontrado'})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

export const updatedAnimal = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedAnima = await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedAnima) return res.status(401).send({message: 'Animal not found and not updated'})
        return res.send({message: 'Updated animal', updatedAnima})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteAnim = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedAnimal = await Animal.findOneAndDelete({_id: id})
        if(!deletedAnimal) return res.status(404).send({message: 'The animal not foud and not deleted'})
        return res.send({message: `The animal:  ${deletedAnimal.name} deleted successfully`})
    }catch(err){
        console.err(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
