//ocultar y mostrar carrito
const car = document.querySelector("#car");

car.addEventListener("mouseover", ()=>{
    const cardCart = document.querySelector("#cardCart");
    if(cardCart.style.display === "none"){
        cardCart.style.display = "block";
    }else{
        cardCart.style.display = "none";
    }
})

//funcionalidad carrito
let carrito = [];

const cartAmount = document.querySelector("#cartAmount");
const priceTotal = document.querySelector("#priceTotal");

//cuando el documento cargue que se mantenga el local
document.addEventListener("DOMContentLoaded", ()=>{
    carrito = JSON.parse(localStorage.getItem("productos")) || [];
    mostrarHTML();
    compra();
})


let listaP = document.querySelector("#listaProductos");
if(listaP){
    listaP.addEventListener("click", agregarProducto);
}

function agregarProducto(e){
    e.preventDefault();

    //si esta el boton agregar al carrito
    if(e.target.classList.contains('agregarCarrito')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
        mostrarHTML();
    }
}

//lee el producto al que se le dio click
function leerDatosProducto(producto){
    //crear el objeto al que se le da click
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        nombre: producto.querySelector("p").textContent,
        precio: producto.querySelector("span").textContent,
        id: producto.querySelector("#datos a").getAttribute('id'),
        cantidad: 1
    }
    console.log(infoProducto);
    const existe = carrito.some(producto => producto.id === infoProducto.id)
    if(existe){
        const productos = carrito.map(producto=>{
            if(producto.id === infoProducto.id){
                producto.cantidad++
                return producto
            }else{
                return producto
            }
        })
    }else{
        carrito.push(infoProducto)
    }
}

//mostrar en carrito
const mostrarHTML = ()=>{
    const modal = document.querySelector(".productIndividual");
    //limpiar duplicado
    if(modal){
    modal.innerHTML = "";
    carrito.forEach(element => {
        const{id,nombre,precio,cantidad,imagen} = element;
        modal.innerHTML += `
        <div class="card-body card__products">
                                    
        <div id="product" class="product d-flex align-items-center gap-2 mb-3">
           <img src=${imagen} alt="" width="70" height="70">
           <div class="card-text ">
               <p id="product__title" class="m-0">${nombre}</p>
               <p class="m-0 fw-light"><span class="cantidad">Cantidad: ${cantidad}</span></p>
               <div class="d-flex align-items-center gap-4">
               <p class="m-0 fw-light"><span class="precio">x${precio}</span></p>
               <button onclick="eliminarProducto(${id})" class="borrar text-dark border-0">x</button>
               </div>
           </div>  
       </div>
        `
    });
}
    if(carrito.length === 0){
        modal.innerHTML = `<p class="mt-2">No hay productos!!!</p>`
    }
    //va aumentando la cantidad en carrito
    cartAmount.textContent = carrito.length;

    //va aumentando el precio total en carrito
    priceTotal.textContent = carrito.reduce((acum, product) => acum + product.cantidad*product.precio, 0)
    localizarLocalStorage();

    //total de la compra
    const totalesCarro = document.querySelector(".totalesCarro")
    if(totalesCarro){
        totalesCarro.innerHTML = carrito.reduce((acum, prod) =>acum+prod.cantidad*prod.precio,0)
    }

    //si hay cupon
    const aplicarCupon = document.querySelector("#aplicarCupon")
    if(aplicarCupon){
    aplicarCupon.addEventListener("submit", e=>{
    e.preventDefault();
    const verInfoCupon = document.querySelector("#verInfoCupon").value
    totalesCarro.innerHTML = carrito.reduce((acum, prod) =>acum+prod.cantidad*prod.precio,0-verInfoCupon)
})

    }
}


//eliminar el producto
function eliminarProducto(id){
    const productoId =id;
    const item = carrito.find((pro) => pro.id == productoId)
    console.log(item);
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    mostrarHTML();
}

//guarda en localstorage
function localizarLocalStorage(){
    localStorage.setItem("productos", JSON.stringify(carrito));
}


/*****************ir a pag carrito***/
const verCarro = document.querySelector("#varCart");
verCarro.addEventListener("click", ()=>{
    if(carrito.length === 0){

    }else{
        location.href = "carrito.html"
        
    }
})



function compra(){
    let productCarro = document.querySelector(".product-carro");
    let almacenar = document.querySelector(".almacenar")
    carrito.forEach((producto) =>{
        const{nombre, precio, imagen, cantidad, id} = producto;

        if(almacenar){
            almacenar.innerHTML += `
            <div class="container almacenar">
            <div class="product__carro d-md-flex align-items-center justify-content-between">
                <div class="product__imgInfo d-md-flex align-items-center gap-4">
                    <img class="anchoIgm w-25" src="${imagen}" alt="producto">
                    <div class="product__info">
                        <p class="m-0">${nombre}</p>
                    </div>
                </div>
    
                <div class="product__precios">
                    <p class="small fs-6 m-0 text-dark opacity-50">Price</p>
                    <p class="m-0">${precio}</p>
                </div>

                <div class="product__cantidad">
                    <p class="small fs-6 m-0 text-dark opacity-50">Cantidad</p>
                    <p class="m-0">${cantidad}</p>
                </div>
    
                <div class="sumarRestar">
                    <i id=${id} class="fa fa-minus menos text-dark opacity-50" aria-hidden="true"></i>
                    <span class="cantidad">${cantidad}</span>
                    <i id=${id} class="fa fa-plus plus text-dark opacity-50" aria-hidden="true"></i>
                </div>
    
                <div class="product__precios">
                    <p class="small fs-6 m-0 text-dark opacity-50">Total:</p>
                    <p class="m-0">${precio*cantidad}</p>
                </div>
    
                <div class="product__eliminar">
                    <button onclick="borrarProducto(${id})" class="text-dark border-0">Eliminar</button>
                </div>
    
            </div>
            `;
            productCarro.appendChild(almacenar)
        }

    })
}

//sumar y restar cantidades
/*
almacenar = document.querySelector(".almacenar")
almacenar.addEventListener("click", e=>{
    if(e.target.classList.contains('plus')){
        console.log(carrito[e.target.id]);

        const producto = carrito[e.target.id]
        location.reload(producto.cantidad = carrito[e.target.id].cantidad+1)
        carrito[e.target.id] = {...producto}
        console.log(carrito);
        mostrarHTML()
        
    }
    if(e.target.classList.contains('menos')){
        console.log(carrito[e.target.id]);

        const producto = carrito[e.target.id]
        location.reload(producto.cantidad = carrito[e.target.id].cantidad-1)
        carrito[e.target.id] = {...producto}
        mostrarHTML()
        
    }
    
})
*/


//eliminar el producto de la pag del carrito
function borrarProducto(id){
    const productoId =id;
    const item = carrito.find((pro) => pro.id == productoId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    location.reload(mostrarHTML())
}


/************envio compra**********/
const urlC = 'http://localhost:3000/compras';

  
const capturaDatos = () =>{
    const nombre = document.getElementById("validationCustom01").value;
    const correo = document.getElementById("validationCustom02").value;
    const telefono = document.getElementById("validationCustom03").value;

    const infoUser = {
        nombre,
        correo,
        telefono
    }
    return infoUser
    
}


const formulario = document.querySelector(".formulario");

if(formulario){
    formulario.addEventListener("submit", async e =>{
        e.preventDefault();
        const objeto = capturaDatos();
    
        await fetch(urlC,{
            method : 'POST',
            body : JSON.stringify(objeto),
            headers : {
                "content-Type":"application/json; charset=utf-8"
            }
        })
    
        //remover el local una vez ya se haya hecho el proceso de compra
        localStorage.removeItem("productos");
        alert("compra finalizada")
    })
}