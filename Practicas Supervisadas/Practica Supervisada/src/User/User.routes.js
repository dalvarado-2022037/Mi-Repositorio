import { Router } from 'express'
import { deleteUser, login, registrer, testUser, update } from './User.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/testUser', [validateJwt], testUser)
api.post('/registrer', registrer)
api.post('/login', login)
api.put('/updateUser/:id', [validateJwt], update)
api.post('/deleteUser/:id', [validateJwt], deleteUser)

export default api