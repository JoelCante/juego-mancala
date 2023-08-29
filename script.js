function iniciar(){
 emergente();
 iniciaJuego();
}

function abrir(){
document.getElementById("reg").style.display="block";

}

function cerrar(){
  document.getElementById("reg").style.display="none";
  document.getElementById("cont_em").style.display="none";
  document.getElementById("cont_tur").style.display="none";
  document.getElementById("cont_cap").style.display="none";
  }

  function cerrar2(){
    document.getElementById("gan").style.display="none";
    iniciaJuego();
    document.getElementById("gan2").style.display="none";
    iniciaJuego();
    }

 function emergente(){
  document.getElementById("cont_em").style.display="block";
 }   




const FICHAS_CONT = 4;
let Jug = {
  0: { Fch: [], score: 0 }, ///LA VARIABLE "PUNT" genera conflicto con el HTML
  1: { Fch: [], score: 0 },
};

let Tur;
let turnText = document.querySelector("#turn");

let jug1scoreText = document.querySelector("#player1score");
let jug2scoreText = document.querySelector("#player2score");

let table = document.querySelector("table");
let Filas = [];
Filas[0] = document.querySelector("#player1stones");
Filas[1] = document.querySelector("#player2stones");

let body = document.querySelector("body");

iniciaJuego();
function iniciaJuego() {

  for (let i = 0; i < 2; i++) {
    Jug[i].score = 0;
    for (let j = 0; j < 6; j++) {
      Jug[i].Fch[j] = FICHAS_CONT;
    }
  }
  Tur = 1;
  updateTabla();
  table.addEventListener("click", play);
}

function updateTabla() {
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 6; j++) {
      Filas[i].children[j].innerHTML = Jug[i].Fch[j];
    }
  turnText.innerHTML = `Es Turno del Jugador ${Tur} `;
  if(Tur==1){
    document.querySelector("#jug1").style.border = "2px solid #ECE632";
    document.querySelector("#jug2").style.border = "none";
  } else{
    document.querySelector("#jug2").style.border = "2px solid #ECE632";
    document.querySelector("#jug1").style.border = "none";
  }
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
      }, 300);
    }
  }, 300 * timer);
}

function finalJuego() {
  let finJuego = true;
  let clearLine;
  let ganador;
  for (let i = 0; i < 6; i++) {
    if (Jug[0].Fch[i] != 0) finJuego = false;
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
    
      if(ganador==1){
        document.getElementById("gan").style.display="block";
      }else{
        document.getElementById("gan2").style.display="block";
       
      }

    }
    table.removeEventListener("click", play);
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

function minmax(){
let movimiento = play(e);

if(movimiento){
  return true;
 }
}




function play(e) {
  let cell = e.target.cellIndex;
  let Pos = e.target.parentNode.rowIndex;
  let direction = 0;

  if (Jug[Pos].Fch[cell] > 0 && Pos == Tur - 1) {
    //Iniciando con un Clic  
    table.removeEventListener("click", play);
    let currentMoveFch = Jug[Pos].Fch[cell];
    let initialFch = currentMoveFch;
    let initialCell = `row: ${Pos} cell: ${cell}`;
    let timer = 0;
    Jug[Pos].Fch[cell] = 0;
    direction = Pos == 0 ? -1 : 1;
    Tur = Pos == 0 ? 2 : 1;
    currentPlayer = Pos == 0 ? 0 : 1;
    otherPlayer = Pos == 0 ? 1 : 0;
    updateCell(Pos, cell, timer, currentMoveFch);
    cell += direction;

    while (currentMoveFch > 0) {
      timer++;
      if (
        currentMoveFch == 1 && //Cuando finaliza deja  en 0
        currentPlayer == Pos &&
        Jug[currentPlayer].Fch[cell] == 0
      ) {
         Jug[currentPlayer].score += Jug[otherPlayer].Fch[cell] + 1;
        Jug[otherPlayer].Fch[cell] = 0;
        updateCell(Pos, cell, timer, currentMoveFch);
        updateCell(otherPlayer, cell, timer, currentMoveFch);
        
        document.getElementById("cont_cap").style.display="block";
      } else if (cell >= 0 && cell <= 5 && currentMoveFch > 0) {
        // Recorre las posciciones
        Jug[Pos].Fch[cell]++;
        updateCell(Pos, cell, timer, currentMoveFch);
      } else if (cell == -1 || cell == 6) {
        // Obtiene las celda del otro jugador
        if (currentPlayer == Pos) {
          Jug[currentPlayer].score++;
          updateCell(Pos, cell, timer, currentMoveFch);
          if (currentMoveFch == 1) {
            Tur = Tur == 1 ? 2 : 1;
           document.getElementById("cont_tur").style.display="block";
          }  
        } else {
          currentMoveFch++;
        }
        Pos = Pos == 0 ? 1 : 0;
        direction = Pos == 0 ? -1 : 1;
      }
      cell += direction;
      currentMoveFch--;
      goToNextFch = true;
    }
    checkGame();
    finalJuego();
   
    


  }
}

