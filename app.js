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

}

function reset(){
let dealerDeck = [];
let playerDeck = [];



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
    reset() ///reset everyting
    fetch("https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=4")
    .then(dealDeck => dealDeck.json())
    .then(dealDeck => {
        dealerDeck.push(dealDeck[0],dealDeck[2]);
        playerDeck.push(dealDeck.cards[1],dealDeck.cards[3])
        var deckId = await getData()
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
    
