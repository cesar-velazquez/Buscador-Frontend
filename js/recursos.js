const pestanasAbiertas = [];
const tituloElemento = document.getElementById('titulo');
const BASE_URL = "buscador.json";

//Función para traer los datos del .JSON
let dataComplete = [];

async function getInformation() {
    try {
        const response = await fetch(BASE_URL);
        dataComplete = await response.json();
        if (tituloElemento) tituloElemento.style.display = "none";
        renderResults(dataComplete);
    } catch (error) {
        console.log("Error al cargar los datos")
    }
}

function renderResults(data) {
    const contenedorElemento = document.getElementById('contenedor-elementos');
    contenedorElemento.innerHTML = '';
    if (data.length === 0) {
        contenedorElemento.classList.remove('structureInfo');
        contenedorElemento.classList.add('notInfo');

        contenedorElemento.innerHTML = `<div class="non-information">
        <p class="title-tarjet">No se han encontrado resultados para tu búsqueda</p>
        </div>`;
        return;
    } else {
        data.forEach(resp => {
            const divMayor = document.createElement('div');
            const div = document.createElement('div');
            const titulo = document.createElement('h2');
            const p = document.createElement('p');
            const contenedorEnlaces = document.createElement('div');
            const openResource = document.createElement('a');
            const downloadResource = document.createElement('a');
            const imgDownload = document.createElement('img');
            div.classList.add("design-tarjet");
            titulo.classList.add('title-tarjet');
            contenedorEnlaces.classList.add('contenedor-enlaces');
            openResource.classList.add('openResource')
            openResource.textContent = "Abrir";

            openResource.addEventListener('click', function (e) {
                e.preventDefault();
                const nuevaPestana = window.open(resp.siteweb, '_blank');
                if (nuevaPestana) {
                    pestanasAbiertas.push(nuevaPestana);
                    console.log("pestañaAbierta: ", pestanasAbiertas);
                }
            });

            downloadResource.classList.add('downloadResource');
            downloadResource.setAttribute("href", resp.download);
            downloadResource.download = "";

            imgDownload.classList.add('imgDownload');
            imgDownload.setAttribute("src", "./img/download.png");
            imgDownload.setAttribute("alt", "Descargar");

            titulo.textContent = resp.titulo;
            p.textContent = resp.descripcion;

            contenedorEnlaces.appendChild(downloadResource);
            contenedorEnlaces.appendChild(openResource);
            downloadResource.appendChild(imgDownload);

            div.appendChild(titulo);
            div.appendChild(p);
            div.appendChild(contenedorEnlaces);

            contenedorElemento.classList.add('structureInfo');
            contenedorElemento.classList.remove('notInfo');
            contenedorElemento.appendChild(div);
        });
    }
}

//BUSCAR Info:
let inputSearch = document.getElementById('inputSearch');

inputSearch.addEventListener('input', (e) => {
    const wordSearch = inputSearch.value.toLowerCase();
    const resultResearch = dataComplete.filter(res => res.titulo?.toLowerCase().includes(wordSearch));
    renderResults(resultResearch);

})

getInformation();

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnLogOut') || e.target.closest('.btnLogOut')) {        
        cerrarTodasLasPestanas();
    }
}, true); 

window.addEventListener('storage', (event) => {
    if (event.key === 'nameUser' && (!event.newValue || event.newValue === 'undefined')) {
        cerrarTodasLasPestanas();
        window.location.href = 'index.html';
    }
});

function cerrarTodasLasPestanas() {    
    pestanasAbiertas.forEach(pestana => {
        if (pestana && !pestana.closed) {
            pestana.close();
        }
    });
}