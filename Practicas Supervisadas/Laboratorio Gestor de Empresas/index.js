import { initServerd } from './config/app.js'
import { connect } from './config/mongo.js'
import { categoriaDefault } from './src/Categoria Empresarial/category.controller.js'

initServerd()
connect()
categoriaDefault()