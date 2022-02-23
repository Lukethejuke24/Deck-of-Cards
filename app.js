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

function dealCards(deckId){
    const getCardsUrl = "https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2"
    const myRequest = new Request(getCardsUrl);
    return fetch(myRequest)
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
}

async function Deal(){
    //alert('Cards Dealt')
    const deckId = await getData()
    console.log(deckId)
    const myCards = await dealCards(deckId)
    console.log(myCards);
}
function Stand(){
    alert('You chose to stand')
}


//Html Calls

        btnDeal.addEventListener("click",Deal)
        btnHit.addEventListener("click",Hit)
        btnStand.addEventListener("click",Stand)
    
