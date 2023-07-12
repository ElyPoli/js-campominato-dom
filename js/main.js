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

    const arrayCellNumber = createSequentialNumber(numberOfCell); // Richiamo la funzione che crea i numeri da inserire nelle celle
    printCell(arrayCellNumber, numberOfCell); // Richiamo la funzione che stampa il numero di celle richieste dall'utente

    btnCreate.classList.add("disabled"); // Una volta cliccato il pulsante che crea la griglia lo disabilito
}

// Funzione che crea un numero progressivo da 1 a quello che seleziona l'utente
function createSequentialNumber(limitNumber) {
    const arraySequentialNumber = [];

    for (let i = 1; i <= limitNumber; i++) {
        arraySequentialNumber[i - 1] = i;
    }
    return arraySequentialNumber;
}

// Funzione che crea una singola cella inserendo un numero all'interno
function createSingleCell(arrayNumberInsert, indexNumberInsert, idCellNumber) {
    gridCreate.innerHTML +=
        `
        <div class="text-center fs-3 fw-bold border my-single-cell" id="${idCellNumber}" onclick="cellClik(${idCellNumber})">${arrayNumberInsert[indexNumberInsert]}</div>
        `;
    // Per ogni cella che creo aggiugno una funzione (cellClik) che si attiva al click della cella corrispondente

    selectDifficulty(); // Richiamo la funzione che in base alla difficoltà selezionata aggiunge alle celle una classe
}

// Funzione che stampa il numero di celle richieste dall'utente
function printCell(arrayCellNumberPrint, numberOfCellPrint) {
    let i = 0;

    // Stampo il numero di celle richieste dall'utente
    for (let z = 1; z <= numberOfCellPrint; z++) {
        createSingleCell(arrayCellNumberPrint, i, z); // Richiamo la funzione che crea una singola cella
        i++;
    }
}

// Funzione che in base alla difficoltà selezionata aggiunge alle celle una classe
function selectDifficulty() {
    const numberOfCell = parseInt(selectDifficultyElement.value);

    const widthCells = document.querySelectorAll(".my-single-cell");
    let easy = 100;
    let medium = 81;

    // Scorro su tutti gli elementi che hanno la classe ".my-single-cell" e in base alla difficoltà selezionata aggiungo ad ogni cella una larghezza differente
    for(let i = 0; i < widthCells.length; i++) {
        if (numberOfCell === easy) {
            widthCells[i].classList.add("my-cel-width-easy");
        } else if (numberOfCell === medium) {
            widthCells[i].classList.add("my-cel-width-medium");
        } else {
            widthCells[i].classList.add("my-cel-width-hard");
        }
    }
}

// Funzione che viene attivata ogni volta che l'utente clicca su una cella
function cellClik(cell) {
    console.log(cell);
    document.getElementById(cell).classList.add("my-bg-blue");
}

// Pulsante retry
btnRetry.addEventListener("click", function () {
    location.reload();
})