/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let dice;
let globalScore0;
let globalScore1;
let currentScore0;
let currentScore1;
let activePlayer;
let rollButton;
let holdButton;

initializeVariables = () => {
    dice = document.getElementsByClassName('dice')[0];

    currentScore0 = document.getElementById('current-0');
    currentScore1 = document.getElementById('current-1');

    globalScore0 = document.getElementById('score-0');
    globalScore1 = document.getElementById('score-1');

    activePlayer=0

}

createNewEnvironment = () => {
    dice.style.display = 'none';
    globalScore0.innerHTML = 0;
    globalScore1.innerHTML = 0;
    currentScore0.innerHTML = 0;
    currentScore1.innerHTML = 0;
}

initializeGame = () => {
    initializeVariables();
    createNewEnvironment();
}


rollDice = () => {
    let rolledNumber = getDiceRollResult();
    let currentScoreBox = document.querySelector('#current-'+activePlayer);
    console.log(rolledNumber);
    if(rolledNumber==1){
        rolledOneEvent(currentScoreBox);
        return;
    }
    dice.src = 'dice-' + rolledNumber + '.png';
    dice.style.display = 'inline';

    changeCurrentValue(currentScoreBox, rolledNumber);
}

changeCurrentValue = (currentScoreBox, rolledNumber) => {
    let currentScore = parseInt(currentScoreBox.innerHTML);
    currentScore += rolledNumber;
    currentScoreBox.innerHTML = currentScore;
}

holdEvent = () => {
    let currentScoreBox = document.querySelector('#current-'+activePlayer);
    let currentScore = parseInt(currentScoreBox.innerHTML);

    let globalScoreBox = document.querySelector('#score-'+activePlayer);
    let globalScore = parseInt(globalScoreBox.innerHTML);

    globalScore+=currentScore;
    globalScoreBox.innerHTML=globalScore;

    if(globalScore>=100){
        winEvent();
        return;
    }
    changeActivePlayer();
}

winEvent = () => {
    var activePanel = document.querySelector('.player-'+activePlayer+'-panel');
    activePanel.classList.add('winner');

    var winnerName = document.querySelector('#name-'+activePlayer);
    winnerName.innerHTML='Winner!';
    rollButton.disabled= true;
    holdButton.disabled=true;
}

rolledOneEvent = (currentScoreBox) => {
    currentScoreBox.innerHTML=0;
    changeActivePlayer();
}

changeActivePlayer = () => {
    dice.style.display='none';
    var activePanel = document.querySelector('.player-'+activePlayer+'-panel');
    activePanel.classList.remove('active');

    let currentScoreBox = document.querySelector('#current-'+activePlayer);
    currentScoreBox.innerHTML=0;

    activePlayer= 1- activePlayer;
    let anotherPanel = document.querySelector('.player-'+activePlayer+'-panel');
    anotherPanel.classList.add('active');
}

getDiceRollResult = () => {
    return Math.floor(Math.random() * (6) + 1);
}

loadFunction = () => {
    initializeGame();
    rollButton = document.querySelector('.btn-roll');
    rollButton.addEventListener('click', rollDice);
    holdButton = document.querySelector('.btn-hold');
    holdButton.addEventListener('click', holdEvent);
    document.querySelector('.btn-new').addEventListener('click', initializeGame);
}

document.addEventListener('DOMContentLoaded', loadFunction);