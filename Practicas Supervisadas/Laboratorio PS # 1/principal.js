function lista() {
    window.location.href = 'lista.html';
}

function agregar(){
    window.location.href = 'agregar.html';
}

function informacion(name,surname){
    window.location.href = `info.html`;
}

function favoritos(){
    window.location.href = 'favoritos.html';
}

function perfil(){
    window.location.href = 'perfil.html';
}

function salir(){
    window.location.href = 'index.html';
}

function agregarTarea() {
    var tareaIngreso = document.getElementById("tarea");
    var claseIngreso = document.getElementById("clase");
    var select = document.getElementById("prioridad");
    var selecionado = select.value;
    var clase = claseIngreso.value.trim()
    var tarea = tareaIngreso.value.trim();
    if (tarea !== "") {
        var tareas = document.getElementById("list");
        var elementoLista = document.createElement("li");
        elementoLista.innerHTML = `<span class="priority">Clase: ${clase} Descripcion:
            ${tarea} Prioridad: ${selecionado}         </span>
        <button class="btn btn-outline-success" type="submit" onclick="editarTarea(this)">Modificar</button>
        <button class="btn btn-outline-danger" type="submit" onclick="eliminarTarea(this)">Eliminar</button>`;
        tareas.appendChild(elementoLista);
        claseIngreso.value = "";
        tareaIngreso.value = "";
        select.value = 1;
    } else {
        alert("Por favor ingresa una tarea válida.");
    }
}

function editarTarea(btn) {
    var listaTareas = btn.parentElement;
    var nuevaClase = prompt("Editar Clase:");
    var nuevaDescripcion = prompt("Editar tarea:");
    var nuevoNivel = prompt("Editar nivel:");
    var numero = parseFloat(nuevoNivel);
    if(nuevaClase !== null)
        if (nuevaDescripcion !== null)
            if(nuevoNivel !== null)
                if(!isNaN(numero))
                    listaTareas.firstChild.textContent = `Clase: ${nuevaClase}  Descripcion: ${nuevaDescripcion}  Prioridad: ${nuevoNivel}`;
                else
                    alert("No es un numero")
}

function eliminarTarea(btn) {
    var listaTareas = btn.parentElement;
    listaTareas.remove();
}