
let cartas = [];

fetch("cartas_naturaleza_mvp.json")
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
    <div class="card" onclick="this.style.transform = 'rotateY(180deg)'">
      <div style="width:100%; height:100%; background:#ccc; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
        ${carta.titulo}
      </div>
      <div class="back">
        <h2>${carta.titulo}</h2>
        <p>${carta.texto.replace(/\\n/g, "<br>")}</p>
      </div>
    </div>
  `;
}

//function tirarCarta() {
//  const carta = cartas[Math.floor(Math.random() * cartas.length)];
  //const container = document.getElementById("carta-container");
//  container.innerHTML = `
//    <div class="card" onclick="this.style.transform = 'rotateY(180deg)'">
//      <img src="\${carta.imagen}" alt="\${carta.titulo}" />
//      <div class="back">
//        <h2>\${carta.titulo}</h2>
//        <p>\${carta.texto.replace(/\n/g, "<br>")}</p>
//      </div>
//    </div>
//  `;
//}
