//Importaciones de las configuraciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
//Importaciones de las rutas
import useRouter from '../src/user/user.routes.js'
import categoryRouter from '../src/Categoria Empresarial/category.routes.js'
import companyRouter from '../src/empresas/company.routes.js'

let app = express()
config()
let port = process.env.PORT || 3500

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Usamos las rutas
app.use('/user', useRouter)
app.use('/category', categoryRouter)
app.use('/company', companyRouter)

export const initServerd = ()=>{
    app.listen(port)
    console.log(`Serverd HTTP running in port : ${port}`);
}