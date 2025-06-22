
let cartas = [];

fetch("cartas_naturaleza_mvp.json")
  .then(response => response.json())
  .then(data => {
    cartas = data;
  });

function tirarCarta() {
  const carta = cartas[Math.floor(Math.random() * cartas.length)];
  const container = document.getElementById("carta-container");
  container.innerHTML = `
    <div class="card" onclick="this.style.transform = 'rotateY(180deg)'">
      <img src="\${carta.imagen}" alt="\${carta.titulo}" />
      <div class="back">
        <h2>\${carta.titulo}</h2>
        <p>\${carta.texto.replace(/\n/g, "<br>")}</p>
      </div>
    </div>
  `;
}
