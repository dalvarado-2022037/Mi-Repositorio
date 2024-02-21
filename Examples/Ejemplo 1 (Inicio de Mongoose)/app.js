//EsModules - acual
/*Se llama app.js por convenciones*/
import express from 'express' // import java.util...
const app = express() // Creando el servidor
const port = 3220

/**
 * Metodos HTTP
 * get -> obtener
 * post
 * put
 * delete
 */

//Enrutamiento
app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.get('/getId/:id', (req , res)=>{//:id significa que es un parametro que se envia por ruta
    let { id } = req.params //Desestructuracion //console.log(typeof id)
    let complexId = id + 1
    res.send(`product with id ${complexId}`)
}) 

app.get('/user/:id/:phone?', (req, res)=>{
    let phone = req.params.phone ?? 'Not configured'
    res.send(`User Id is ${req.params.id}, with phone ${phone}`)
})

app.listen(port, ()=> console.log(`Server is runnig in port ${port}`)) // String templates - string litera