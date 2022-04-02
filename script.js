const INITIAL_STONES_COUNT = 4;
let Jug = {
  0: { Fch: [], score: 0 },
  1: { Fch: [], score: 0 },
};

let Tur;
let turnText = document.querySelector(".Texto_turno");

let jug1scoreText = document.querySelector(".contenedorjug1");
let jug2scoreText = document.querySelector(".contenedorjug2");

let table = document.querySelector("table");
let Filas = [];
Filas[0] = document.querySelector(".Fila-Jug1");
Filas[1] = document.querySelector(".Fila-Jug2");

let body = document.querySelector("body");

iniciaJuego();
function iniciaJuego() {
  for (let i = 0; i < 2; i++) {
    Jug[i].score = 0;
    for (let j = 0; j < 6; j++) {
      Jug[i].Fch[j] = INITIAL_STONES_COUNT;
    }
  }
  Tur = 1;
  updateTabla();
  div.addEventListener("click", play);
}

function updateTabla() {
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 6; j++) {
      Filas[i].children[j].innerHTML = Jug[i].Fch[j];
    }
  turnText.innerHTML = `Es Turno del Jugador ${Tur} `;
  jug1scoreText.innerHTML = Jug[0].score;
  jug2scoreText.innerHTML = Jug[1].score;
}

function updateCell(row, cell, timer, lastStone) {
  setTimeout(() => {
    function changStyle(element) {
      element.setAttribute(
        "style",
        "border: 4px solid blue; color: yellow; font-weight: bold"
      );
    }

    function cleanEstilo() {
      function setAttribute(element) {
        element.setAttribute("style", "border: ; color: ; font-weight: ");
      }
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 6; j++) {
          setAttribute(Filas[i].children[j]);
        }
      setAttribute(jug1scoreText);
      setAttribute(jug2scoreText);
    }

    cleanEstilo();

    if (cell >= 0 && cell < 6) {
      Filas[row].children[cell].innerHTML = Jug[row].Fch[cell];
      jug1scoreText.innerHTML = Jug[0].score;
      jug2scoreText.innerHTML = Jug[1].score;
      changStyle(Filas[row].children[cell]);
    }
    if (cell == -1) {
      jug1scoreText.innerHTML = Jug[0].score;
      changStyle(jug1scoreText);
    }
    if (cell == 6) {
      jug2scoreText.innerHTML = Jug[1].score;
      changStyle(jug2scoreText);
    }
    if (lastStone == 1) {
      setTimeout(() => {
        updateTabla();
        cleanEstilo();
        table.addEventListener("click", play);
      }, 400);
    }
  }, 400 * timer);
}

function finalJuego() {
  let finJuego = true;
  let clearLine;
  let ganador;
  for (let i = 0; i < 6; i++) {
    if (Jug[0].stones[i] != 0) finJuego = false;
  }
  clearLine = finJuego ? 0 : 1;
  otherPlayer = clearLine == 0 ? 1 : 0;
  if (!finJuego) {
    finJuego = true;
    for (let i = 0; i < 6; i++) {
      if (Jug[1].Fch[i] != 0) finJuego = false;
    }
  }
  if (finJuego) {
    for (let i = 0; i < 6; i++)
      Jug[otherPlayer].score += Jug[otherPlayer].Fch[i];
    if (Jug[0].score == Jug[1].score)
      turnText.innerHTML = `Empate!!!.`;
    else {
      ganador = Jug[0].score > Jug[1].score ? 1 : 2;
      turnText.innerHTML = `Enhorabuena Jugador ${winner} ganaste!!.`;
    }
    table.removeEventListener("click", play);
    button = document.createElement("button");
    button.innerHTML = "Nuevo Juego";
    button.addEventListener(`click`, () => {
      iniciaJuego();
      body.removeChild(button);
    });
    body.appendChild(button);
  }
}

function checkGame() {
  totalFch = 0;
  for (let i = 0; i < 2; i++) {
    totalFch += Jug[i].score;
    for (let j = 0; j < 6; j++) {
      totalFch+= Jug[i].Fch[j];
    }
  }
  if (totalFch != 48) console.log("hubo un problema");
}

let i = 1;
turnText.addEventListener("click", function () {
  for (let p = 0; p < 100; p++) {
    setTimeout(() => {
      let j = Math.floor(Math.random() * 6);
      Filas[0].children[j].click();
      Filas[1].children[j].click();
    }, 1000);
  }
});

function play(e) {
  let cell = e.target.cellIndex;
  let row = e.target.parentNode.rowIndex;
  let direction = 0;

  if (Jug[row].Fch[cell] > 0 && row == Tur - 1) {
    // A good click
    table.removeEventListener("click", play);
    let currentMoveFch = Jug[row].Fch[cell];
    let initialFch = currentMoveFch;
    let initialCell = `row: ${row} cell: ${cell}`;
    let timer = 0;
    Jug[row].Fch[cell] = 0;
    direction = row == 0 ? -1 : 1;
    Tur = row == 0 ? 2 : 1;
    currentPlayer = row == 0 ? 0 : 1;
    otherPlayer = row == 0 ? 1 : 0;
    updateCell(row, cell, timer, currentMoveFch);
    cell += direction;

    while (currentMoveFch > 0) {
      timer++;
      if (
        currentMoveFch == 1 && //when finish on empty cell
        currentPlayer == row &&
        Jug[currentPlayer].Fch[cell] == 0
      ) {
         Jug[currentPlayer].score += Jug[otherPlayer].Fch[cell] + 1;
        Jug[otherPlayer].Fch[cell] = 0;
        updateCell(row, cell, timer, currentMoveFch);
        updateCell(otherPlayer, cell, timer, currentMoveFch);
      } else if (cell >= 0 && cell <= 5 && currentMoveFch > 0) {
        // run the row
        Jug[row].Fch[cell]++;
        updateCell(row, cell, timer, currentMoveFch);
      } else if (cell == -1 || cell == 6) {
        // when gets to a player cell
        if (currentPlayer == row) {
          Jug[currentPlayer].score++;
          updateCell(row, cell, timer, currentMoveFch);
          if (currentMoveFch == 1) {
            Tur = Tur == 1 ? 2 : 1;
          }
        } else {
          currentMoveFch++;
        }
        row = row == 0 ? 1 : 0;
        direction = row == 0 ? -1 : 1;
      }
      cell += direction;
      currentMoveFch--;
      goToNextFch = true;
    }
    checkGame();
    finalJuego();
    
  }
}