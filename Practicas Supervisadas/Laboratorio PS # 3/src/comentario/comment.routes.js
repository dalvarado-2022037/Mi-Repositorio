import { Router } from 'express'
import { addComment, deleteCommen, test, updateComment } from './comment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)
api.post('/addComment/:id', [validateJwt], addComment)
api.put('/updateComment/:id', [validateJwt], updateComment)
api.delete('/deleteCommen/:id', [validateJwt], deleteCommen)

export default api