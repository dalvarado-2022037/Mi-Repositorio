'use strict'

import Company from './company.model.js'
import { checkUpdate } from '../utils/validator.js'
import Category from '../Categoria Empresarial/category.model.js'
import XlsxPopulate from 'xlsx-populate'

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

export const searchCompany1 = async(req, res)=>{
    try{
        let { search } = req.body
        let sentido = 0
        
        return res.send({message: 'The companys: ', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to searchCompany'}) 
    }
}

export const searchCompany = async(req, res)=>{
    try{
        let { fecha, name, category } = req.body
        let sentido = 0
        let company
        if(fecha){
            if(fecha == 'new')
                sentido = -1
            if(fecha == 'old')
                sentido = 1
            company = await Company.find({}).sort({yearsExperience:sentido})
        }else if(name){
            if(name == 'asc')
                sentido = 1
            if(name == 'desc')
                sentido = -1
            company = await Company.find({}).sort({ name: sentido })
        }else if(category)
            company = await Company.find({ name: category })
        else
            company = await Company.find({})
        
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

export const excelCompany = async(req, res)=>{
    try{
        let companys = await Company.find({})
        //Regex para veridicar que solo alla 1 número
        let regex1Day= /^\d$/;
        /**
         * MAP: En JavaScript, map es un método que se utiliza en 
         * arreglos para iterar sobre cada elemento y realizar 
         * una operación en cada uno de ellos
         * 
         * Promise.all() es un método que toma un 
         * iterable de promesas (por ejemplo, un arreglo de promesas) 
         * y devuelve una sola promesa que se resuelve cuando todas 
         * las promesas del iterable se han resuelto o alguna 
         * de ellas ha sido rechazada. Es como decir un async de un arreglo,
         * asi podemos decir que company es asyncrona
        */
        let data = await Promise.all(companys.map(async(company) => {
            //Buscamos la categoria
            let category = await Category.findOne({_id: company.businessCategory})
            //Primero modificaremos la fecha para que salga en formato Año-Mes-Dia
            let fecha = new Date(company.yearsExperience)

            let dia = regex1Day.test(fecha.getDate())
            if(dia) dia = '0' + fecha.getDate()
            
            let mes = regex1Day.test(fecha.getMonth())
            if(mes) mes = '0' + fecha.getMonth()
            
            let year = fecha.getFullYear()
            let complete = dia + '/' + mes  + '/' + year
            let info = [
                company.name, 
                company.address, 
                company.impactLevel,
                complete,
                category.name
            ]
            return info
        }))           

        let workbook = await XlsxPopulate.fromBlankAsync()
        workbook.sheet(0).cell('A1').value([
            ['Name','Address','Impact Level','Years Experience','Busimess Category'],
            [data]
        ])
        workbook.toFileAsync('./exel.xlsx')
        return res.send({message: 'Se a creado el archivo'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to "name"'}) 
    }
}
/**
    try{
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to the connected to "name"'}) 
    }
 */