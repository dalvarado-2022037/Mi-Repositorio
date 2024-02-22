'use strict'

import { Router } from 'express'
import { getAppointmentByUser, save } from './appointment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

//Rutas privadas - CLIENT
api.post('/saveAp', [validateJwt], save)
api.get('/getAppointmentByUser', [validateJwt], getAppointmentByUser)

export default api