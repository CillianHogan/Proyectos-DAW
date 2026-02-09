// pillo las cosas del html con el id
const miInput = document.getElementById('task-input');
const miSelector = document.getElementById('priority-select');
const miBoton = document.getElementById('add-task-btn');
const cajaTareas = document.getElementById('task-list');

// aqui guardo la lista. uso mislaborales-v1 para que no se me mezcle con otras pruebas
// si no hay nada en el storage pues array vacio y listo
let listaDeTareas = JSON.parse(localStorage.getItem('mislaborales-v1')) || [];
let filtroActual = 'all'; 

function dibujarTareas() {
    // limpio la caja siempre porque si no al añadir se me duplica todo el rollo
    cajaTareas.innerHTML = "";

    for (let i = 0; i < listaDeTareas.length; i++) {
        const tarea = listaDeTareas[i];

        // lo de los filtros: si no es la prioridad que toca, me la salto con continue
        if (filtroActual === 'high' && tarea.prioridad !== 'high') continue; 
        if (filtroActual === 'completed' && tarea.completada === false) continue;

        const item = document.createElement('div');
        
        // segun la prioridad le meto una clase u otra para el borde de color
        let clasePrioridad = "";
        if (tarea.prioridad === 'high') clasePrioridad = "prioridad-alta";
        if (tarea.prioridad === 'medium') clasePrioridad = "prioridad-media";
        if (tarea.prioridad === 'low') clasePrioridad = "prioridad-baja";

        // le meto el diseño de tailwind mas la prioridad
        item.className = "bg-white p-3 border-2 border-black flex justify-between items-center " + clasePrioridad;
        
        // si la tarea ya esta hecha le meto el estilo de tachado
        if (tarea.completada) {
            item.classList.add("tarea-completada");
        }

        // esto es un truco para que si pongo comillas en el texto no me pete el html
        const textoSeguro = tarea.texto.replace(/'/g, "&apos;");

        // meto el contenido. paso el texto a las funciones porque con el indice i me daba errores al filtrar
        item.innerHTML = `
            <div class="flex items-center gap-2">
                <input type="checkbox" ${tarea.completada ? 'checked' : ''} 
                       onclick="hacerCheck('${textoSeguro}')">
                <span class="font-bold">${tarea.texto}</span>
            </div>
            <button onclick="eliminarTarea('${textoSeguro}')" 
                    class="bg-red-500 text-white px-2 py-1 text-xs border-2 border-black font-bold uppercase">
                Borrar
            </button>
        `;

        cajaTareas.appendChild(item);
    }
}

// lo que pasa al dar al boton de añadir
miBoton.onclick = function() {
    if (miInput.value.trim() === "") {
        alert("¡Escribe algo primero!");
        return;
    }

    // creo el objeto de la tarea nueva
    const nueva = {
        texto: miInput.value,
        prioridad: miSelector.value,
        completada: false
    };

    listaDeTareas.push(nueva);
    // a guardar en el storage para que no se borre al refrescar
    localStorage.setItem('mislaborales-v1', JSON.stringify(listaDeTareas));
    
    dibujarTareas();
    miInput.value = ""; // limpio el cuadro de texto
};

function cambiarFiltro(tipo) {
    filtroActual = tipo;
    dibujarTareas(); 
}

// para borrar: busco en el array por el nombre de la tarea
function eliminarTarea(nombreABorrar) {
    if (confirm("¿Seguro que quieres borrar esta tarea?")) {
        // recorro la lista hasta que encuentro el texto que coincide
        for (let i = 0; i < listaDeTareas.length; i++) {
            if (listaDeTareas[i].texto === nombreABorrar) {
                listaDeTareas.splice(i, 1); // la quito del array
                break; // me salgo del bucle que ya he terminado
            }
        }
        localStorage.setItem('mislaborales-v1', JSON.stringify(listaDeTareas));
        dibujarTareas();
    }
}

function hacerCheck(nombreACheck) {
    // busco la tarea y le doy la vuelta al estado de completada
    for (let i = 0; i < listaDeTareas.length; i++) {
        if (listaDeTareas[i].texto === nombreACheck) {
            listaDeTareas[i].completada = !listaDeTareas[i].completada;
            break;
        }
    }
    localStorage.setItem('mislaborales-v1', JSON.stringify(listaDeTareas));
    dibujarTareas();
}

// que se pinte todo nada mas cargar la pagina
dibujarTareas();