'use strict'

//import jq from "jquery";

const btnDeal = document.getElementById("dealCards");
const btnHit = document.getElementById("hit");
const btnStand = document.getElementById("stand");
const deckCount = 6;
const shuffleUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count="+deckCount;
let dealerDeck = [];
let playerDeck = [];
let deckId = "";
let DealerScore = 0;
let playerScore = 0;

//Functions
function getScore(cards){
    let hasAce = false;
    var score = cards.reduce((amt, card) => {
      if (card.value === "ACE") {
        hasAce = true;
        return amt + 1
      }
      if (isNaN(card.value)) { return amt + 10 }
      return amt + Number(card.value);
    }, 0)
    if (hasAce) {
      score = (score + 10) > 21 ? score : score + 10;
    }
    return score
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
    //alert('You recieved a hit')
    reset() ///reset everyting
}

function Deal(){
    //alert('Cards Dealt');
    fetch("https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=4")
    .then(dealtDeck => dealtDeck.json())
    .then(dealtDeck => {
        dealerDeck.push(dealtDeck[0],dealtDeck[2]);
        playerDeck.push(dealtDeck.cards[1],dealtDeck.cards[3])
        console.log(playerDeck)
        playerScore = getScore(playerDeck);
        if (playerScore === 21) {
          alert("BlackJack! You Win!") 
        }
        console.log(playerScore)
    })
    
       
}   


function Stand(){
    ///alert('You chose to stand')
    reset() ///reset everyting
}


//Html Calls

        btnDeal.addEventListener("click",Deal)
        btnHit.addEventListener("click",Hit)
        btnStand.addEventListener("click",Stand)
    
