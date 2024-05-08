//varaibles
let tarjetasVolteadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primeraTarjeta = null;
let segundaTarjeta = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 30;
let tiempoInicial = 30;
let tiempoRegresivo = null;

//seleccionamos elementos HTML donde vamos a mostrar informacion
let visualizarMovimientos = document.getElementById('movimientos');
let visualizarAciertos = document.getElementById('aciertos');
let visualizarTiempo = document.getElementById(`t-restante`);

//generamos números aleatorios
let num = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
num = num.sort(() => Math.random() - 0.5);
console.log(num);

//funcion para iniciar temporizador
function contarTiempo() {
    //establecemos un intervalo con setInterval() que se ejecuta cada segundo
    tiempoRegresivo = setInterval(() => {
        //decrementamos el tiempo en 1 y mostramos el tiempo restante
        tiempo--;  
        visualizarTiempo.innerHTML = `Tiempo: ${tiempo} s`;
        //si el tiempo llega a 0 detenemos el temporizador con clearInterval() y ejecutamos la funcion para manejar el final del juego 
        if (tiempo == 0) {
            clearInterval(tiempoRegresivo);
            gameOver();
            visualizarTiempo.innerHTML = `Game Over &#128078`;

        }
    }, 1000);
}
//funcion para final del juego 
function gameOver() {
    //mostramos todos los numeros de las tarjetas 
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = num[i];
        //deshabilitamos las tarjetas para que puedan voler a ser pulsadas
        tarjetaBloqueada.disabled = true;

    }
}

//Función principal
function voltear(id) {
    //verificamos si el temporizador esta apagado. Si es asi, se llama a la funcion contarTiempo() para iniciar la cuenta regreseiva 
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasVolteadas++;
    console.log(tarjetasVolteadas);

    if (tarjetasVolteadas == 1) {
        //mostramos el primer numero
        tarjeta1 = document.getElementById(id);
        primeraTarjeta = num[id];
        tarjeta1.innerHTML = primeraTarjeta;
        //deshabilitamos el primer boton para que no siga sumando al contador de tarjetasVolteadas si vuelves a hacer click
        tarjeta1.disabled = true;
    } else if (tarjetasVolteadas == 2) {
        //mostramos el segundo numero
        tarjeta2 = document.getElementById(id);
        segundaTarjeta = num[id];
        tarjeta2.innerHTML = segundaTarjeta;

        //deshabilitamos el segundo boton
        tarjeta2.disabled = true;

        //incrementamos en 1 el contador de movimientos y lo mostramos 
        movimientos++;
        visualizarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primeraTarjeta == segundaTarjeta) {
            //reseteamos contador de tarjetasVolteadas para poder voltear otras 2 tarjetas y continuar con el juego
            tarjetasVolteadas = 0
            //incrementamos el contador de aciertos y lo mostramos
            aciertos++;
            visualizarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if (aciertos == 8) { 
                //al llegar a 8 aciertos detenemos temporizador y mostramos mensaje final 
                clearInterval(tiempoRegresivo);
                visualizarAciertos.innerHTML = `Aciertos: ${aciertos} &#9996`;
                visualizarTiempo.innerHTML = `Enhorabuena! Lo has conseguido en ${tiempoInicial - tiempo} segundos!&#128293`;
                visualizarMovimientos.innerHTML = `Movimientos: ${movimientos} &#129304`;
            }
        } else {
            //mostramos temporalmente los valores y los ocultamos 
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasVolteadas = 0;

            }, 600);
        }
    }

}