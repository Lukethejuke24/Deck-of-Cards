'use strict'

//import jq from "jquery";

const btnDeal = document.getElementById("dealCards");
const btnHit = document.getElementById("hit");
const btnStand = document.getElementById("stand");
const deckCount = 6;
const shuffleUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count="+deckCount;
var request = new XMLHttpRequest()


//Functions
async function getData(){
    const myRequest = new Request(shuffleUrl);
    return fetch(myRequest)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${ response.status }`);
        }
        return response.json()
    })
    .then(data => {
    return data.deck_id
    }) 
}

async function dealCards(deckId,amount){
    const getCardsUrl = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=" + amount
    const myRequest = new Request(getCardsUrl);
    fetch("https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=4")
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${ response.status }`);
        }
        return response.json()
    })
    .then(data => {
        return data.cards
    }) 
}

function Hit(){
    alert('You recieved a hit')
    const newCard = await dealCards(deckId,1)
    console.log(newCard);
    myCards.push(newCard)
    console.log(myCards);
}

function Deal(){
    ///reset everyting
    fetch("https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=4")
    .then()
    var deckId = await getData()
    console.log(deckId)

    const myCards = await dealCards(deckId,2)
    console.log(myCards);
    alert('Cards Dealt')
    
}

function Stand(){
    alert('You chose to stand')
}


//Html Calls

        btnDeal.addEventListener("click",Deal)
        btnHit.addEventListener("click",Hit)
        btnStand.addEventListener("click",Stand)
    
