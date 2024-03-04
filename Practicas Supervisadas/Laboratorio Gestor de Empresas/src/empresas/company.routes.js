import { Router } from 'express'
import { addCompany, companyDelete, companyUpdate, excelCompany, searchCompany, test, viewAllCompany, viewCompany } from './company.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)
api.post('/addCompany', addCompany)
api.put('/companyUpdate/:id', [validateJwt], companyUpdate)
api.delete('/companyDelete/:id', [validateJwt], companyDelete)
api.get('/viewAllCompany', [validateJwt], viewAllCompany)
api.get('/viewCompany/:id', [validateJwt], viewCompany)
api.get('/searchCompany', [validateJwt], searchCompany)
api.get('/searchCompany', [validateJwt], searchCompany)
api.get('/excelCompany', [validateJwt], excelCompany)

export default api