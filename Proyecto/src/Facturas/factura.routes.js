import { Router } from 'express';
import { addFactura, daleteFactura, lookForAllFactura, testFactura, updateFactura, viewFactura } from './factura.controller.js'

const api = Router()

api.get('/testFactura',testFactura)
api.post('/addFactura',addFactura)
api.post('/viewFactura',viewFactura)
api.get('/lookForAllFactura',lookForAllFactura)
api.put('/updateFactura/:id',updateFactura)
api.delete('/daleteFactura/:id',daleteFactura)

export default api