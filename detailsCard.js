console.log("Hola profes 2")

const API_URL = "http://localhost:3000/myServerJSON"

let datosRecibidos;

const traerDatos = async () => {
    try {
        //1. crear la promesa y devolver respuesta si pasa
        respuesta = await fetch(API_URL)
        // 2. parsear y usar la data
        datosRecibidos = await respuesta.json()
        console.log(datosRecibidos)
        traerId()

    } catch (error) {
        console.log("Se encontró un error: " + error)
        document.querySelector("#cards-output").innerHTML = `<h3 class="error">Error Found, please check the LocalHost and try again</h3>`
        alert("Error Found, please check the LocalHost and try again 😯")
        }
}

traerDatos()

// Traer el ID almacenado en el Local Storage

let traerId = () => {

    let idRecuperado = JSON.parse(localStorage.getItem("idJSON"))

    let datosInmueble = datosRecibidos.filter((element) => {            // Comparo si el id del elemento es igual al del Local Storage
        return element.id == idRecuperado                                // y lo almaceno con filter en el array 

    })
    console.log(datosInmueble);

    // Inserto los datos del array filtado en el HTML

    let cardsOutput = document.querySelector("#cards-output")
    cardsOutput.innerHTML = `
<div class="cards-details">
    <div class="cardsLeft">
        <div class="photos">Photos (4)</div>
        <div class="favs-detail">🤍</div>
        <img class="img-detail" src=${datosInmueble[0].image}>
        <img class="img-detail2" src=${datosInmueble[0].image}>
    </div>
    <div class="cardsRight">
        <div class="status-detail">${datosInmueble[0].type} ${datosInmueble[0].status}</div>
        <div class="name-detail">
            <h2>${datosInmueble[0].name}</h2>
        </div>
        <div class="ubication-detail">${datosInmueble[0].ubication}</div>
        <div class="price-detail">From ${datosInmueble[0].price}</div>
        <div class="description">
            <h3>Description</h3>
        ${datosInmueble[0].description}
        </div>
        <div class="contact">Contact with the Owner ${datosInmueble[0].owner}: ${datosInmueble[0].contact}</div>
        <div class="icons-detail">
            <img src="Images/3 Hot Deal/Area Icon.png" alt=""><span class="area">${datosInmueble[0].area}</span>
            <img src="Images/3 Hot Deal/Bathroom Icon.png" alt=""><span class="wc">${datosInmueble[0].wc}
                Bed(s)</span>
            <img src="Images/3 Hot Deal/Bedroom Icon.png" alt=""><span class="rooms">${datosInmueble[0].rooms}
                Bath(s)</span>
            <img src="Images/3 Hot Deal/Garage Icon.png" alt=""><span class="parking">${datosInmueble[0].parking}
                Garage(s)</span>
        </div>
    </div>
</div>`
}

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
