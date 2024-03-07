import { Router } from 'express'
import { 
    shoppingCart, test 
} from './carrito.controller.js'
import { validateJwt } from '../middleware/validate-jwt.js'

let api = Router()

api.get('/test', test)
api.post('/shoppingCart', [validateJwt], shoppingCart)

export default api