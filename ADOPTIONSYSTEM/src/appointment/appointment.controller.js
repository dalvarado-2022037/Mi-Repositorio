'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from '../appointment/appointment.model.js'

export const save = async(req, res)=>{
    try{
        //Capturar la data
        let data = req.body
        data.user = req.user._id        
        let regex = /(\d{4})\/(\d{2})\/(\d{2})/
        //delete data.status
        //Verificar que exista el animal
        let animal = await Animal.findOne({_id: data.animal})
        if(!animal) return res.status(404).send({message: 'Animal not found'})
        //Validar que la mascota no tenga una cita activa con esa persona <-
        //Validar si un animal ya tiene una cita o si un usuario ya tiene cita
        //EJERCICIO <- Solo pueda tener una cita por dia
        let appointmentExist = await Appointment.findOne({
            $or: [
                {
                    animal: data.animal,
                    user: data.user
                },
                {
                    date: { $regex: `^${regex}` },
                    user: data.user
                }
            ]
        })
        console.log(appointmentExist.date)
        if(appointmentExist) return res.send({message: 'Appointment already exist'})
        
        //Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointment saved successfully, for the data ${appointment.date}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving appointment', err}) 
    }
}

export const getAppointmentByUser = async(req, res)=>{
    try{
        //Capturar el id del usuario logeado
        let { _id } = req.user
        //Buscar los datos ({parametro: 0}) -> no devuelva ese parametro
        let appointments = await Appointment.find({user: _id}, {user: 0})
            .populate('animal')
        return res.send({message: 'Yout appointments: ', appointments})
    }catch(err){
        console.error(err)
        return res.status(500).sed({message: 'Error getting appointments', err}) 
    }
}

