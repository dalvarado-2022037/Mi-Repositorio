//Asincrona
//Esperar a que se ejecute por completo una instrucción, sin obstruir
//el hilo de procesos.

//Formas de manejar la asincronia:

/*
*1. Callbacks -> Desuso!!!
*2. Promesas
*3. Async / Await -> la mejor opción
*/
/*
//CALLBAKS

function getUsersWithCallback(callback){
    //llamada asincrona 
    //Consultar a spotify (consultar una cancion en la db)
    //3ms (se tardara en recibir la informacion)
    //si es sincrona
    //si son 1000ms la espera se alargara y se realizara lento los procesos de obtencion de info
    fetch('https://randomuser.me/api/') //Consulta a un Endpoint
        .then(response => response.json()) //Traducir o entender el JSON
        .then(data => {
            const {results} = data; //Se esta desestructurando (mi entendimineto sacar una caja de otra :v)
            callback(null,results) //1. Error /2. Respuesta (Un callback siempre tendra estos dos)
        })
        .catch(error => {
            console.error(error)
            callback(error, null)
        })
}
getUsersWithCallback((error, results)=>{
    if(error) console.error(error)
    const name = document.getElementById('name')
    const surname = document.getElementById('surname')
    const phone = document.getElementById('phone')
    console.log(results)
    console.log(typeof results) // Tipo objeto (o arreglo)
    for (const user of results) {
        name.innerText = user.name.first
        surname.innerText = user.name.last
        phone.innerText = user.phone
    }
})*/

/*
//PROMISES
const getUsersWithPromise = ()=>{
    // a + b (como no es asincrona, continuara realizando la accion mientras se espera la info de la bd (anterior))
    //c + x
    return new Promise((resolve, reject)=>{
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data =>{
            const {results} = data;
            resolve(results)
        })
        .catch(error => reject(error))
    })
}

getUsersWithPromise()
    .then(results => {
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')
        for (const user of results) {
            name.innerText = user.name.first
            surname.innerText = user.name.last
            phone.innerText = user.phone
        }
    })
    .catch(error => console.error(error))
*/

//ASYNC / AWAIT
const getUsersWithAsync = async ()=>{
    try {
        const response = await fetch('https://randomuser.me/api/?results=10') //AUTOMATICAMENTE LO GUARDA EN LA CONSTANTE
        const { results } = await response.json() //Se desestructura y lo parseo
        //createElement append
        /*
        const users = document.getElementById('users')
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')*/
        for (const user of results) {
            users.innerHTML += `
                <tr>
                    <td>${user.name.first}</td>
                    <td>${user.name.last}</td>
                    <td>${user.phone}</td>
                </tr>
            `

            /*name.innerText = user.name.first
            surname.innerText = user.name.last
            phone.innerText = user.phone*/
        }
    } catch (error) {
        console.error(error)
    }
}

getUsersWithAsync()

/*Funcion declarativa
async function nombre(){

}*/

/*
getUsersWithCallback() //<- proceso 1

getUsersWithPromise() //<- proceso 2
*/

/* mio
const getUsersWithAsync = async ()=>{
    repetidor = 0
    const usuarios = []
    while(repetidor<10){
        try {
            const response = await fetch('https://randomuser.me/api/?result=10') //AUTOMATICAMENTE LO GUARDA EN LA CONSTANTE
            const { results } = await response.json() //Se desestructura y lo parseo
            //createElement
            const name = document.getElementById('name')
            const surname = document.getElementById('surname')
            const phone = document.getElementById('phone')
            for (const user of results) {
                name.innerText = user.name.first
                surname.innerText = user.name.last
                phone.innerText = user.phone
                usuarios.push([user.name.first , user.name.last , user.phone])
            }
            console.log(results)
            for (const usuario of usuarios) {
                console.log(usuario)
            } 
            console.log('Modificado' + usuarios[0].primero)
        } catch (error) {
            console.error(error)
        }
        repetidor++
    }
    repetidor = 0
}
*/