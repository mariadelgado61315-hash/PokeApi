//Capturar los elementos del DOM
const btnCargar = document.getElementById("btnCargar");

//Capturar el contenedor donde estaran las tarjetas
const contenedor = document.getElementById("poke-contenedor");

async function obtenerPokemon() {
  try {
    //solicitud del API al servidor

    //PASO 1: Primero informar al usuario
    contenedor.innerHTML = `<p class="text-center col-span-full font-bold text-red-600 animate-pulse text-lg">
        Conectando al Servidor...</p>`;

    //PASO 2: Solicitud al servidor
    const respuesta = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=500",
    );

    //PASO 3:
    if (!respuesta.ok) {
      throw new Error("El servidor no responde...");
    }

    //PASO 4: Traducir la respuesta del servidor que es un texto plano a JSON para que JS la pueda interpretar
    const datos = await respuesta.json();
    const listaPokemon = datos.results;

    //PASO 5: Limpiamos el contenedor
    contenedor.innerHTML = "";

    console.log("Datos recibidos correctamente: ", listaPokemon);

    for (let i = 0; i < listaPokemon.length; i++) {
      const pokemon_position = listaPokemon[i];
      const idPokemon = i + 1;

      //Crear la ruta para traer la imagen del pokemon
      const url_imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${idPokemon}.png`;
      //Crear contenedor de la tarjeta del pokemon
      const tarjeta = document.createElement("div");
      tarjeta.className = "bg-red-800 border border-red-700 p-4 text-center";

      //Crear la etiqueta de la imagen
      const imagen = document.createElement("img");
      imagen.src = url_imagen;
      imagen.alt = pokemon_position.name;
      imagen.className = "w-32 h-32 mx-auto drop-shadow-md";

      //Crear el SPAM del numero del pokemon
      const numero = document.createElement("span");
      numero.className = "text-xs font-bold text-black-500 block mt-2";
      numero.textContent = `#${String(idPokemon).padStart(3, "0")} `;

      //Crear el h2 para el nombre del pokemon
      const nombre = document.createElement("h2");
      nombre.className = "text-xl font-bold capitalize text-white mt-1";
      nombre.textContent = pokemon_position.name;

      //Agrupar todo dentro del contenedor DIV
      tarjeta.appendChild(imagen);
      tarjeta.appendChild(numero);
      tarjeta.appendChild(nombre);

      //Agregar la tarjeta al contenedor
      contenedor.appendChild(tarjeta);
    }
  } catch (error) {
    //mostraremos el mensaje al usuario si falla la red
  }
}

function saludar() {
  console.log("Hola");
}
btnCargar.addEventListener("click", obtenerPokemon);
