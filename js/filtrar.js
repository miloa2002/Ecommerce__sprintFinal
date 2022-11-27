const buscarInput = document.querySelector("#buscarInput");
const buscaUsuario = document.querySelector("#buscaUsuario");

function mostrarCategoria(resultado){
    buscarInput.addEventListener("click", (e) =>{
        e.preventDefault();
        const categoriaFiltrada = resultado.filter(item=>{
            const usuario = buscaUsuario.value.toLowerCase();
            const categoriaApi = item.categoria.toLowerCase();
            if(categoriaApi.includes(usuario)){
                return item
            }
        })
        crearHTML(categoriaFiltrada)
    })
}