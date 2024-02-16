'use strict'
//Rutas del usuario

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { deleteU, login, register, test, update } from './user.controller.js'

const api = express.Router()

//Middleware
api.get('/test', [validateJwt, isAdmin], test) //<- Solo si esta logeado
api.post('/register',register)
api.post('/login',login)
api.put('/update/:id',update)
api.delete('/delete/:id',deleteU)

export default api

//export const api <- importar con otro nombre _____
//export default api <- tengo si o si el nombre que está en este archivo
