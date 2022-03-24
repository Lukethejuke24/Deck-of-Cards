'use strict'


let btnDeal = document.getElementById("dealCards");
let btnHit = document.getElementById("hit");
let btnStand = document.getElementById("stand");
let btnStartGame = document.getElementById("startButton");
let btnReset = document.getElementById("reset")
let txtPlayerScore = document.getElementById("playersScore");
let txtDealerScore = document.getElementById("dealersScore");
let imgPlayerCards = document.getElementById("playerCards");
let imgDealerCards = document.getElementById("dealerCards");


const deckCount = 6;
const shuffleUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count="+deckCount;
let dealerDeck = [];
let playerDeck = [];
let deckId = "";
let dealerScore = 0;
let playerScore = 0;
let resetGame = 1;

btnHit.hidden = true
btnStand.hidden = true
btnDeal.hidden = true
btnReset.hidden = true

//Start game
function startGame(){
  btnDeal.hidden = false
  console.log("start")
  btnStartGame.hidden = true
}

//Functions
function getScore(cards){
    let Ace = false;
    var score = cards.reduce((sum, card) => {
      if (card.value === "ACE") {
        Ace = true;
        return sum + 1
      }
      if (isNaN(card.value)) {
         return sum + 10 }
      return sum + Number(card.value);
    }, 0)
    if (Ace) {
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
        console.log("button change")
        btnStartGame.hidden = false
        btnReset.hidden = true
        btnHit.hidden = true
        btnStand.hidden = true
        btnDeal.hidden = true
        btnReset.hidden = true
        dealerDeck = [];
        playerDeck = [];
        dealerScore = 0;
        playerScore = 0;
        resetGame = 1;
        txtDealerScore.textContent = ""
        txtPlayerScore.textContent = ""
        startGame()
    })


}
function hit(){
    //alert('You recieved a hit')
    fetch("https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1")
    .then(dealtDeck => dealtDeck.json())
    .then(dealtDeck => {
      playerDeck.push(dealtDeck.cards[0])
      playerScore = getScore(playerDeck);
      txtPlayerScore.textContent = playerScore

      while (imgPlayerCards.firstChild) {
        imgPlayerCards.removeChild(imgPlayerCards.firstChild)}

      playerDeck.forEach(card => {
        let cards = document.createElement("img")
        cards.src = card.image
        imgPlayerCards.appendChild(cards)
      })

      if (playerScore > 21){
        alert("You Bust!") 
      }
      if (playerScore === 21) {
        alert("BlackJack! You Win!")
      }
    })

}

function dealerHit(){
    fetch("https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1")
    .then(dealtDeck => dealtDeck.json())
    .then(dealtDeck => {
      dealerDeck.push(dealtDeck.cards[0])
      dealerScore = getScore(dealerDeck)
      txtDealerScore.textContent = dealerScore

      while (imgDealerCards.firstChild) {
        imgDealerCards.removeChild(imgDealerCards.firstChild)}

      dealerDeck.forEach(card => {
        let cards = document.createElement("img")
        cards.src = card.image
        imgDealerCards.appendChild(cards)
      })


      if (dealerScore < playerScore & playerScore < 22 || dealerScore > 21 & playerScore <21){
        //alert("Player Wins!!")
      }
      
      if (dealerScore > playerScore & dealerScore < 22){
        //alert("Dealer Wins!!")
      } 
      
      if(dealerScore == playerScore){
        //alert("You break even!")
      }
    })

}

function deal(){
    //alert('Cards Dealt');
    fetch("https://www.deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=4")
    .then(dealtDeck => dealtDeck.json())
    .then(dealtDeck => {
        dealerDeck.push(dealtDeck.cards[0],dealtDeck.cards[2]);
        playerDeck.push(dealtDeck.cards[1],dealtDeck.cards[3]);
        dealerScore = getScore(dealerDeck);
        playerScore = getScore(playerDeck);
        if (playerScore === 21) {
          alert("BlackJack! You Win!") 
        }
        txtDealerScore.textContent = "Unknown"
        txtPlayerScore.textContent = playerScore

        while (imgDealerCards.firstChild) {
        imgDealerCards.removeChild(imgDealerCards.firstChild)}

        dealerDeck.forEach((card,i) =>{
          let cards = document.createElement("img")
          if (i == 0) {
              
          } else{
              cards.src = card.image
          }
          imgDealerCards.appendChild(cards)
        })
          
        while (imgPlayerCards.firstChild) {
          imgPlayerCards.removeChild(imgPlayerCards.firstChild)}

        playerDeck.forEach(card => {
          let cards = document.createElement("img")
          cards.src = card.image
          imgPlayerCards.appendChild(cards)
        })


        console.log(playerScore)
        btnHit.hidden = false
        btnStand.hidden = false
        btnReset.hidden = false
        btnDeal.hidden = true
    })
    

}   


function Stand(){
if (dealerScore <= 16){
 dealerScore = dealerHit()
}else{
  txtDealerScore.textContent = dealerScore

  while (imgDealerCards.firstChild) {
    imgDealerCards.removeChild(imgDealerCards.firstChild)}

    dealerDeck.forEach(card => {
      let cards = document.createElement("img")
      cards.src = card.image
      imgDealerCards.appendChild(cards)
    })

  if (dealerScore < playerScore & playerScore < 22){
    //alert("Player Wins!!")
  }
  
  if (dealerScore > playerScore & dealerScore < 22){
    //alert("Dealer Wins!!")
  } 
  
  if(dealerScore == playerScore){
    //alert("You break even!")
  }
  }
}


//Html Calls
btnStartGame.addEventListener("click",reset)
btnDeal.addEventListener("click",deal)
btnHit.addEventListener("click",hit)
btnStand.addEventListener("click",Stand)
btnReset.addEventListener("click",reset)
