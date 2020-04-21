const arrayOfCards = [{ name: 'angular', img: 'images/angular.svg' }, { name: 'aurelia', img: 'images/aurelia.svg' },
{ name: 'backbone', img: 'images/backbone.svg' }, { name: 'hadoop', img: 'images/hadoop.svg' },
{ name: 'react', img: 'images/react.svg' }, { name: 'vue', img: 'images/vue.svg' }];

var firstMove = true;
let boardLock = false;
let choseOne, choseTwo;

document.addEventListener('DOMContentLoaded', () => {
    createGame();
});

function createGame() {
    const board = document.getElementById("board-cards");
    let newArrayOfCards = [];

    initializeCard(newArrayOfCards);
    sortCards(newArrayOfCards);

    for (let i = 0; i < newArrayOfCards.length; i++) {
        var cardDiv = document.createElement("div")
        cardDiv.setAttribute('class', 'card');
        cardDiv.addEventListener('click', flipCard);

        var front = document.createElement("img");
        front.setAttribute('class', 'front');
        front.setAttribute('src', arrayOfCards[newArrayOfCards[i]].img);
        front.setAttribute('alt', arrayOfCards[newArrayOfCards[i]].name);
        cardDiv.appendChild(front);

        var back = document.createElement("img");
        back.setAttribute('class', 'back');
        back.setAttribute('src', '/images/js-badge.svg');
        cardDiv.appendChild(back);

        board.appendChild(cardDiv);
    }
}

function initializeCard(arr) {
    let p;
    for (let i = 0; i < arrayOfCards.length * 2; i++) {
        p = i;
        if (p >= arrayOfCards.length) {
            p = p - 6;
        }
        arr.push(p);
    }
}

// Fisher Yates shuffle in W3Schools like Best method of shuffle;
function sortCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = arr[i]
        arr[i] = arr[j]
        arr[j] = k
    }
}

function flipCard() {
    if(boardLock) return;
    if(this === choseOne){
        this.classList.remove('flip');
        resetBoard();
        return;
    } 
    
    this.classList.add('flip');
    
    if (firstMove) {
    // first click
        choseOne = this;
        firstMove = false;

        return;
    }
    // second click
    choseTwo = this

    // the cards are matching?
    checkMatch();
}

function checkMatch() {
    let isMatch = (choseOne != choseTwo) &&
        choseOne.querySelector('.front').getAttribute('alt') ==
        choseTwo.querySelector('.front').getAttribute('alt');

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    choseOne.removeEventListener('click', flipCard);
    choseTwo.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    boardLock = true;

    setTimeout(() => {
        choseOne.classList.remove('flip');
        choseTwo.classList.remove('flip');
    
        resetBoard();
    }, 1500);
}

function resetBoard(){
    [firstMove , boardLock] =   [true,false];
    [choseOne,choseTwo] = [null,null];
}