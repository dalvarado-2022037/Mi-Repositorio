'use strict'

import Company from './company.model.js'
import { checkUpdate } from '../utils/validator.js'
import Category from '../Categoria Empresarial/category.model.js'

export const test = (req, res)=>{
    return res.send({message: 'Connetec to user'})
}

export const addCompany = async(req, res)=>{
    try{
        let data = req.body
        if(!data) return res.status(400).send({message: 'No data sent'})
        let company = new Company(data)
        await company.save()
        return res.send({message: 'Saved company'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to addCompany'}) 
    }
}

export const companyUpdate = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let exist = await Company.findOne({_id:id})
        if(!exist)
            return res.status(400).send({message: 'The company not exist'})

        let update = checkUpdate(data, 'company')
        if(!update) 
            return res.status(400).send({message: 'Have sumbmitted some data that cannot be updated or missing data'})

        let updatedCompany = await Company.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )

        if(!updatedCompany) 
            return res.status(401).send({message: 'Company not found and not updated'})

        return res.send({message: 'Updated company', updatedCompany})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const companyDelete = async(req, res)=>{
    try{
        let { id } = req.params
        let exist = await Company.findOne({_id:id})
        if(!exist)
            return res.status(400).send({message: 'The company not exist'})

        let deleteCompany = await Company.findOneAndDelete({_id:id})
        if(!deleteCompany) 
            return res.status(404).send({message: 'The Company not foud and not deleted'})
        
        return res.send({message: `Company with name ${deleteCompany.name} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to companyDelete'}) 
    }
}

export const viewAllCompany = async(req, res)=>{
    try{
        let company = await Company.find({})
        return res.send({message: 'The companys: ', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to viewAllCompany'}) 
    }
}

export const viewCompany = async(req, res)=>{
    try{
        let { id } = req.params
        let company = await Company.find({_id: id})
        return res.send({message: 'The companys: ', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to viewCompany'}) 
    }
}

export const searchCompany = async(req, res)=>{
    try{
        let { search } = req.body
        let sentido = 0
        if(search == 'asc')
            sentido = 1
        if(search == 'desc')
            sentido = -1
        let company = await Company.find({}).sort({ name: sentido })
        return res.send({message: 'The companys: ', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to searchCompany'}) 
    }
}

export const searchCompanyDate = async(req, res)=>{
    try{
        let { search } = req.body
        let sentido = 0
        if(search == 'new')
            sentido = -1
        if(search == 'old')
            sentido = 1
        let company = await Company.find({}).sort({yearsExperience:sentido})
        return res.send({message: 'The companys: ', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to searchCompanyDate'}) 
    }
}

export const searchCompanyCategory = async(req, res)=>{
    try{
        let { id } = req.params
        let category = await Category.findOne({_id:id})
        if(!category)
            return res.status(404).send({message: 'Category not found'})

        let company = await Company.find({businessCategory:id})
        return res.send({message: 'The companys: ', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to searchCompanyDate'}) 
    }
}
/**
    try{
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to "name"'}) 
    }
 */