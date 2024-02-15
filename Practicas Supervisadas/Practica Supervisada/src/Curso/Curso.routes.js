import { Router } from 'express'
import { addCurso, deleteCurso, lookForAllCursos, testCuso, updateCurso, viewCurso } from './Curso.controller.js'

const api = Router()

api.get('/testCuso', testCuso)
api.post('/addCurso', addCurso)
api.post('/viewCurso', viewCurso)
api.get('/lookForAllCursos', lookForAllCursos)
api.put('/updateCurso', updateCurso)
api.delete('/deleteCurso', deleteCurso)

export default api