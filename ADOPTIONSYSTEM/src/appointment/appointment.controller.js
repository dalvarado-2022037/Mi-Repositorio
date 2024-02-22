'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from '../appointment/appointment.model.js'

export const save = async(req, res)=>{
    try{
        //Capturar la data
        let data = req.body
        data.user = req.user._id
        //delete data.status
        //Verificar que exista el animal
        let animal = await Animal.findOne({_id: data.animal})
        if(!animal) return res.status(404).send({message: 'Animal not found'})
        //Validar que la mascota no tenga una cita activa con esa persona <-
        //Validar si un animal ya tiene una cita o si un usuario ya tiene cita
        let appointmentExist = await Appointment.findOne({
            $or: [
                {
                    animal: data.animal
                },
                {
                    user: data.user
                }
            ]
        })
        if(appointmentExist) return res.send({message: 'Appointment already exist'})
        //EJERCICIO <-
        //Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointment saved successfully, for the data ${appointment.date}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving appointment', err}) 
    }
}

