'use strict'
//Rutas del usuario

import express from 'express'
import { register, test } from './user.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/register',register)

export default api

//export const api <- importar con otro nombre _____
//export default api <- tengo si o si el nombre que está en este archivo
