document.addEventListener("DOMContentLoaded", console.log("External script working"));

const cards = document.querySelectorAll(".card");
const dealerCards = document.querySelectorAll(".dealerCard");
const blankCard = document.getElementById("blank");
const newHandButton = document.getElementById("newHandButton");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const winDrawLossArea = document.getElementById("winLossArea");
const winPara = document.getElementById("wins");
let numberOfWins = 0;
const drawPara = document.getElementById("draws");
let numberOfDraws = 0;
const lossPara = document.getElementById("losses");
let numberOfLosses = 0;
let dealerCardHidden;
let dealerCardHiddenCardShow;
const playerAreaDiv = document.getElementById("playerArea");
const dealerAreaDiv = document.getElementById("dealerArea");
let cardsDealt = [];

const playerTotalDiv = document.querySelector(".playerTotal");
const dealerTotalDiv = document.querySelector(".dealerTotal");
let playerTotalP = document.getElementById("playerTotalPara");
let dealerTotalP = document.getElementById("dealerTotalPara");
let playerTotalNumber = 0;
let dealerTotalNumber = 0;

const aceOfSpades = document.getElementById("aceSpade");
const aceOfHearts = document.getElementById("aceHeart");
const aceOfClubs = document.getElementById("aceClub");
const aceOfDiamonds = document.getElementById("aceDiamond");
const dealerAceOfSpades = document.getElementById("dealerAceSpade");
const dealerAceOfHearts = document.getElementById("dealerAceHeart");
const dealerAceOfClubs = document.getElementById("dealerAceClub");
const dealerAceOfDiamonds = document.getElementById("dealerAceDiamond");

//const riggedBox = document.getElementById("riggedCheckbox");

function playerTotal() {
    cards.forEach((checkCardDisplay) => {
        if(checkCardDisplay.style.display == "block") {
            let cardValue = parseInt(checkCardDisplay.getAttribute("data-value"));
            //console.log(cardValue);

            playerTotalNumber += cardValue;
        } else {
            return;
            //console.log("Card is not displayed");
        }
    })
    //console.log(playerTotalNumber);

    let playerTotalNumberDisplay = document.createTextNode("Player Total: " + playerTotalNumber);

    if(playerTotalP.hasChildNodes()) {
        playerTotalP.removeChild(playerTotalP.firstChild);
    } 
    playerTotalP.appendChild(playerTotalNumberDisplay);
}
document.addEventListener("DOMContentLoaded", playerTotal());

function dealerTotal() {
    dealerCards.forEach((checkDealerCardDisplay) => {
        if(checkDealerCardDisplay.style.display == "block") {
            let cardValue = parseInt(checkDealerCardDisplay.getAttribute("data-value"));
            //console.log(cardValue);

            dealerTotalNumber += cardValue;
        } //else {
            //return;
            //console.log("Card is not displayed");
        //}
    })
    //console.log(playerTotalNumber);

    let dealerTotalNumberDisplay = document.createTextNode("Dealer Total: " + dealerTotalNumber);

    if(dealerTotalP.hasChildNodes()) {
        dealerTotalP.removeChild(dealerTotalP.firstChild);
    } 
    dealerTotalP.appendChild(dealerTotalNumberDisplay);
}
document.addEventListener("DOMContentLoaded", dealerTotal());


function appendWinsDrawsLosses() {
    winDrawLossArea.innerHTML = "";

    displayWins = document.createTextNode("Wins: " + numberOfWins + " ");
    winDrawLossArea.appendChild(displayWins);

    displayDraws = document.createTextNode("Draws: " + numberOfDraws + " ");
    winDrawLossArea.appendChild(displayDraws);

    displayLosses = document.createTextNode("Losses: " + numberOfLosses + " ");
    winDrawLossArea.appendChild(displayLosses);
}
document.addEventListener("DOMContentLoaded", appendWinsDrawsLosses());


function newHand() {
    cardsDealt.length = 0;
    playerAreaDiv.innerHTML = "";
    dealerAreaDiv.innerHTML = "";
    hitButton.disabled = false;
    standButton.disabled = false;

    cards.forEach((cardDisplayNone) => {
        cardDisplayNone.style.display = "none";
    })
    dealerCards.forEach((dealerCardDisplayNone) => {
        dealerCardDisplayNone.style.display = "none";
    })

    dealerCardHidden = Math.floor(Math.random() * 52);
    console.log(dealerCardHidden);

    dealerCards.forEach((dealerCardHiddenCard) => {
        if(dealerCardHiddenCard.classList.contains(dealerCardHidden)) {
            dealerCardHiddenCard.style.display = "none";
            cardsDealt.push(dealerCardHidden);
        } 
    })

    let dealerCard = Math.floor(Math.random() * 52);
    console.log(dealerCard);
    dealerCards.forEach((dealerCardShow) => {
        if(dealerCardShow.classList.contains(dealerCard) && !cardsDealt.includes(dealerCard)) {
            dealerCardShow.style.display = "block";
            dealerAreaDiv.append(dealerCards[dealerCard]);
            cardsDealt.push(dealerCard);
        } else if(dealerCardShow.classList.contains(dealerCard) && cardsDealt.includes(dealerCard)) {
            dealerHit()
        }
    })

    dealerAreaDiv.append(dealerCards[dealerCardHidden]);

    blankCard.style.display = "block";
    dealerAreaDiv.append(dealerCards[52]);

    for(let i = 0; i < 2; i++) {
        let cardDeal = Math.floor(Math.random() * 52);
        console.log(cardDeal);
        cards.forEach((cardShow) => {
        if(cardShow.classList.contains(cardDeal) && !cardsDealt.includes(cardDeal)) {
            cardShow.style.display = "block";
            playerAreaDiv.append(cards[cardDeal]);
            cardsDealt.push(cardDeal);
        } else if(cardShow.classList.contains(cardDeal) && cardsDealt.includes(cardDeal)) {
            Hit();
            return;
        }
    })
    }
    
    playerTotalNumber = 0;
    dealerTotalNumber = 0;
    aceOfSpades.setAttribute("data-value", "11");
    aceOfHearts.setAttribute("data-value", "11");
    aceOfClubs.setAttribute("data-value", "11");
    aceOfDiamonds.setAttribute("data-value", "11");
    dealerAceOfSpades.setAttribute("data-value", "11");
    dealerAceOfHearts.setAttribute("data-value", "11");
    dealerAceOfClubs.setAttribute("data-value", "11");
    dealerAceOfDiamonds.setAttribute("data-value", "11");
    playerTotal();
    dealerTotal();
    aceIsOne()
}

function Hit() {
    let cardDeal = Math.floor(Math.random() * 52);
    console.log(cardDeal);
    cards.forEach((cardShow) => {
        if(cardShow.classList.contains(cardDeal) && !cardsDealt.includes(cardDeal)) {
            cardShow.style.display = "block";
            playerAreaDiv.append(cards[cardDeal]);
            cardsDealt.push(cardDeal);
        } else if(cardShow.classList.contains(cardDeal) && cardsDealt.includes(cardDeal)) {
            Hit();
            return;
        }
    })
    playerTotalNumber = 0;
    dealerTotalNumber = 0;
    playerTotal();
    aceIsOne()

    if(playerTotalNumber >21) {
        hitButton.disabled = true;
        stand();
        outcome();
    }
    
}

function dealerHit() {
    let dealerCard = Math.floor(Math.random() * 52);
    console.log(dealerCard);
    dealerCards.forEach((dealerCardShow) => {
        if(dealerCardShow.classList.contains(dealerCard) && !cardsDealt.includes(dealerCard)) {
            dealerCardShow.style.display = "block";
            dealerAreaDiv.append(dealerCards[dealerCard]);
            cardsDealt.push(dealerCard);
        } else if(dealerCardShow.classList.contains(dealerCard) && cardsDealt.includes(dealerCard)) {
            dealerHit();
        }
    })
    dealerTotalNumber = 0;
    dealerTotal();
    aceIsOne();
}

/*function dealerHitRigged() {
    console.log("Running Rigged");
    let dealerCard = Math.floor(Math.random() * 52);
    console.log(dealerCard);
    dealerCards.forEach((dealerCardShow) => {
        if(dealerCardShow.classList.contains(dealerCard) && !cardsDealt.includes(dealerCard)) {
            cardsDealt.push(dealerCard);
            dealerTotalNumber = 0;
            dealerTotal();
            console.log("Finished First If")
        }
        if(dealerTotalNumber < 17 && dealerTotalNumber < playerTotalNumber) {
                dealerCardShow.style.display = "block";
                dealerAreaDiv.append(dealerCards[dealerCard]);
                console.log("Second if Option 1")
            } else if(dealerTotalNumber > 21) {
                dealerHitRigged();
                console.log("Second if Option 2")
            }
            else if(dealerCardShow.classList.contains(dealerCard) && cardsDealt.includes(dealerCard)) {
            dealerHitRigged();
            console.log("Second if Option 3")
            }
    })
    dealerTotalNumber = 0;
    dealerTotal();
    aceIsOne();
}*/

function stand() {
    blankCard.style.display = "none";

    dealerCards.forEach((showHiddenDealerCard) => {
        if(showHiddenDealerCard.classList.contains(dealerCardHidden)) {
            showHiddenDealerCard.style.display = "block";
        }
    })

    standButton.disabled = true;
    hitButton.disabled = true;

    dealerTotalNumber = 0;
    dealerTotal();
    aceIsOne();

    /*if(riggedBox.checked == false) {
        dealerEnd();
    } else if(riggedBox.checked == true) {
        console.log("Rigged Is Checked");
        riggedDealerEnd();
    }*/
    dealerEnd();
}

function dealerEnd() {
        setTimeout(() => {
            if(dealerTotalNumber > playerTotalNumber) {
                outcome();
            } else if(dealerTotalNumber < 17 && (playerTotalNumber < 22)) {
                dealerHit();
                dealerEnd();
            } else if(dealerTotalNumber > 16 && playerTotalNumber <22) {
                outcome();
            }
    }, 500);
}

/*function riggedDealerEnd() {
        setTimeout(() => {
            if(dealerTotalNumber > playerTotalNumber) {
                outcome();
            } else if(dealerTotalNumber < 17 && (playerTotalNumber < 22)) {
                dealerHitRigged();
                riggedDealerEnd();
            } else if(dealerTotalNumber > 16 && playerTotalNumber <22) {
                outcome();
            }
    }, 500);
}*/

function outcome() {
    console.log("Running Outcome");
    if(playerTotalNumber > dealerTotalNumber && playerTotalNumber <22) {
        numberOfWins++;
        console.log("Win");
        appendWinsDrawsLosses();
    } else if(playerTotalNumber < dealerTotalNumber && dealerTotalNumber > 21) {
        numberOfWins++;
        console.log("Win");
        appendWinsDrawsLosses();
    } else if(dealerTotalNumber > playerTotalNumber && dealerTotalNumber <22) {
        numberOfLosses++;
        console.log("Loss");
        appendWinsDrawsLosses();
    } else if(playerTotalNumber > dealerTotalNumber && playerTotalNumber > 21) {
        numberOfLosses++;
        console.log("Loss");
        appendWinsDrawsLosses();
    }
    else if(playerTotalNumber == dealerTotalNumber && playerTotalNumber < 22) {
    numberOfDraws++;
    console.log("Draw");
    appendWinsDrawsLosses();
    }
}

function aceIsOne() {
    if(playerTotalNumber > 21 && (aceOfClubs.style.display === "block")) {
        aceOfClubs.setAttribute("data-value", "1");
    }
    playerTotalNumber = 0;
    playerTotal();
    if(playerTotalNumber > 21 && (aceOfHearts.style.display === "block")) {
        aceOfHearts.setAttribute("data-value", "1");
    }
    playerTotalNumber = 0;
    playerTotal();
    if(playerTotalNumber > 21 && (aceOfSpades.style.display === "block")) {
        aceOfSpades.setAttribute("data-value", "1");
    }
    playerTotalNumber = 0;
    playerTotal();
    if(playerTotalNumber > 21 && (aceOfDiamonds.style.display === "block")) {
        aceOfDiamonds.setAttribute("data-value", "1");
    }
    playerTotalNumber = 0;
    playerTotal();

    if(dealerTotalNumber > 21 && (dealerAceOfClubs.style.display === "block")) {
        dealerAceOfClubs.setAttribute("data-value", "1");
    }
    dealerTotalNumber = 0;
    dealerTotal();
    if(dealerTotalNumber > 21 && (dealerAceOfHearts.style.display === "block")) {
        dealerAceOfHearts.setAttribute("data-value", "1");
    }
    dealerTotalNumber = 0;
    dealerTotal();
    if(dealerTotalNumber > 21 && (dealerAceOfSpades.style.display === "block")) {
        dealerAceOfSpades.setAttribute("data-value", "1");
    }
    dealerTotalNumber = 0;
    dealerTotal();
    if(dealerTotalNumber > 21 && (dealerAceOfDiamonds.style.display === "block")) {
        dealerAceOfDiamonds.setAttribute("data-value", "1");
    }
    dealerTotalNumber = 0;
    dealerTotal();
}

function logCardsDealt() {
    console.log(cardsDealt);
}

function logCards() {
    console.log(cards);
}