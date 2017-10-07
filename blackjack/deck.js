$(document).ready(clickHandler);

var deck = [];
var dealerHand = [];
var playerHand = [];
var playerPoints = 0;
var dealerPoints = 0;
var playerTurn = true;
var dealerTurn = false;

function clickHandler() {
    var playerDiv = $('.player');
    var dealerDiv = $('.dealer');
    $('.playGame').on('click', startGame);
    $('.playerButton').on('click',function () {
        playerPoints = hitCard(playerHand, playerPoints, playerDiv);
        winCondition();
    });
    $('.dealerButton').on('click', function () {
        dealerPoints = hitCard(dealerHand, dealerPoints, dealerDiv);
        winCondition();
    });
}

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
}

function startGame() {
    deck = [];
    dealerHand = [];
    playerHand = [];
    playerPoints = 0;
    dealerPoints = 0;
    playerTurn = true;
    dealerTurn = false;
    $('div').empty();

    createDeck();
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
    renderStartingCardsOnDom();
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
        alert('Push, Both of you have Blackjack');
    } else if(dealerPoints === 21) {
        alert('Dealer Has Blackjack, You Lose');
    } else if(playerPoints === 21) {
        alert('Blackjack, You Win');
    } else if(playerPoints > 21) {
        alert('Player Busts');
    } else if(dealerPoints > 21) {
        alert('Dealer Busts, You Win');
    } else if(playerHand.length > 5 && playerPoints < 21) {
        alert('You have too many cards')
    }
}

function totalScore(currentHand) {

}

function hitCard(currentHand, currentPlayerPoints, currentDiv) {
    currentHand.push(deck[0]);
    deck.splice(0, 1);
    var lastCardIndex = currentHand.length -1;
    currentPlayerPoints += parseInt(currentHand[lastCardIndex].Value);
    renderHitCards(currentHand, currentDiv);
    return currentPlayerPoints;
}

function renderStartingCardsOnDom() {
    for(var i = 0; i < playerHand.length; i++) {
       var playerCardDiv =  $('<div>').addClass('card').text(playerHand[i].Value);
       $('.player').append(playerCardDiv);
    }
    for(i = 0; i < dealerHand.length; i++) {
        var dealerCardDiv =  $('<div>').addClass('card').text(dealerHand[i].Value);
        $('.dealer').append(dealerCardDiv);
    }
}
function renderHitCards(currentHand, currentDiv) {
    var playerHitCard =  $('<div>').addClass('card').text(currentHand[currentHand.length -1].Value);
    currentDiv.append(playerHitCard);
}

