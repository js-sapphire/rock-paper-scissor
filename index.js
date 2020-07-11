const choices = ['rock', 'scissor', 'paper'];
let userScore = 0;

const readFromLS = () => {
    let score = localStorage.getItem('rpsScore');
    if(!score){
        localStorage.setItem('rpsScore', '0');
        score = 0;
    }
    userScore = parseInt(score);
}

const writeToLS = () => {
    const score = localStorage.getItem('rpsScore');
    if(!score){
        localStorage.setItem('rpsScore', '0');
    } else {
        localStorage.setItem('rpsScore', JSON.stringify(userScore));
    }
}

const clearLS = () => {
    localStorage.removeItem('rpsScore');
}

const chooseOne = () => choices[Math.floor(Math.random()*3)];

const doesUserWin = (userChoice, cpuChoice) => {
    if(userChoice === "rock" && cpuChoice === "scissor"){
        return true;
    } else if(userChoice === "scissor" && cpuChoice === "paper"){
        return true;
    } else if(userChoice === "paper" && cpuChoice === "rock"){
        return true;
    }
    return false;
}

const updateScore = () => {
    const scoreDiv = document.querySelector('.score');
    scoreDiv.innerHTML = ``;
    scoreDiv.innerHTML = `${userScore}`;
}

const updateCpuChoice = (cpuChoice) => {
    const cpuChoiceDiv = document.querySelector('.cpuChoice');
    cpuChoiceDiv.innerHTML = ``;
    cpuChoiceDiv.innerHTML = `CPU chose ${cpuChoice}`;
}

const newGame = () => {
    clearLS();
    readFromLS();
    updateScore();
}

const initGameButtons = () => {
    const gameButtons = document.querySelectorAll('#gameButton');
    gameButtons.forEach(gameButton => {
        gameButton.addEventListener('click', () => {
            const type = gameButton.dataset.shape;
            const cpuChoice = chooseOne();
            updateCpuChoice(cpuChoice);
            if(doesUserWin(type, cpuChoice)){
                userScore = userScore + 1;
                writeToLS();
                updateScore();
            }
        })
    });
}

const initNewGameButton = () => {
    const newGameButton = document.querySelector('.newGame');
    newGameButton.addEventListener('click', () => {
        newGame();
    })
}

const init = () => {

    readFromLS();
    updateScore();
    initGameButtons();
    initNewGameButton();

}

init();
