//Importaciones / Esportaciones de Módulos

/**
 * 1. CommonJS -> +proyectos / Naci[o con NodeJs]
 * 2. ESModules -> -proyectos / +rápido (verificar la compatibilidad con las librerías)
 */

//CommonJS
const http = require('http')
                        //request, response
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'})//metadata
    res.end('Hola Kinal')
}).listen(3000)

console.log('El servidor esta corriendo')

//Control ñ para abrir la terminal
//Control C en la terminal para apagarlo 