'use strict'

const btnDeal = document.getElementById("dealCards");
const btnHit = document.getElementById("hit");
const btnStand = document.getElementById("stand");


        btnDeal.addEventListener("click",Deal)
        btnHit.addEventListener("click",Hit)
        btnStand.addEventListener("click",Stand)
    
        function Hit(){
            alert('You recieved a hit')
        }

        function Deal(){
            alert('Cards Dealt')
        }
        function Stand(){
            alert('You chose to stand')
        }