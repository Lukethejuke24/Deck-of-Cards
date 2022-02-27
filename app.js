'use strict'

//import jq from "jquery";

const btnDeal = document.getElementById("dealCards");
const btnHit = document.getElementById("hit");
const btnStand = document.getElementById("stand");
const deckCount = 6;
const shuffleUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count="+deckCount;
var request = new XMLHttpRequest()
let dealerDeck = [];
let playerDeck = [];
let deckId = "";

//Functions
async function getData(){

}

function reset(){
    dealerDeck = [];
    playerDeck = [];
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count="+deckCount)
    .then(deck => deck.json())
    .then(deck => {
        deckId = deck.deck_id

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
    reset() ///reset everyting
}

function Deal(){
    
    fetch("https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=4")
    .then(dealtDeck => dealtDeck.json())
    .then(dealtDeck => {
        dealerDeck.push(dealtDeck[0],dealtDeck[2]);
        playerDeck.push(dealtDeck.cards[1],dealtDeck.cards[3])
        console.log(playerDeck)
        alert('Cards Dealt');
        
    })
       
}   


function Stand(){
    alert('You chose to stand')
}


//Html Calls

        btnDeal.addEventListener("click",Deal)
        btnHit.addEventListener("click",Hit)
        btnStand.addEventListener("click",Stand)
    
