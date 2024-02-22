import { Router } from 'express'
import { testUser } from './user.controller.js'

const api = Router()

api.get('/testUser', testUser)

export default api

