console.log("Hola Profes")

//Traer la información del MOCK API

const API_URL = "http://localhost:3000/myServerJSON"

let datosRecibidos; // Se declara la variable que contendrá los datos recibidos, para poderla usar después de ejecutar la función.


// Imprimir información en el HTML para cada carta
const output = document.querySelector("#cards-output")

const mostrarInfo = (inmuebles) => {
    output.innerHTML = ""
    inmuebles.forEach(element => {
        const { id, type, status, price, image, name, area, parking, wc, rooms, ubication, owner } = element
        const divCards = document.createElement("div")
        divCards.setAttribute("class", "cards")
        divCards.setAttribute("onclick", `guardarId(${id})`)

        divCards.innerHTML = `
        <a href="details.html">
        <div class="cardsUp">
        <div class="type-status">
            <div class="type">${type}</div>
            <div class="status">${status}</div>
        </div>  
            <div class="price">${price}</div>
            <div class="favs">⭐</div>
            <img class="img" src=${image}>
        </div>
        <div class="cardsDown">
            <div class="ubication">${ubication}</div>
            <div class="name">${name}</div>
            <div class="owner">${owner}</div>
            <hr>
            <div class="icons">
                <img src="./Images/2 featured properties/Area Icon.svg" alt=""><span class="area">${area}</span>
                <img src="./Images/2 featured properties/Garage Icon.svg" alt=""><span class="parking">${parking}</span>
                <img src="./Images/2 featured properties/Bathroom Icon.svg" alt=""><span class="wc">${wc}</span>
                <img src="./Images/2 featured properties/Bedroom Icon.svg" alt=""><span class="rooms">${rooms}</span>
            </div>
        </div>      
        </a> 
        `
        output.appendChild(divCards)
    });
}

//Usamos async/await para crear la promesa y usar la info del mock api

const traerDatos = async () => {
    try {
        //1. crear la promesa y devolver respuesta si pasa
        let respuesta = await fetch(API_URL)
        // 2. parsear y usar la data
        datosRecibidos = await respuesta.json()
        console.log(datosRecibidos)
        return mostrarInfo(datosRecibidos)    // Se Invoca la función de Crear Cartas en los Datos Recibidos por el JSON Server


    } catch (error) {
        console.log("Se encontró un error: " + error)
        document.querySelector("#cards-output").innerHTML = `<h3 class="error">Error Found, please check the LocalHost and try again</h3>`
        alert("Error Found, please check the LocalHost and try again 😯")
    }
}

traerDatos() // Invocamos la Función para tener los datos del JSON Server ya impresos en las Cards


// Guardo el ID del array del JSON Server en el Local Storage, para poderlo abrir en el otro archivo .js

let guardarId = (id) => {

    let idJSON = JSON.stringify(id)
    localStorage.setItem("idJSON", idJSON)
}


//------------- FILTRO DE LOS SELECT------------------//

let findProperties = document.querySelector("#find-properties")
let typeSelect = document.querySelector("#type")
let ubicationSelect = document.querySelector("#ubication")

findProperties.addEventListener("click", () => {
    let arrayFiltrado = [];
    datosRecibidos.forEach(element => {

        if (typeSelect.value != "" && ubicationSelect.value != "") {
            if (typeSelect.value == element.type && ubicationSelect.value == element.ubication) {
                arrayFiltrado.push(element)
            }

        } else if (typeSelect.value != "") {
            if (typeSelect.value == element.type) {
                arrayFiltrado.push(element)
            }


        } else if (ubicationSelect.value != "") {
            if (ubicationSelect.value == element.ubication) {
                arrayFiltrado.push(element)
            }
        }
    })

    mostrarInfo(arrayFiltrado) // ---- Aquí muestro la info filtrada ---- //

    // ----- Mensaje si no se encuentra ninguna propiedad con esas características ---- //

    if (arrayFiltrado.length == "") {
        output.innerHTML = `<h3 class="error">This search doesn't exist, please try another one</h3>`
    }
    // -------- Si no se selecciona ningun filtrado se imprimen todas de nuevo------- //

    if (typeSelect.value == "" && ubicationSelect.value == "") {
        mostrarInfo(datosRecibidos)
    }
})

let allProperties = document.querySelector("#all-properties")
allProperties.addEventListener("click", () => {
    mostrarInfo(datosRecibidos)
})

//--------- Menu Burgir -------//

document.querySelector("#btn_menu").addEventListener("click", mostrarMenu)

let nav = document.querySelector("#nav-bar");
let background_menu = document.querySelector(".back_nav")

background_menu.addEventListener("click", ocultarMenu)


function mostrarMenu() {
    nav.style.right = "0px"
    background_menu.style.display = "block"
}

function ocultarMenu() {
    nav.style.right = "-330px"
    background_menu.style.display = "none"
}

