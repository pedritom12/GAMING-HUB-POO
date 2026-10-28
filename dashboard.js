// Elementos del DOM
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const modalJson = document.getElementById('modal-json');
const formJson = document.getElementById('form-json');
const jsonInput = document.getElementById('json-input');
const emptyState = document.getElementById('empty-state');
const gamesGrid = document.getElementById('games-grid');

// Abrir y cerrar ventana modal
btnOpenModal.addEventListener('click', () => modalJson.classList.remove('hidden'));
btnCloseModal.addEventListener('click', () => modalJson.classList.add('hidden'));

// Manejar el envío del JSON
formJson.addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    // 1. Convertimos el texto ingresado a un objeto JS mediante JSON.parse
    const juegoData = JSON.parse(jsonInput.value);

    // Validación básica
    if (!juegoData.titulo || !juegoData.ejecutable) {
      alert("El JSON debe incluir al menos 'titulo' y 'ejecutable'");
      return;
    }

    // 2. Crear la tarjeta HTML para la grilla
    crearTarjetaJuego(juegoData);

    // 3. Ocultar estado vacío y mostrar grilla
    emptyState.classList.add('hidden');
    gamesGrid.classList.remove('hidden');

    // Limpiar y cerrar modal
    jsonInput.value = '';
    modalJson.classList.add('hidden');

  } catch (error) {
    alert("El formato JSON es inválido. Revisá las comillas y comas.");
  }
});

// Función para renderizar la tarjeta en la pantalla
function crearTarjetaJuego(juego) {
  const card = document.createElement('div');
  card.className = 'game-card';

  // Usar imagen por defecto si no pasa una portada
  const portadaUrl = juego.portada || 'https://via.placeholder.com/300x150/0f172a/6366f1?text=Juego';

  card.innerHTML = `
    <div class="game-cover">
      <img src="${portadaUrl}" alt="${juego.titulo}">
    </div>
    <div class="game-info">
      <h3>${juego.titulo}</h3>
      <p class="game-genre">${juego.genero || 'Generico'}</p>
      <a href="${juego.ejecutable}" target="_blank" class="btn-play-game">▶ Lanza / Jugar</a>
    </div>
  `;

  gamesGrid.appendChild(card);
}