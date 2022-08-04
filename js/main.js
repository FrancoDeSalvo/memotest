/* INICIALIZACION DE VARIABLES */
let flipedCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let moves = 0;
let success = 0;
let timer = false;
const INITIAL_TIME = 45;
let time = INITIAL_TIME;
let regressiveTime = null;

let winAudio = new Audio('../sounds/win.mp3');
let loseAudio = new Audio('../sounds/lose.mp3');
  

let showMoves = document.getElementById("moves");
let showSuccess = document.getElementById("success");
let showTime = document.getElementById("timer");

/* ARRAY CON NUMEROS ORDENADOS ALEATORIAMENTE */
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});

// console.log(numbers);

/* TEMPORIZADOR */
function countTime() {
  regressiveTime = setInterval(() => {
    time--;
    showTime.innerHTML = `Tiempo: ${time} segundos`;
    if (time == 0) {
      clearInterval(regressiveTime);
      lockCards();
      loseAudio.play();
    }
  }, 1000);
}

/* BLOQUEAR TARJETAS PARA MOSTRAR TODAS LAS POSICIONES DE LAS IMAGENES   */
function lockCards() {
  for (let i = 0; i <= 15; i++) {
    let lockedCard = document.getElementById(i);
    lockedCard.innerHTML = `<img src="../images/${numbers[i]}.png" alt="" >`;
    lockedCard.disabled = true;
  }
}

/* FUNCION PRINCIPAL */
function flip(id) {
  if (!timer) {
    countTime();
    timer = true;
  }

  flipedCards++;

  // console.log(flipedCards);

  if (flipedCards == 1) {
    /* MOSTRAR PRIMER NUMERO */
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img src="../images/${firstResult}.png" alt="" >`;

    /* DESHABILITAR PRIMER BOTON */
    card1.disabled = true;

    //    firstResult = prueba(id)
  } else if (flipedCards == 2) {
    /* MOSTRAR SEGUNDO NUMERO */
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML =`<img src="../images/${secondResult}.png" alt="" >`;

    /* DESHABILITAR SEGUNDO BOTON */
    card2.disabled = true;

    // INCREMENTAR MOVIMIENTOS
    moves++;
    showMoves.innerHTML = `Movimientos: ${moves}`;

    /* VERIFICAR QUE LOS DOS RESULTADOS SEAN IGUALES */
    if (firstResult == secondResult) {
      /* REINICIAMOS A 0 EL CONTADOR DE TARJETAS DESTAPADAS */
      flipedCards = 0;
      
      /* AUMENTAMOS ACIERTOS */
      success++;
      showSuccess.innerHTML = `Aciertos: ${success}`;
      

      /* VERIFICAMOS SI EL JUGADOR COMPLETO LOS ACIERTOS */
      if (success == 8) {
        clearInterval(regressiveTime);
        showSuccess.innerHTML = `Aciertos: ${success} ⭐ `;
        showMoves.innerHTML = `Movimientos: ${moves} 🕹️`;
        showTime.innerHTML = `Felicidades, solo te demoraste: ${INITIAL_TIME - time} segundos ⌛`;
        winAudio.play()
      }
    } else {
      // EN CASO DE QUE NO SEAN IGUALES, MOSTRAR MOMENTANEAMENTE VALORES Y VOLVER A TAPAR
      setTimeout(() => {
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        flipedCards = 0;
      }, 800);
    }
  }
}