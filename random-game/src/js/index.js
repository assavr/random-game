import { controlAudio, playAudio } from './audio.js';
import { getRandomNumber } from './helper.js';
import { moveCatcherLeft, moveCatcherRight } from './control_move.js';

const btnRestart = document.querySelector('.restart');
const buttonPlay = document.querySelector('.button__play-game');
const buttonVolume = document.querySelector('.btn-sound-volume');
const canvas = document.querySelector('.canvas');
const catcher = document.querySelector('.catcher');
const catcherCenter =
  parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) / 2 -
  parseInt(window.getComputedStyle(catcher).getPropertyValue('width')) / 2;
const catcherBottom = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('bottom'),
);
const dialogGameOver = document.querySelector('.modal-game-over');
const dialogHello = document.querySelector('.modal-hello');
const gameWidth =
  parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) -
  parseInt(window.getComputedStyle(canvas).getPropertyValue('border-width')) *
    3;
const hpImages = document.querySelectorAll('.hp');
const leaves = document.querySelector('.leaves');
const rain = document.querySelector('.rain');
const scorePoint = document.querySelector('.score-points');
const scorePointFinally = document.querySelector('.score-points-finally');

let catcherLeft = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('left'),
);
let hp = 3;
let score = 0;
let totalScore = [];

function restartGame() {
  score = 0;
  hp = 3;
  scorePoint.innerText = `${score}`;
  for (let hp of hpImages) {
    hp.style.opacity = 1
  }
  // startGame()
  // location.reload();
}

function startGame() {
  catcher.style.left = catcherCenter + 'px';
  dialogHello.removeAttribute('opened', '');
  setTimeout(() => dialogHello.close(), 500);
  generateLeaves();
  generateRain();
  playAudio('background audio');
  document.addEventListener('keydown', control);
}

// function moveCatcherLeft() {
//   if (catcherLeft > 0) {
//     catcherLeft -= 20;
//     catcher.style.left = catcherLeft + 'px';
//   }
// }

// function moveCatcherRight() {
//   if (catcherLeft < 670) {
//     catcherLeft += 20;
//     catcher.style.left = catcherLeft + 'px';
//   }
// }

function control(event) {
  if (event.key === 'ArrowLeft' || event.code === 'KeyA') {
    moveCatcherLeft(catcher, catcherLeft);
  }
  if (event.key === 'ArrowRight' || event.code === 'KeyD') {
    moveCatcherRight(catcher, catcherLeft);
  }
}

function generateLeaves() {
  let leafBottom = 750;
  const leafLeft = getRandomNumber(gameWidth);
  const leaf = document.createElement('div');
  leaves.appendChild(leaf);
  leaf.setAttribute('class', 'leaf');
  function fallDownLeaves() {
    if (
      leafBottom < catcherBottom + 50 &&
      leafBottom > catcherBottom &&
      leafLeft > catcherLeft - 30 &&
      leafLeft < catcherLeft + 80
    ) {
      controlAudio('catch leaf');
      leaves.removeChild(leaf);
      clearInterval(fallInterval);
      score++;
      scorePoint.innerText = `${score}`;
    }
    if (leafBottom < catcherBottom) {

    //   for (let i = 3; hp > -1; i-- ) {
    //   hp--;
    //   console.log(hp)
    //   console.log(i)
    //   hpImage[hp].style.opacity = 0;
    // }
    hp--;
    hpImages[hp].style.opacity = 0;
      clearInterval(fallInterval);
      clearTimeout(leafTimeout);
      if (hp === 0) {
        scorePointFinally.innerText = `${score}`;
        controlAudio('game over');
        dialogGameOver.show();
        dialogGameOver.setAttribute('opened', '');
        console.log(score);
        totalScore.push(`${score}`);
        console.log(totalScore);
        localStorage.setItem('totalScore', `${totalScore}`);
        // clearInterval(fallInterval);
        // clearTimeout(leafTimeout)
      }

    }
    leafBottom -= 5;
    leaf.style.bottom = leafBottom + 'px';
    leaf.style.left = leafLeft + 'px';
  }
  let fallInterval = setInterval(fallDownLeaves, 20);
  let leafTimeout = setTimeout(generateLeaves, 2000);
}

// let scoreScore = generateLeaves();
// console.log(scoreScore)

function generateRain() {
  let dropBottom = 750;
  const dropLeft = getRandomNumber(gameWidth);
  const drop = document.createElement('div');
  drop.setAttribute('class', 'drop');
  rain.appendChild(drop);
  function fallDownDrop() {
    if (
      dropBottom < catcherBottom + 50 &&
      dropBottom > catcherBottom &&
      dropLeft > catcherLeft - 10 &&
      dropLeft < catcherLeft + 50
    ) {
      rain.removeChild(drop)
      controlAudio('catch drop');
      clearInterval(fallInterval);
      clearTimeout(dropTimeout);

    //  for (let i = 3; hp > -1; i-- ) {
    //     hp--;
    //     console.log(hp)
    //     hpImage[hp].style.opacity = 0;
    //   }
      hp--;
      hpImages[hp].style.opacity = 0;
      if (hp === 0) {
        dialogGameOver.show();
        dialogGameOver.setAttribute('opened', '');
        scorePointFinally.innerText = `${score}`;
        controlAudio('game over');
        dialogGameOver.show();
        // clearInterval(fallInterval);
        // clearTimeout(dropTimeout)
      }

    }
    dropBottom -= 10;
    drop.style.bottom = dropBottom + 'px';
    drop.style.left = dropLeft + 'px';
  }
  let fallInterval = setInterval(fallDownDrop, 20);
  let dropTimeout = setTimeout(generateRain, 1000);
}


buttonPlay.addEventListener('click', startGame)
document.onkeydown = function startPlay(event) {
  if (event.code === 'Space') {
    startGame();
  }
}
buttonVolume.addEventListener('click', () => controlAudio('background audio'));
btnRestart.addEventListener('click', restartGame);
console.log(score);
