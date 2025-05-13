const palabras = [
  "lollygag",
  "nonsense",
  "doppelganger",
  "ornitorrinco",
  "cooked",
  "salami",
  "thundercats",
  "malarkey",
  "frito"
];

const emojisAhorcado = ["🙂", "😕", "😟", "😣", "😫", "😵", "💀"];
const coloresFondo = ["#d4fcd4", "#cceeff", "#fffacd", "#ffddb3", "#ffb3b3", "#ff6666", "#990000"];

let palabraSecreta;
let letrasAdivinadas = [];
let intentos = 6;
let modoAmigosActivo = false;

const palabraElem = document.getElementById("palabra");
const intentosElem = document.getElementById("intentos");
const letrasDiv = document.getElementById("letras");
const emojiElem = document.getElementById("emojiAhorcado");
const reiniciarBtn = document.getElementById("reiniciar");
const modoAmigosBtn = document.getElementById("modoAmigos");
const inputAmigos = document.getElementById("inputAmigos");
const palabraInput = document.getElementById("palabraPersonal");
const usarPalabraBtn = document.getElementById("usarPalabra");

function iniciarJuego(palabraManual = null) {
  palabraSecreta = palabraManual || palabras[Math.floor(Math.random() * palabras.length)];
  letrasAdivinadas = [];
  intentos = 6;
  actualizarFondo();
  emojiElem.textContent = emojisAhorcado[0];
  mostrarPalabra();
  crearBotones();
  intentosElem.textContent = "Intentos restantes: " + intentos;
}

function mostrarPalabra() {
  const texto = palabraSecreta
    .split("")
    .map(letra => (letrasAdivinadas.includes(letra) ? letra : "_"))
    .join(" ");
  palabraElem.textContent = texto;
}

function crearBotones() {
  letrasDiv.innerHTML = "";
  "abcdefghijklmnopqrstuvwxyz".split("").forEach(letra => {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.addEventListener("click", () => manejarLetra(letra, btn));
    letrasDiv.appendChild(btn);
  });
}

function manejarLetra(letra, boton) {
  boton.disabled = true;

  if (!letrasAdivinadas.includes(letra)) {
    letrasAdivinadas.push(letra);
    if (!palabraSecreta.includes(letra)) {
      intentos--;
      emojiElem.textContent = emojisAhorcado[6 - intentos];
      actualizarFondo();
    }
    mostrarPalabra();
    verificarFin();
  }
}

function verificarFin() {
  if (!palabraElem.textContent.includes("_")) {
    alert("🎉 ¡Ganaste! La palabra era: " + palabraSecreta);
    desactivarBotones();
  } else if (intentos === 0) {
    alert("💀 Perdiste. La palabra era: " + palabraSecreta);
    desactivarBotones();
  }
}

function desactivarBotones() {
  const botones = document.querySelectorAll("#letras button");
  botones.forEach(b => b.disabled = true);
}

function actualizarFondo() {
  document.body.style.backgroundColor = coloresFondo[6 - intentos];
}

reiniciarBtn.addEventListener("click", () => {
  iniciarJuego();
  inputAmigos.style.display = "none";
  palabraInput.value = "";
  modoAmigosActivo = false;
});

modoAmigosBtn.addEventListener("click", () => {
  inputAmigos.style.display = "block";
  modoAmigosActivo = true;
});

usarPalabraBtn.addEventListener("click", () => {
  const palabraIngresada = palabraInput.value.trim().toLowerCase();
  if (palabraIngresada && /^[a-z]+$/.test(palabraIngresada)) {
    iniciarJuego(palabraIngresada);
    inputAmigos.style.display = "none";
  } else {
    alert("Por favor, escribe solo letras sin espacios ni números.");
  }
});

iniciarJuego();
