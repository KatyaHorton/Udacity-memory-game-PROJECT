// Card list storage

const cards = [{
        name: 'diamond',
        class: 'card',
        cardType: 'fa fa-diamond'
    },
    {
        name: 'diamond',
        class: 'card',
        cardType: 'fa fa-diamond'
    },
    {
        name: 'plane',
        class: 'card',
        cardType: 'fa fa-paper-plane-o'
    },
    {
        name: 'plane',
        class: 'card',
        cardType: 'fa fa-paper-plane-o'
    },
    {
        name: 'anchor',
        class: 'card',
        cardType: 'fa fa-anchor'
    },
    {
        name: 'anchor',
        class: 'card',
        cardType: 'fa fa-anchor'
    },
    {
        name: 'bolt',
        class: 'card',
        cardType: 'fa fa-bolt'
    },
    {
        name: 'bolt',
        class: 'card',
        cardType: 'fa fa-bolt'
    },
    {
        name: 'cube',
        class: 'card',
        cardType: 'fa fa-cube'
    },
    {
        name: 'cube',
        class: 'card',
        cardType: 'fa fa-cube'
    },
    {
        name: 'leaf',
        class: 'card',
        cardType: 'fa fa-leaf'
    },
    {
        name: 'leaf',
        class: 'card',
        cardType: 'fa fa-leaf'
    },
    {
        name: 'bicycle',
        class: 'card',
        cardType: 'fa fa-bicycle'
    },
    {
        name: 'bicycle',
        class: 'card',
        cardType: 'fa fa-bicycle'
    },
    {
        name: 'bomb',
        class: 'card',
        cardType: 'fa fa-bomb'
    },
    {
        name: 'bomb',
        class: 'card',
        cardType: 'fa fa-bomb'
    }
];

// Variables 

let deck = document.querySelector('.deck');
let moves = document.getElementById('moves');
let finish = document.querySelector('.finish');
let time = document.getElementById('time');
let minutes = 0;
let seconds = 1;
let count = 0;
let openCardsArray = [];
let firstStar = document.getElementById('first');
let secondStar = document.getElementById('second');
let thirdStar = document.getElementById('third');


function loadGame() {
    shuffle(cards);
    time.innerText = 'Time : 0';
    for (let card in cards) {
        const cardHtml = `<li class="${cards[card].class} ${cards[card].cardType}"></li>`;
        deck.innerHTML += cardHtml;
    }
};


window.onload = loadGame();
click();

// function to restart the game

function restart() {
    shuffle(cards);
    moves.innerText = '0';
    deck.innerHTML = '';
    finish.innerHTML = '';
    firstStar.style.color = '';
    secondStar.style.color = '';
    thirdStar.style.color = '';
    time.innerText = '0 : 0';
    openCardsArray = [];
    count = 0;
    seconds = 1;
    minutes = 0;
    clearInterval(startTime);
    for (let card in cards) {
        const cardHtml = `<li class="${cards[card].class} ${cards[card].cardType}"></li>`;
        deck.innerHTML += cardHtml;
    }
};

// shuffle function 

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// click function

function click() {
    deck.addEventListener('click', event => {
        if (event.target.tagName === "LI") {
            const dimension = openCardsArray.length;

            if (dimension < 2) {
             
                event.target.classList.add('show', 'open');
            };
         
            openCardsArray.push(event.target);
            if (dimension === 1) {
                if (openCardsArray[0].classList.value === openCardsArray[1].classList.value) {
                    match();
                    movesCount(2);
                    setTimeout(win, 200);
                } else {
  
                    setTimeout(unmatch, 500);
                    movesCount(1);
                }
            }
        }
    })
};

// if match, than: 

function match() {
    openCardsArray[0].classList.add("match");
    openCardsArray[1].classList.add("match");
    openCardsArray[0].classList.remove("show", "open");
    openCardsArray[1].classList.remove("show", "open");
    openCardsArray = [];
};

// if dont match, than: 

function unmatch() {
    openCardsArray[0].classList.remove("show", "open");
    openCardsArray[1].classList.remove("show", "open");
    openCardsArray = [];
};

// moves counter

function movesCount(num) {
    count += num;
    moves.innerText = count;
    if (count == 1) {
        countTimer();
    }
    if (count <= 20) {
        firstStar.style.color = 'red';
        secondStar.style.color = 'red';
        thirdStar.style.color = 'red';
    } else if (count > 20 && count < 35) {
        firstStar.style.color = 'red';
        secondStar.style.color = 'red';
        thirdStar.style.color = 'grey';
    } else if (count >= 40) {
        firstStar.style.color = 'red';
        secondStar.style.color = 'grey';
        thirdStar.style.color = 'grey';
    }
};

//time counter

function countTimer() {
    startTime = setInterval(() => {
        time.innerText = minutes + ' : ' + seconds;
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

// if the game is won

function win() {
    const match = document.getElementsByClassName('match');
    if (match.length == 16) {
        const popUp =
            `<div class="win">
               <h1>Well done!</h1>
               <p>Completed in <span id="movesResult"></span> moves.</p>
               <p>Time: <span id="timeResult"></span>
               <ul class="stars">
                   <li><i id="firstResult" class="fa fa-star"></i></li>
                   <li><i id="secondResult" class="fa fa-star"></i></li>
                   <li><i id="thirdResult" class="fa fa-star"></i></li>
               </ul>
               </p>
               <div class="button" onclick="restart()">Again!</div>
            </div>`;
        finish.innerHTML = popUp;
        clearInterval(startTime);
        document.getElementById('firstResult').style.color = firstStar.style.color;
        document.getElementById('secondResult').style.color = secondStar.style.color;
        document.getElementById('thirdResult').style.color = thirdStar.style.color;
        document.getElementById('movesResult').innerText = moves.innerText;
        document.getElementById('timeResult').innerText = time.innerText;
    }
};