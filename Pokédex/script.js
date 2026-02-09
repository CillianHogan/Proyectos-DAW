// pillo la lista de html donde van a ir los pokemon y los botones de arriba
const pokemonList = document.querySelector("#pokemonList");
const botonesHeader = document.querySelectorAll(".type-filter");
const promesas = []; // este array es para guardar todas las peticiones a la vez

let URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemon = []; // aqui guardare los datos para no tener que llamar a la api cada vez que filtro

// hago un bucle para pedir los 151 primeros pokemon
for (let i = 1; i <= 151; i++) {
    // los voy metiendo en el array de promesas para que se descarguen todos juntos
    promesas.push(fetch(URL + i).then((response) => response.json()));
}

// cuando todas las promesas terminan, los guardo y los pinto
Promise.all(promesas).then(pokemon => {
    allPokemon = pokemon;
    pokemonList.innerHTML = ""; // limpio por si acaso
    allPokemon.forEach(p => mostrarPokemon(p));
})

// esta es la funcion "estrella", la que dibuja cada tarjeta
function mostrarPokemon(poke) {

    // saco los tipos (fuego, agua...) y los meto en un string de HTML
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // este lio de ifs es para que el ID siempre tenga 3 numeros (001, 010, etc)
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // creo el div a mano y le meto todo el contenido
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
                    <div class="pokemon-image">
                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-holder">
                            <p class="pokemon-id">#${pokeId}</p> 
                            <h2 class="pokemon-name">${poke.name}</h2>
                            <button class="btn-audio" onclick="reproducirSonido('${poke.cries.latest}')">
    🔊
</button>
                        </div>
                        <div class="pokemon-types">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${poke.height}m</p>
                            <p class="stat">${poke.weight}kg</p>
                        </div>
                    </div>
                    `;
pokemonList.append(div);
}

// para que los botones de colores funcionen y filtren por tipo
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    pokemonList.innerHTML = ""; // borro la lista para poner solo los que coinciden

    allPokemon.forEach(data => {
        if(botonId === "seeAll") {
            mostrarPokemon(data);
        } else {
            // busco si entre los tipos del pokemon esta el que he pinchado
            const tipos = data.types.map(type => type.type.name);
            if(tipos.some(tipo => tipo.includes(botonId))) {
                mostrarPokemon(data);
            }
        }
            
});
}));

// logica del buscador por nombre
const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", (event) => {
    const searchText = event.target.value.toLowerCase(); // lo paso a minusculas para que no de fallos

    pokemonList.innerHTML = ""; // limpio la lista mientras escribo

    allPokemon.forEach(poke => {
        // si el nombre del pokemon contiene lo que estoy escribiendo, lo saco por pantalla
        if (poke.name.toLowerCase().includes(searchText)) {
            mostrarPokemon(poke);
        }
    })
})

// funcion para que suenen los gritos de los pokemon
function reproducirSonido(url) {
    const audio = new Audio(url);
    audio.play();
}