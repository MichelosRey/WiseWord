let palabrasCombinadas = []; // Array para almacenar las palabras y sus traducciones
let tarjeta1 = null;
let tarjeta2 = null;
let primeraPalabra = null;
let segundaPalabra = null;
let tarjetasVolteadas = 0;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 30;
let tiempoInicial = 30;
let tiempoRegresivo = null;

let visualizarMovimientos = document.getElementById('movimientos');
let visualizarAciertos = document.getElementById('aciertos');
let visualizarTiempo = document.getElementById('t-restante');

// Cargar el archivo JSON de palabras
fetch('palabras.json')
  .then(response => response.json())
  .then(data => {
    palabrasCombinadas = data.words.concat(data.words); // Duplicamos las palabras
    palabrasCombinadas.sort(() => Math.random() - 0.5); // Mezclamos las palabras
    crearTabla(); // Llamamos a la función para crear la tabla de botones
  })
  .catch(error => console.error('Error cargando el archivo JSON:', error));

function crearTabla() {
  // Generamos la tabla de botones en el HTML
  let tabla = document.getElementById('tabla');
  let contador = 0; // contador para asignar IDs a las tarjetas
  for (let i = 0; i < 4; i++) {
    let fila = tabla.insertRow();
    for (let j = 0; j < 4; j++) {
      let celda = fila.insertCell();
      celda.innerHTML = `<button id="${contador}" onclick="voltear(${contador})"></button>`;
      contador++;
    }
  }
}

function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    tiempo--;
    visualizarTiempo.innerHTML = `Tiempo: ${tiempo} s`;
    if (tiempo == 0) {
      clearInterval(tiempoRegresivo);
      gameOver();
      visualizarTiempo.innerHTML = `Game Over &#128078`;
    }
  }, 1000);
}

function gameOver() {
  for (let i = 0; i < palabrasCombinadas.length; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = '';
    tarjetaBloqueada.disabled = true;
  }
}

function voltear(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  let palabraMostrada = palabrasCombinadas[id]; // Palabra mostrada en la tarjeta

  if (tarjetasVolteadas == 0) {
    tarjeta1 = document.getElementById(id);
    primeraPalabra = palabraMostrada.ingles;
    tarjeta1.innerHTML = primeraPalabra;
    tarjeta1.disabled = true;
  } else if (tarjetasVolteadas == 1) {
    tarjeta2 = document.getElementById(id);
    segundaPalabra = palabraMostrada.espanol;
    tarjeta2.innerHTML = segundaPalabra;
    tarjeta2.disabled = true;

    movimientos++;
    visualizarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primeraPalabra === segundaPalabra) {
      aciertos++;
      visualizarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      if (aciertos == palabrasCombinadas.length / 2) {
        clearInterval(tiempoRegresivo);
        visualizarAciertos.innerHTML = `Aciertos: ${aciertos} 🎉`;
        visualizarTiempo.innerHTML = `¡Enhorabuena! ¡Lo has conseguido en ${tiempoInicial - tiempo} segundos! 🏆`;
        visualizarMovimientos.innerHTML = `Movimientos: ${movimientos} 📊`;
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = '';
        tarjeta2.innerHTML = '';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
      }, 600);
    }
  }

  tarjetasVolteadas = (tarjetasVolteadas + 1) % 2;
}
