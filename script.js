
let cartas = [];

fetch("cartas_naturaleza_mvp.json" + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    cartas = data;
  });

function tirarCarta() {
  if (!cartas.length) {
    alert("Las cartas aún no se han cargado. Intenta de nuevo en unos segundos.");
    return;
  }
  const carta = cartas[Math.floor(Math.random() * cartas.length)];
  const container = document.getElementById("carta-container");
  container.innerHTML = `
    <div class="card" onclick="this.classList.toggle('flipped')">
      <div class="card-inner">
        <div class="card-front">
          <img src="${carta.imagen}" alt="${carta.titulo}" style="max-width: 100%; max-height: 100%; object-fit: cover;">
        </div>
        <div class="card-back">
          <h2>${carta.titulo}</h2>
          <p>${carta.texto.replace(/\\n/g, "<br>")}</p>
        </div>
      </div>
    </div>
  `;
}
