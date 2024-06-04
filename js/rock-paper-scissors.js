
const score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
} 

updateScoreElement();

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3){
  computerMove = 'rock';
  }
  else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }
  else if(randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      },2000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.rock').addEventListener('click',() => {
  playGame('rock');
})

document.querySelector('.paper').addEventListener('click',() => {
  playGame('paper');
})

document.querySelector('.scissors').addEventListener('click',() => {
  playGame('scissors');
})

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if (event.key === 'p'){
    playGame('paper');
  }
  else if (event.key === 's'){
    playGame('scissors');
  }
})

function playGame(playerMove){
  let result = '';
  const computerMove = pickComputerMove();

  if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result = 'You lose.';
    }
    else if (computerMove === 'paper'){
      result = 'You win.';
    }
    else if (computerMove === 'scissors'){
      result = 'Tie.';
    }
  }
  else if(playerMove === 'rock') {
    if(computerMove === 'rock'){
      result = 'Tie.';
    }
    else if (computerMove === 'paper'){
      result = 'You lose.';
    }
    else if (computerMove === 'scissors'){
      result = 'You win.';
    }
  }
  else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You win.';
    }
    else if (computerMove === 'paper'){
      result = 'Tie.';
    }
    else if (computerMove === 'scissors'){
      result = 'You lose.';
    }
  }

  if(result === 'You win.'){
    score.win += 1;
  }
  else if (result === 'You lose.'){
    score.lose += 1;
  }
  else if (result === 'Tie.'){
    score.tie += 1;
  }

  updateScoreElement();

  localStorage.setItem('score',JSON.stringify(score));

  document.querySelector('.result').innerHTML = result;
  document.querySelector('.result-desc').innerHTML = `
  Bạn <span> <img src="./images/${playerMove}.png"></span> <span><img src="./images/${computerMove}.png"></span> Computer`
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `
    Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}
  `;
}

function f_Reset(){
  document.querySelector('.result').innerHTML='';
  document.querySelector('.result-desc').innerHTML='';
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}