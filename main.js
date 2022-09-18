//cartel de entrada
Toastify({

    text: "Bienvenido a Plastard",
    position: "center",
    duration: 1500
    
    }).showToast();

//clase completa 
class Filamentos{
    constructor(id, material, diametro, color, peso, precio, imagen){
        this.id = id,
        this.material = material,
        this.diametro = diametro,
        this.color = color,
        this.peso = peso,
        this.precio = precio,
        this.imagen = imagen
    }
}
//informacion y stock 
const filato1 = new Filamentos(1, "TPU", "1,75mm", "amarillo", "1kg", 3500, "imagenes/amarillo.jpg")
const filato2 = new Filamentos(2, "TPU", "1,75mm", "azul", "1kg", 3500, "imagenes/azul.jpg")
const filato3 = new Filamentos(3, "TPU", "1,75mm", "celeste", "1kg", 3500, "imagenes/celeste.jpg")
const filato4 = new Filamentos(4, "TPU", "1,75mm", "gris", "1kg", 3500, "imagenes/gris.jpg")
const filato5 = new Filamentos(5, "TPU", "1,75mm", "marron", "1kg", 3500, "imagenes/marron.jpg")
const filato6 = new Filamentos(6, "TPU", "1,75mm", "naranja", "1kg", 3500, "imagenes/naranja.jpg")
const filato7 = new Filamentos(7, "TPU", "1,75mm", "negro", "1kg", 3000, "imagenes/negro.jpg")
const filato8 = new Filamentos(8, "TPU", "1,75mm", "salmon", "1kg", 4000, "imagenes/pla_boutique_salmon-1-600x600.jpg")
const filato9 = new Filamentos(9, "TPU", "1,75mm", "rojo", "1kg", 3500, "imagenes/rojo.jpg")
const filato10 = new Filamentos(10, "TPU", "1,75mm", "rosa claro", "1kg", 3500, "imagenes/rosaclaro.jpg")
const filato11 = new Filamentos(11, "PEP", "1,75mm", "trasparente", "1kg", 2000, "imagenes/transparente.jpg")
const filato12 = new Filamentos(12, "TPU", "1,75mm", "verde manzana", "1kg", 3500, "imagenes/verdemanzana.jpg")
const filato13 = new Filamentos(13, "TPU", "1,75mm", "violeta", "1kg", 3500, "imagenes/violeta.jpg")
const filato14 = new Filamentos(14, "TPU", "1,75mm", "blanco", "1kg", 3000, "imagenes/blanco.jpg")
const filato15 = new Filamentos(15, "TPU", "1,75mm", "verde fluor", "1kg", 4000, "imagenes/verdefluo.jpg")
const filato16 = new Filamentos(16, "PEP", "1,50mm", "blanco", "2kg", 7500, "imagenes/Blanco2.png")
const filato17 = new Filamentos(17, "PEP", "1,50mm", "negro", "2kg", 7500, "imagenes/negro2.png")
const filato18 = new Filamentos(18, "PEP", "1,50mm", "gris", "2kg", 7500, "imagenes/gris2.png")

// carga de estanteria
const estanteria = [filato1,filato2,filato3,filato4,filato5,filato6,filato7,filato8,filato9,filato10,filato11,filato12,filato13,filato14,filato15,filato16,filato17,filato18]

//let y botones
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [] 
let botonCarrito = document.getElementById("botonCarrito") 
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')
let acumulador
let divProductos = document.getElementById("productos")
let inputBuscar = document.getElementById("buscador") 
 
//funcion de catalogo y array
function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    array.forEach((filato)=>{
        let nuevoProducto = document.createElement("div")//div completo del array
        nuevoProducto.innerHTML = `<div id="${filato.id}" class="informacion" style="width: 300px; height: 460px; margin-left:86px">
                                        <img class="imagen" src="${filato.imagen}">
                                        <div class="informacion-body">
                                            <h5 class="informacion-title">Filamento color ${filato.color}</h5>
                                            <p class="parrafo">Filamento tipo ${filato.material} de diametro ${filato.diametro} compatible con todas las impresoras 3D.</p>
                                            <h5> Precio: ${filato.precio}$ | Peso: ${filato.peso}</h5>
                                            <button id="agregarBtn${filato.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                        </div>
                                    </div>`
        divProductos.appendChild(nuevoProducto)
        let btnAgregar = document.getElementById(`agregarBtn${filato.id}`) //btnAgregar
        btnAgregar.addEventListener("click", () =>{
            agregarAlCarrito(filato)
            
        })
        })
    }
//funcion de agregar al carrito
function agregarAlCarrito(filato){
        console.log(`El filamento ${filato.color} del diametro ${filato.diametro} ha sido agregado. N° de referencia: ${filato.id}`)
        
        let filatoAgregado = productosEnCarrito.find((elem) => (elem.id == filato.id))
        console.log(filatoAgregado)
        console.log(productosEnCarrito);
        if (filatoAgregado == undefined){
            productosEnCarrito.push(filato)
            console.log(productosEnCarrito);
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))        
            Swal.fire({
                title: "Se agrego un filamento",
                text: `El filamento color ${filato.color} ha sido agregado al carrito`,
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
                confirmButtonText:"Confirmar",
            })
}}
//funcion de cargar productos
function cargarProductosCarrito(productosDelStorage) {

    modalBody.innerHTML = " "  
    productosDelStorage.forEach((productoCarrito) => {
        
        modalBody.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 440px;">
                <img class="card-img-top" src="${productoCarrito.imagen}">
                <div class="card-body">
                        <h4 class="card-title">Filamento color ${productoCarrito.color} de 1kg</h4>
                    
                        <p class="card-text">$${productoCarrito.precio}</p> 
                        <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                </div>    
            </div>
    `
      
})

productosDelStorage.forEach((productoCarrito, indice)=>{
        //capturamos el boton sin usar variable y adjuntamos evento
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener('click', () => {
            //Cartel emergente que sale despues de eliminar el producto
            Toastify({
                text: `El filamento color ${productoCarrito.color} ha sido eliminado`,
                duration: 2000,
                gravity: "bottom",
                position: "left",
                style:{
                    color: "white", 
                }
                
                }).showToast();
            //evento:
            console.log(`el filamento color ${productoCarrito.color} eliminado`)
            //DOM afuera
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            console.log(cardProducto);
            cardProducto.remove()

            //para eliminar las compras del array
            productosEnCarrito.splice(indice, 1)
            console.log(productosEnCarrito)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            //se vuelve a imprimir el array
            cargarProductosCarrito(productosEnCarrito)
        })  

})
//Function del total
compraTotal(...productosDelStorage)
}

//Transformamos la function con spread y reduce
function compraTotal(...productosTotal) {
    acumulador = 0;
    acumulador = productosTotal.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.precio
    },0)   
    console.log(acumulador)   
    //Reemplazar con ternario
    acumulador > 0 ? parrafoCompra.innerHTML = `Total a pagar: ${acumulador}`: parrafoCompra.innerHTML = `<p>Carrito vacio</p>`
 
//funcion de realizar la compra  
}
function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        let DateTime = luxon.DateTime
        const dt = DateTime.now()
        
        let fecha = `Siendo las ${dt.toLocaleString(DateTime.TIME_SIMPLE)} del ${dt.toLocaleString(DateTime.DATE_FULL)}`
    if (result.isConfirmed) {
        Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: 'green',
            footer: `<p>${fecha}en el plazo de 24hs nos comunicaremos con usted para la coordinacion del envio</p>`
        })
        //código para que se ejecute en caso de que result sea confirmado. 
        productosEnCarrito = []
        localStorage.removeItem('carrito')
        //total
        console.log(`El total de su compra es ${acumulador}`)
        //se vuelve a cargar el array
        cargarProductosCarrito(productosEnCarrito)
        }
        else{
            Swal.fire({
                title: 'Compra fue cancelada',
                icon: 'info',
                confirmButtonColor: 'green',
                timer:3000
            })
        }
    })}
//Eventos de carrito
botonCarrito.addEventListener('click', () => {
    cargarProductosCarrito(productosEnCarrito)
})
botonFinalizarCompra.addEventListener('click',()=>{
    finalizarCompra()
})


//Código y loader
let divLoader = document.getElementById("loader")

const loading = setTimeout(()=>{
    divLoader.remove()
    mostrarCatalogo(estanteria)
},2000)