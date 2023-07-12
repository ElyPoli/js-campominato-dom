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
const btnCreate = document.querySelector(".btn-create");
const gridCreate = document.getElementById("grid-create");
const selectDifficultyElement = document.getElementById("select-difficulty");
const btnRetry = document.querySelector(".btn-retry");

btnCreate.addEventListener("click", onBtnCreate); // Richiamo la funzione click sul pulsante

// Funzione click sul pulsante
function onBtnCreate() {
    const numberOfCell = parseInt(selectDifficultyElement.value);

    // Richiamo la funzione che aggiunge tramite il dataset la difficoltà selezionata dall'utente all'id "grid-create"
    datasetDifficultySelected(gridCreate, numberOfCell);

    const arrayCellNumber = createSequentialNumber(numberOfCell); // Richiamo la funzione che crea i numeri da inserire nelle celle

    const gridOfCells = gridOfCellsCreate(arrayCellNumber, numberOfCell, numberOfCell); // Richiamo la funzione che crea la griglia di celle con il numero di celle richieste dall'utente

    printGridCreate(gridCreate, gridOfCells); // Richiamo la funzione che stampa il numero di celle richieste dall'utente

    btnCreate.classList.add("disabled"); // Una volta cliccato il pulsante che crea la griglia lo disabilito
}

// Funzione che crea un numero progressivo da 0 a quello che seleziona l'utente
function createSequentialNumber(limitNumber) {
    const arraySequentialNumber = [];

    for (let i = 0; i <= limitNumber; i++) {
        arraySequentialNumber[i] = i;
    }

    return arraySequentialNumber;
}

// Funzione che crea una singola cella inserendo un numero all'interno
function createSingleCell(arraySequentialNumber, indexNumberInsert, numberOfCell) {

    // Creo una singola cella
    const singleCell = document.createElement("div");

    // Aggiungo le classi ad una singola cella
    singleCell.classList.add("text-center", "fs-3", "fw-bold", "border", "my-single-cell");
    singleCell.textContent = arraySequentialNumber[indexNumberInsert];

    // Richiamo la funzione che in base alla difficoltà selezionata aggiunge alla cella una classe diversa
    const singleCellAddDifficulty = selectDifficulty(singleCell, numberOfCell);

    // Richiamo la funzione del click della cella
    singleCellAddDifficulty.addEventListener("click", cellClik);

    return singleCellAddDifficulty;
}

// Funzione che in base alla difficoltà selezionata aggiunge ad una singola cella una classe diversa
function selectDifficulty(singleCell, numberOfCell) {

    const singleCellAddedClass = singleCell;

    let easy = 100;
    let medium = 81;

    // In base alla difficoltà selezionata aggiungo alla cella una classe differente
    if (numberOfCell === easy) {
        singleCellAddedClass.classList.add("my-cel-width-easy");
    } else if (numberOfCell === medium) {
        singleCellAddedClass.classList.add("my-cel-width-medium");
    } else {
        singleCellAddedClass.classList.add("my-cel-width-hard");
    }

    return singleCellAddedClass;
}

// Funzione che crea la griglia di celle con il numero di celle richieste dall'utente
function gridOfCellsCreate(arraySequentialNumber, numberOfCellPrint, numberOfCell) {

    const grid = [];
    let i = 0;
    let newSingleCell = createSingleCell(arraySequentialNumber, i, numberOfCell); // Richiamo la funzione che crea una singola cella per poter passare la singola cella alla funzione "createRandomNumber"

    // Richiamo la funzione che sorteggia 16 numeri casuali tra 0 e la difficoltà scelta dall'utente
    const randomNumbers = createRandomNumber(numberOfCell, newSingleCell);

    // Creo la griglia di celle con il numero di celle richieste dall'utenteù
    do {
        // Richiamo la funzione che crea una singola cella
        newSingleCell = createSingleCell(arraySequentialNumber, i, numberOfCell);

        // Richiamo la funzione che aggiunge un dataset argument agli elementi che corrispondono ai 16 numeri selezionati
        datasetExplodesCells(newSingleCell, i, randomNumbers);

        grid.push(newSingleCell);

        i++;
    } while (i < numberOfCellPrint);

    return grid;
}

// Funzione che stampa nel div "#grid-create" la griglia creata
function printGridCreate(gridCreate, grid) {

    for (let i = 0; i < grid.length; i++) {
        gridCreate.append(grid[i]);
    }
}

// Funzione che sorteggia 16 numeri casuali tra 0 e la difficoltà scelta dall'utente (creo le 16 bombe)
function createRandomNumber(numberOfCell) {
    const randomNumbers = [];
    let singleRandomNumber, newRandomNumber;

    // Per far sì che ciascun numero possa essere estratto una sola volta
    for (let i = 0; i <= 15; i++) {
        singleRandomNumber = Math.floor(Math.random() * (numberOfCell - 0 + 1)) + 0;
        newRandomNumber = true;

        for (let z = 0; z < i; z++) {
            if (randomNumbers[z] === singleRandomNumber) {
                newRandomNumber = false;
            }
        }

        if (newRandomNumber === true) {
            randomNumbers[i] = singleRandomNumber;
        } else {
            i--;
        }
    }

    console.log(randomNumbers);

    return randomNumbers;
}

// Funzione che aggiunge un dataset argument agli elementi che corrispondono ai 16 numeri selezionati
function datasetExplodesCells(newSingleCell, i, randomNumbers) {

    // Aggiungo un dataset argument se l'elemento corrisponde
    for (let z = 0; z <= randomNumbers.length; z++) {
        if (randomNumbers[z] === i) {
            newSingleCell.dataset.nomeArg = "explode";
            console.log(newSingleCell.dataset.nomeArg);
            console.log(newSingleCell);
            console.log(i);
        }
    }
}

// Funzione che aggiunge tramite il dataset la difficoltà selezionata dall'utente all'id "grid-create"
function datasetDifficultySelected(gridCreate, numberOfCell) {
    gridCreate.dataset.nomeArg = `_${numberOfCell}`;
    console.log(gridCreate.dataset.nomeArg);
    console.log(gridCreate);
}

// Funzione che viene attivata ogni volta che l'utente clicca su una cella
function cellClik() {
    this.classList.add("my-bg-blue");

    //Controllo se la casella cliccata dall'utente da parte dell'array di 16 numeri
    if (this.dataset.nomeArg === "explode") {
        this.classList.add("my-bg-red");

        // Richiamo la funzione che fa terminare la partita
        endGame();

    } else {
        this.classList.add("my-bg-blue");

        // Richiamo la funzione che aggiorna il contatore delle celle selezionate
        datasetAlredySelected();
    }
}

// Richiamo la funzione che aggiorna il contatore delle celle selezionate
function datasetAlredySelected() {
    let counter;
    counter++;

    // Se il contatore raggiunge il numero selezionato dall'utente (difficoltà) - 16 allora richiamo la funzione che fa terminare la partita

}



// Funzione che viene attivata quando il gioco termina
function endGame() {

    const endGame = document.getElementById("end-game");

    endGame.textContent = "End Game";
    endGame.classList.add("end-game-click");
}

// Pulsante retry
btnRetry.addEventListener("click", function () {
    location.reload();
})