import { Router } from 'express';
import { 
    addFactura, 
    lookForAllFactura,
    testFactura, 
    viewFactura 
} from '../Facturas/factura.controller.js'
import { validateJwt, isAdmin } from '../middleware/validate-jwt.js'

const api = Router()

//Cualquiera
api.get('/testFactura', testFactura)

//Cualquiera logeado
api.post('/viewFactura/:id', [validateJwt], viewFactura)

//Solo admin
api.post('/addFactura', [validateJwt, isAdmin], addFactura)
api.get('/lookForAllFactura', [validateJwt, isAdmin], lookForAllFactura)


export default api