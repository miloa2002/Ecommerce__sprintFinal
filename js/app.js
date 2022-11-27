const URL = "http://localhost:3000/productos";
const URLciudad = "http://localhost:3000/ciudades";

cargareventListenner();
function cargareventListenner(){
    document.addEventListener("DOMContentLoaded", obtenerDatos);
    verHTML();
}

async function obtenerDatos(){
    try {
        const respuesta = await fetch(URL);
        const resultado = await respuesta.json();
        const respuesta2 = await fetch(URLciudad);
        const resultado2 = await respuesta2.json();
        crearHTML(resultado);
        mostrarCategoria(resultado);
        selectHTML(resultado2);
    } catch (error) {
        console.log(error);
    }
}


let listaProductos = document.querySelector("#listaProductos");


/*renderizar json en html*/
function crearHTML(resultado){
    let elementos = "";
    resultado.forEach(element => {
        const{nombre, precio, img, id} = element;
        elementos += `
        <div class="col-md-4">
         <div class="card mb-3">
             <div class="card-body">
                 <img src="${img}" class="anchoIgm" alt="">
                 <div class="d-flex align-items-center justify-content-center">
                 <a id="favIcon" class="iconoFavoritos nav-link fs-3 border px-2" aria-current="page" href="#"><i class="fa fa-heart-o favoritoIcon" aria-hidden="true"></i></a>
                 </div>
                 <p class="card-text fw-normal nombreP">${nombre}</p>
                 <span class="fw-bold product__price price fs-5">${precio}</span>
                 <div id="datos" class="d-flex align-items-center justify-content-center gap-4">
                 </div>
                 <div id="datos" class="d-flex align-items-center justify-content-center gap-4">
                     <a href="#" id=${id} class="btn btn-light opacity-50 agregarCarrito">Add</a>   
                 </div>
             </div>
         </div>
        </div>
        `
    });

    listaProductos.innerHTML = elementos;
}


//admin ingreso
const enviarAdmin = document.querySelector("#enviarAdmin");

if (enviarAdmin) {
    enviarAdmin.addEventListener("click", e =>{
        e.preventDefault();
        const nombre = document.querySelector("#Nombre").value;
        const apellido = document.querySelector("#Apellido").value;
    
        if(nombre === "" && apellido === ""){
    
        }else{
            location.href = "admin.html";
        }
    })
}


const lisProduct = document.querySelector(".lis__product");

async function verHTML(){
    const resp = await fetch(URL);
    const lista = await resp.json();
    lista.forEach(element=>{
        const{nombre,categoria, precio, img, id} = element;
        lisProduct.innerHTML += `
        <div class="productos__admin my-5" id=${id}>
                <div class="product__imgInfo d-md-flex align-items-center gap-4">
                    <img class="anchoIgm w-25 imagenPA" src="${img}" alt="producto">
                    <div class="product__info">
                        <p class="m-0 nombrePA">${nombre}</p>
                        <p class="m-0 categoriaPA">${categoria}</p>
                    </div>
                </div>
    
                <div class="product__precios">
                    <p class="small fs-6 m-0 text-dark opacity-50">Price</p>
                    <p class="m-0 precioPA">${precio}</p>
                </div>

                <div class="product__eliminar">
                    <button id="eliminarP" class="text-dark border-0">Eliminar</button>
                    <button id="modificarP" class="text-dark border-0 modificarP">Modificar</button>
        </div>
        `
    })
}





const btnModificar = document.querySelector(".btn__modificar")

//capturamos los datos del formulario del administrador
const capturarDatos = () =>{
    const img = document.getElementById("inputUrl").value;
    const nombre = document.getElementById("inputNombre").value;
    const precio = document.getElementById("inputPrecio").value;
    const categoria = document.getElementById("inputCat").value;

    const product = {
        img,
        nombre,
        precio,
        categoria
    }
    return product;
}



//POST AGREGAMOS PRODUCTO
const btnCrear = document.querySelector(".btn__crear")
btnCrear.addEventListener("click", async e=>{
    e.preventDefault();

    const newProduct = capturarDatos();

    await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers:{
            "content-Type":"application/json; charset=utf-8"
        }
    })

})



//DELETE ELIMINAMOS PRODUCTO
lisProduct.addEventListener("click", async (e)=>{
    e.preventDefault();
    let borrarButton = e.target.id == 'eliminarP'
    let modificarP = e.target.id == 'modificarP';

    let id = e.target.parentElement.parentElement.id;

    //borrar
    if(borrarButton){
        fetch(`${URL}/${id}`,{
            method: 'DELETE'
        })
    }

    //EDITAMOS
    if(modificarP){
        const parent  = e.target.parentElement.parentElement;
        let imagenContent = parent.querySelector(".imagenPA").src;
        let nombreContent = parent.querySelector(".nombrePA").textContent;
        let precioContent = parent.querySelector(".precioPA").textContent;
        let categoriaContent = parent.querySelector(".categoriaPA").textContent;

        let imgValue = document.getElementById("inputUrl");
        let nombreValue = document.getElementById("inputNombre");
        let precioValue = document.getElementById("inputPrecio");
        let categoriaValue = document.getElementById("inputCat");

        imgValue.value = imagenContent;
        nombreValue.value = nombreContent;
        precioValue.value = precioContent;
        categoriaValue.value = categoriaContent;

        //actualizamos
        let modificarP = document.querySelector(".btn__modificar");
        modificarP.addEventListener("click", ()=>{
            fetch(`${URL}/${id}`,{
                method: "PATCH",
                headers: {
                    "content-Type":"application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    img: imgValue.value,
                    nombre: nombreValue.value,
                    precio: precioValue.value,
                    categoria: categoriaValue.value
                })
            })
        })
    }
})



//Ciudades
function selectHTML(resultado2){
    let opciones = document.querySelector(".seleccionC");
    resultado2.forEach(element =>{
        opciones.innerHTML += `
            <option class="opcionesCiudad">${element}</option>
        `;
    })

    //recorrer los option

    floatingSelect.addEventListener("change", (e) =>{
        const nombreC = e.target.value
        buscaUsuario.placeholder = "busca por categoría en: " + nombreC + " Antioquia"
        if(nombreC){
            swal("usted está comprando en: " + nombreC)
        }
    })
}
