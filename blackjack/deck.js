var deck = [];
var dealerHand = [];
var playerHand = [];
var playerPoints = 0;
var dealerPoints = 0;
var playerTurn = true;
var dealerTurn = false;
function createDeck() {
    var suites = ['C', 'D', 'H', 'S'];
    var deckValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    for(var i = 0; i < suites.length; i++) {
        for (var j = 0; j < deckValue.length; j++) {
            var createCard = {Card: deckValue[j], Suite: suites[i], Value: deckValue[j]};
            deck.push(createCard);
        }
    }
    convertFaceToValue();
    shuffleDeck();
}
function convertFaceToValue() {
    for(var i = 0; i < deck.length; i++) {
        if (deck[i].Value === 'J' || deck[i].Value === 'Q' || deck[i].Value === 'K') {
            deck[i].Value = '10';
        }
        if(deck[i].Value === 'A') {
            deck[i].Value = '11';
        }
    }
}

function shuffleDeck() {
    var shuffledDeck = [];
    while (deck.length > 0) {
        var randomIndex = Math.floor(Math.random() * deck.length);
        var randomCard = deck[randomIndex];
        shuffledDeck.push(randomCard);
        deck.splice(randomIndex, 1);

    }
    deck = shuffledDeck;
    startGame();
}

function startGame() {
    for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * deck.length);
        var randomCard = deck[randomIndex];
        if (playerTurn === true) {
            deck.splice(randomCard, 1);
            playerHand.push(randomCard);
            playerTurn = false;
            dealerTurn = true;
        } else {
            deck.splice(randomCard, 1);
            dealerHand.push(randomCard);
            dealerTurn = false;
            playerTurn = true
        }
    }
    calculateFirstHand(playerHand, dealerHand);
    renderPointsOnDom();
}

function calculateFirstHand(playerHand, dealerHand) {
    for(var i = 0; i < playerHand.length; i++) {
        playerPoints += parseInt(playerHand[i].Value);
    }
    for(var j = 0; j <dealerHand.length; j++) {
        dealerPoints += parseInt(dealerHand[j].Value);
    }
    winCondition();
}

function winCondition() {
    if(playerPoints === 21 && dealerPoints === 21) {
        console.log('Push, Both of you have Blackjack');
    } else if(dealerPoints === 21) {
        console.log('Dealer Has Blackjack, You Lose');
    } else if(playerPoints === 21) {
        console.log('Blackjack, You Win');
    } else if(playerPoints > 21) {
        console.log('Player Busts');
    } else if(dealerPoints > 21) {
        console.log('Dealer Busts, You Win');
    }
}

function hitCard(currentHand, currentPlayerPoints) {
    if(dealerPoints < 21 && playerPoints < 21) {
        currentHand.push(deck[0]);
        deck.splice(0, 1);
        var lastCardIndex = currentHand.length -1;
        currentPlayerPoints += parseInt(currentHand[lastCardIndex].Value);
        return currentPlayerPoints;
        // winCondition();
    } else {
        return currentPlayerPoints;
    }
    renderPointsOnDom();
}

function renderPointsOnDom() {
    for(var i = 0; i < playerHand.length; i++) {
       var playerSpan = $('<span>').text(playerHand[i].Value);
       $('.player').append(playerSpan);
    }
    for(var i = 0; i < dealerHand.length; i++) {
        var dealerSpan = $('<span>').text(dealerHand[i].Value);
        $('.dealer').append(dealerSpan);
    }
}
createDeck();
console.log('Player: ', playerPoints);
console.log('Dealer: ', dealerPoints);

