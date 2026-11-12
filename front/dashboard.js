
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const modalJson = document.getElementById('modal-json');
const formJson = document.getElementById('form-json');
const jsonInput = document.getElementById('json-input');

const btnOpenLibraryModal = document.getElementById('btn-open-library-modal');
const btnCloseLibraryModal = document.getElementById('btn-close-library-modal');
const modalLibrary = document.getElementById('modal-library');
const formLibrary = document.getElementById('form-library');
const libraryNameInput = document.getElementById('library-name');

const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');


btnOpenModal.addEventListener('click', () => modalJson.classList.remove('hidden'));
btnCloseModal.addEventListener('click', () => modalJson.classList.add('hidden'));


btnOpenLibraryModal.addEventListener('click', () => modalLibrary.classList.remove('hidden'));
btnCloseLibraryModal.addEventListener('click', () => modalLibrary.classList.add('hidden'));


formLibrary.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombreBiblioteca = libraryNameInput.value.trim();

  if (nombreBiblioteca) {
    obtenerOCrearSeccion(nombreBiblioteca);
    emptyState.classList.add('hidden');
    libraryNameInput.value = '';
    modalLibrary.classList.add('hidden');
  }
});


formJson.addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    const juegosData = JSON.parse(jsonInput.value);
    emptyState.classList.add('hidden');
    procesarJuegosJSON(juegosData);

    jsonInput.value = '';
    modalJson.classList.add('hidden');
  } catch (error) {
    alert("El formato JSON es inválido. Revisá las comillas y las llaves.");
  }
});

function procesarJuegosJSON(datos) {
  const listaJuegos = Array.isArray(datos) ? datos : [datos];

  listaJuegos.forEach(juego => {
    const nombreSeccion = juego.seccion || "Mis Juegos";
    let contenedorGrilla = obtenerOCrearSeccion(nombreSeccion);

    const card = document.createElement('a');
    card.href = juego.ejecutable || '#';
    card.target = '_blank';
    card.className = 'game-card-cg';
    card.dataset.title = juego.titulo.toLowerCase(); // Para búsqueda rápida

    const portadaUrl = juego.portada || 'https://via.placeholder.com/300x180/0f172a/6366f1?text=Juego';
    const anioTexto = juego.anio ? `<span class="tag tag-year">${juego.anio}</span>` : '';

    card.innerHTML = `
      <img src="${portadaUrl}" alt="${juego.titulo}">
      <div class="game-card-overlay">
        <div class="game-card-title">${juego.titulo}</div>
        <div class="game-card-tags">
          <span class="tag">${juego.genero || 'Arcade'}</span>
          ${anioTexto}
        </div>
      </div>
    `;

    contenedorGrilla.appendChild(card);
  });
}

function obtenerOCrearSeccion(tituloSeccion) {
  const container = document.querySelector('.dashboard-container');
  const idSeccion = 'sec-' + tituloSeccion.toLowerCase().replace(/[^a-z0-9]/g, '-');

  let grilla = document.getElementById(idSeccion);

  if (!grilla) {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'game-section';

    sectionEl.innerHTML = `
      <h2 class="section-header">${tituloSeccion} <span>&rsaquo;</span></h2>
      <div id="${idSeccion}" class="games-grid"></div>
    `;

    container.appendChild(sectionEl);
    grilla = document.getElementById(idSeccion);
  }

  return grilla;
}


searchInput.addEventListener('input', (e) => {
  const texto = e.target.value.toLowerCase().trim();
  const todasLasTarjetas = document.querySelectorAll('.game-card-cg');
  const todasLasSecciones = document.querySelectorAll('.game-section');

  todasLasTarjetas.forEach(tarjeta => {
    const titulo = tarjeta.dataset.title;
    if (titulo.includes(texto)) {
      tarjeta.classList.remove('hidden');
    } else {
      tarjeta.classList.add('hidden');
    }
  });

  
  todasLasSecciones.forEach(seccion => {
    const tarjetasVisibles = seccion.querySelectorAll('.game-card-cg:not(.hidden)');
    if (tarjetasVisibles.length === 0 && texto !== '') {
      seccion.classList.add('hidden');
    } else {
      seccion.classList.remove('hidden');
    }
  });
});
