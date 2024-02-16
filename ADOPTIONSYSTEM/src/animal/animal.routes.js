'use strict'

import express from 'express'
import { addAnimal, deleteAnim, lookFor, lookForAll, test, updatedAnimal } from './animal.controller.js'

const api = express.Router()

api.get('/test',test)
api.post('/addAnimal', addAnimal)
api.post('/lookForAnimal', lookFor)
api.put('/updatedAnimal/:id', updatedAnimal)
api.delete('/deleteAnim/:id',deleteAnim)
api.get('/lookForAll', lookForAll)

export default api