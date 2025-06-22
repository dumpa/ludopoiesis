
let cartas = [];
let idioma = "es"; // idioma actual: "es" o "pt"


fetch("cartas_naturaleza_mvp2.json?v=" + new Date().getTime())
  .then(res => res.json())
  .then(data => cartas = data)
  .catch(err => console.error("Error al cargar cartas:", err));

function tirarCarta() {
  alert("Las cartas aún no se han cargado. Intenta de nuevo en unos segundos.");
    return;
  const carta = cartas[Math.floor(Math.random() * cartas.length)];
  window.cartaActual = carta;
  mostrarCarta(carta);
}

  const carta = cartas[Math.floor(Math.random() * cartas.length)];
  window.cartaActual = carta; 
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
function cambiarIdioma() {
  idioma = idioma === "es" ? "pt" : "es";
  document.getElementById("boton-idioma").innerText = idioma === "es" ? "🇪🇸 Español" : "🇧🇷 Português";
  if (window.cartaActual) {
    mostrarCarta(window.cartaActual); // recarga carta con nuevo idioma
  }
}
function mostrarCarta(carta) {
  const container = document.getElementById("carta-container");
  const titulo = idioma === "es" ? carta.titulo : carta.titulo_pt;
  const texto = idioma === "es" ? carta.texto : carta.texto_pt;

  container.innerHTML = `
    <div class="card" onclick="this.classList.toggle('flipped')">
      <div class="card-inner">
        <div class="card-front">
          <img src="${carta.imagen}" alt="${titulo}">
        </div>
        <div class="card-back">
          <h2>${titulo}</h2>
          <p>${texto.replace(/\\n/g, "<br>")}</p>
        </div>
      </div>
    </div>`;
}

function descargarImagenCarta() {
  const carta = document.querySelector(".card");
  if (!carta) {
    alert("Tira una carta primero.");
    return;
  }

  html2canvas(carta, { backgroundColor: null }).then(canvas => {
    // Crear un enlace para descargar
    const link = document.createElement("a");
    link.download = `ludopoiesis_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

function compartirCarta() {
  if (!window.cartaActual) {
    alert("Tira una carta primero.");
    return;
  }

  const mensaje = `🃏 Ludopoiesis\n“${cartaActual.titulo}”\n\n${cartaActual.texto}\n\n👉 https://dumpa.github.io/ludopoiesis`;

  if (navigator.share) {
    navigator.share({
      title: 'Ludopoiesis',
      text: mensaje,
      url: 'https://dumpa.github.io/ludopoiesis'
    }).catch(err => console.error('Error al compartir', err));
  } else {
    alert("Tu navegador no permite compartir directo. Puedes copiar el texto o hacer pantallazo.");
  }
}
