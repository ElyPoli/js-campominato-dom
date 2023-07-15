/*
Consegna:
- Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
- In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
- La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
- Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

Superbonus 1
Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.

Superbonus 2
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.
*/

"use strict";

// Dichiaro variabili
const gridContainer = document.querySelector("#grid-container");
const selectDifficulty = document.getElementById("select-difficulty");
const btnNewGame = document.querySelector(".btn-new-game");
const btnRetry = document.querySelector(".btn-retry");
let counter = 0;

btnNewGame.addEventListener("click", onBtnNewGame);

// Click su "New Game"
function onBtnNewGame() {
    const numberOfCell = parseInt(selectDifficulty.value);

    btnNewGame.classList.add("disabled");

    const bombs = bombsCreate(numberOfCell);

    gridPrint(numberOfCell, bombs);
}

// Crea singola cella
function cellCreate(bombs, cellIdArray) {
    const cell = document.createElement("div");
    cell.classList.add("border");

    // Richiamo la funzione del click della cella
    cell.addEventListener("click", (event) => {
        cellClicked(event, bombs, cell, cellIdArray);
    });
    return cell;
}

// Crea la griglia
function gridCreate(numberOfCell, bombs) {
    const grid = [];
    const cellIdArray = cellIdNumber(numberOfCell);

    gameDifficulty(numberOfCell); // modifico la grandezza della griglia in base alla difficoltà selezionata

    for (let i = 0; i < numberOfCell; i++) {
        let cell = cellCreate(bombs, numberOfCell);

        cell.setAttribute("id", cellIdArray[i]);
        grid.push(cell);
    }
    return grid;
}

// Crea un array di numeri
function cellIdNumber(numberOfCell) {
    let cellIdArray = [];
    for (let i = 0; i < numberOfCell; i++) {
        cellIdArray.push(`_${i}`);
    }
    return cellIdArray;
}

// Aggiunge una classe in base al numero di celle da creare
function gameDifficulty(numberOfCell) {
    if (numberOfCell === 100) {
        gridContainer.classList.add("my-cel-width-easy");
    } else if (numberOfCell === 81) {
        gridContainer.classList.add("my-cel-width-medium");
    } else {
        gridContainer.classList.add("my-cel-width-hard");
    }
}

// Stampa la griglia
function gridPrint(numberOfCell, bombs) {
    const grid = gridCreate(numberOfCell, bombs);

    for (let i = 0; i < grid.length; i++) {
        gridContainer.append(grid[i]);
    }
}

// Crea le 16 bombe
function bombsCreate(numberOfCell) {
    const bombs = [];
    let singleBomb, newNumber;

    for (let i = 0; i <= 15; i++) {
        singleBomb = Math.floor(Math.random() * (numberOfCell + 1));
        newNumber = true;

        for (let z = 0; z < i; z++) {
            if (bombs[z] === `_${singleBomb}`) {
                newNumber = false;
            }
        }

        if (newNumber === true) {
            bombs[i] = `_${singleBomb}`;
        } else {
            i--;
        }
    }
    return bombs;
}

// Click della cella
function cellClicked(event, bombs, cell, numberOfCell) {
    let boolean = false;

    for (let i = 0; i < bombs.length; i++) {
        if (cell.id === bombs[i]) {
            boolean = true;
        }
    }

    if (boolean === true) {
        cell.classList.add("cell-exploded");
        allExplodes(bombs, numberOfCell); // rivelo le bombe
        endGame(counter); // termino la partita
    } else {
        cell.classList.add("cell-empty");
        counter++;
        maxCellSelected(counter, numberOfCell); // verifico il contatore
    }
}

// Rivela tutte le caselle bombe
function allExplodes(bombs, numberOfCell) {
    const allCells = document.querySelectorAll("#grid-container > div");
    const cellIdArray = cellIdNumber(numberOfCell);

    // Scorro su entrambi gli array per trovare le corrispondenze
    for (let i = 0; i < cellIdArray.length; i++) {
        for (let z = 0; z < bombs.length; z++) {
            if (cellIdArray[i] === bombs[z]) {
                allCells[i].classList.add("cell-exploded");
            }
        }
    }
}

// Verifica il contatore
function maxCellSelected(counter, numberOfCell) {
    const maxCell = numberOfCell - 16;

    if (counter === maxCell) {
        endGame(counter, maxCell); // termino la partita
    }
}

// Termina il gioco
function endGame(counter, maxCell) {
    const endGame = document.createElement("p");
    endGame.classList.add("end-game-click", "fw-bold", "fs-3", "d-flex", "align-items-center", "justify-content-center");

    if (counter === maxCell) {
        endGame.textContent = "HAI VINTO - Il tuo punteggio è di " + counter;
        endGame.classList.add("text-success");
    } else {
        endGame.textContent = "HAI PERSO - Il tuo punteggio è di " + counter;
        endGame.classList.add("text-warning");
    }
    gridContainer.append(endGame);
}

// Pulsante retry
btnRetry.addEventListener("click", function () {
    location.reload();
})