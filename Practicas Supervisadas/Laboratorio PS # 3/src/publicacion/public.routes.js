import { Router } from 'express'
import { addPublication, deletePublication, lookAllPublication, lookAtMyPosts, test, updatePublication } from './public.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)
api.post('/addPublication', [validateJwt], addPublication)
api.get('/lookAllPublication', [validateJwt], lookAllPublication)
api.get('/lookAtMyPosts', [validateJwt], lookAtMyPosts)
api.put('/updatePublication/:id', [validateJwt], updatePublication)
api.delete('/deletePublication/:id', [validateJwt], deletePublication)

export default api