const contador_Fch = 4;
let Jug = {
  0: { Fch: [], punt: 0 },
  1: { Fch: [], punt: 0 },
};

let turn;
let turnText = document.querySelector("#cont");

let jug1PuntajeText = document.querySelector(".contenedorJug1");
let jug2PuntajeText = document.querySelector(".contenedorJug2");

let table = document.querySelector("table");
let fila = [];
fila[0] = document.querySelector("#Fila-Jug1");
fila[1] = document.querySelector("#Fila-Jug2");

let body = document.querySelector("body");

inicioJuego();
function inicioJuego() {
  for (let i = 0; i < 2; i++) {
    Jug[i].punt = 0;
    for (let j = 0; j < 6; j++) {
      Jug[i].Fch[j] = contador_Fch;
    }
  }
  turn = 1;
  actualizarTab();
  table.addEventListener("click", play);
}

function actualizarTab() {
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 6; j++) {
      fila[i].children[j].innerHTML = Jug[i].Fch[j];
    }
  turnText.innerHTML = turn;
  jug1PuntajeText.innerHTML = Jug[0].punt;
  jug2PuntajeText.innerHTML = Jug[1].punt;
}

function updateCell(row, cell, timer, lastStone) {
  setTimeout(() => {
    function changStyle(element) {
      element.setAttribute(
        "style",
        "border: 4px dotted blue; color: yellow; font-weight: bold"
      );
    }

    function cleanStyle() {
      function setAttribute(element) {
        element.setAttribute("style", "border: ; color: ; font-weight: ");
      }
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 6; j++) {
          setAttribute(fila[i].children[j]);
        }
      setAttribute(jug1PuntajeText);
      setAttribute(jug2PuntajeText);
    }

    cleanStyle();

    if (cell >= 0 && cell < 6) {
      fila[fila].children[cell].innerHTML = Jug[fila].Fch[cell];
      jug1PuntajeText.innerHTML = Jug[0].punt;
      jug2PuntajeText.innerHTML = Jug[1].punt;
      changStyle(fila[row].children[cell]);
    }
    if (cell == -1) {
        jug1PuntajeText.innerHTML = Jug[0].punt;
      changStyle(jug1PuntajeText);
    }
    if (cell == 6) {
        jug2PuntajeText.innerHTML = Jug[1].punt;
      changStyle(jug2PuntajeText);
    }
    if (lastStone == 1) {
      setTimeout(() => {
        actualizarTab() ;
        cleanStyle();
        table.addEventListener("click", play);
      }, 400);
    }
  }, 400 * timer);
}

function FinJuego() {
  let finJuego = true;
  let borraLinea;
  let Ganador;
  for (let i = 0; i < 6; i++) {
    if (Jug[0].Fch[i] != 0) finJuego = false;
  }
  borraLinea = finJuego ? 0 : 1;
  otroJug = borraLinea == 0 ? 1 : 0;
  if (!finJuego) {
    finJuego = true;
    for (let i = 0; i < 6; i++) {
      if (Jug[1].Fch[i] != 0) finJuego = false;
    }
  }
  if (finJuego) {
    for (let i = 0; i < 6; i++)
      Jug[otroJug].punt += Jug[otroJug].Fch[i];
    if (Jug[0].punt == Jug[1].punt)
      turnText.innerHTML = `Empate`;
    else {
      Ganador = Jug[0].punt > Jug[1].punt ? 1 : 2;
      turnText.innerHTML = Ganador;
    }
    table.removeEventListener("click", play);
    button = document.createElement("button");
    button.innerHTML = "NuevoJuego";
    button.addEventListener(`click`, () => {
        inicioJuego();
      body.removeChild(button);
    });
    body.appendChild(button);
  }
}

function checaJuego() {
  totalFch = 0;
  for (let i = 0; i < 2; i++) {
    totalFch += Jug[i].punt;
    for (let j = 0; j < 6; j++) {
      totalFch += Jug[i].Fch[j];
    }
  }
  if (totalFch != 48) console.log("we have a problem");
}

let i = 1;
turnText.addEventListener("click", function () {
  for (let p = 0; p < 100; p++) {
    setTimeout(() => {
      let j = Math.floor(Math.random() * 6);
      fila[0].children[j].click();
      fila[1].children[j].click();
    }, 1000);
  }
});

function Jugar(e) {
  let cell = e.target.cellIndex;
  let fila = e.target.parentNode.rowIndex;
  let direccion = 0;

  if (Jug[fila].Fch[cell] > 0 && Fila == turn - 1) {
    // A good click
    table.removeEventListener("click", play);
    let actMovFch= Jug[Fch].Fch[cell];
    let iniciaFch = actMoveFch;
    let initialCell = `row: ${fila} cell: ${cell}`;
    let timer = 0;
    Jug[fila].Fch[cell] = 0;
    direccion = fila == 0 ? -1 : 1;
    turn = fila == 0 ? 2 : 1;
    actJug = fila == 0 ? 0 : 1;
    otroJug = fila == 0 ? 1 : 0;
    updateCell(fila, cell, timer, ActJugMov);
    cell += direccion;

    while (ActJugMov > 0) {
      timer++;
      if (
        ActJugMov == 1 && //when finish on empty cell
        ActJug == fila &&
        Jug[ActJug].Fch[cell] == 0
      ) {
        Jug[ActJug].punt += Jug[otroJug].Fch[cell] + 1;
        Jug[otroJugador].Fch[cell] = 0;
        updateCell(Cambialo, cell, timer, ActJugMov);
        updateCell(otroJugador, cell, timer, ActJugMov);
      } else if (cell >= 0 && cell <= 5 && ActJugMov > 0) {
        // run the row
        Jug[fila].Fch[cell]++;
        updateCell(fila, cell, timer, ActJugMov);
      } else if (cell == -1 || cell == 6) {
        // when gets to a player cell
        if (actJug == fila) {
          Jug[ActJugMov].punt++;
          updateCell(row, cell, timer, ActJugMov);
          if (ActJugMov == 1) {
            turn = turn == 1 ? 2 : 1;
          }
        } else {
            ActJugMov++;
        }
        fila = fila == 0 ? 1 : 0;
        direccion = fila == 0 ? -1 : 1;
      }
      cell += direction;
      ActJugMov--;
      goToNextStone = true;
    }
    checaJuego();
    FinJuego();
    
  }
}