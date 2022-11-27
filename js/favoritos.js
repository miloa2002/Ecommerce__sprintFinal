let favoritos = [];


//cuando el documento cargue que se mantenga el local
document.addEventListener("DOMContentLoaded", ()=>{
    favoritos = JSON.parse(localStorage.getItem("favorito")) || [];
    crearHTMLFav();
})

let listaF = document.querySelector("#listaProductos");
if(listaF){
    listaF.addEventListener("click", agregarFavorito);
}

function agregarFavorito(e){
    e.preventDefault();
    //si esta el icono de favoritos
    if(e.target.classList.contains("favoritoIcon")){
        const productoSeleccionadoFav = e.target.parentElement.parentElement.parentElement;
        leerDatosProductoFav(productoSeleccionadoFav);
    }
}

//lee al producto que se le da click
function leerDatosProductoFav(producto){
    const infoProductoFav = {
        imagen: producto.querySelector("img").src,
        nombre: producto.querySelector("p").textContent,
        precio: producto.querySelector("span").textContent,
        id: producto.querySelector("#datos a").getAttribute('id'),
        cantidad: 1
    }
    const existe = favoritos.some(producto => producto.id === infoProductoFav.id)
    if(existe){
        const productos = favoritos.map(producto=>{
            if(producto.id === infoProductoFav.id){
                producto.cantidad++
                return producto
            }else{
                return producto
            }
        })
    }else{
        favoritos.push(infoProductoFav);
    }
    localizarLocal();
}

/*****************ir a pag favorito***/
const verFavo = document.querySelector("#favoritos");
verFavo.addEventListener("click", ()=>{
    if(favoritos.length === 0){

    }else{
        location.href = "favoritos.html"
        
    }
})


/***crea el html de los productos */

const crearHTMLFav = () => {
    let listaProductosFavoritos = document.querySelector("#listaProductosFavoritos");
    let productFav = document.querySelector(".product__fav");
    favoritos.forEach(element => {
        const{id,nombre,precio,cantidad,imagen} = element;
        if(productFav){
        productFav.innerHTML += `
        <div class="col-md-3">
        <div class="card" id="productoFavoritos">
            <div class="card-body">
                <img src="${imagen}" class="anchoIgm" alt="">
                <div class="d-flex align-items-center justify-content-center">
                    <a id="favIcon" class="nav-link fs-3 border px-2" aria-current="page" href="#"></a>
                </div>
                <p class="card-text fw-normal">${nombre}</p>
                <p class="fw-bold product__price fs-5">${precio}</p>
                <div class="d-flex align-items-center justify-content-center gap-4">
                <p class="fw-bold product__price fs-5">${cantidad}</p>
                    <a href="#" class="btn btn-light opacity-50">Add</a>
                    <i class="fa fa-plus plus" aria-hidden="true"></i>
                </div>
                <button id="borrarFavoritos" onclick="eliminarProductoFav(${id})" class="borrarFavoritos position-absolute top-0 end-0 text-dark fs-5 m-2 border-0">x</button>
            </div>
        </div>
    </div>
        `;
        listaProductosFavoritos.appendChild(productFav)
    }
    })

    
}


//eliminar el producto de la pag del carrito
function eliminarProductoFav(id){
    const productoId =id;
    const item = favoritos.find((pro) => pro.id === productoId)
    const indice = favoritos.indexOf(item)
    if(indice){
        favoritos.splice(indice, 1)
        console.log(favoritos);
    }
}



//guarda en localstorage
function localizarLocal(){
    localStorage.setItem("favorito", JSON.stringify(favoritos));
}


