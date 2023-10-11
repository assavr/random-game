import { controlAudio, playAudio} from './audio.js';
import {getRandomNumber} from './helper.js';

const canvas = document.querySelector('.canvas')
const catcher = document.querySelector('.catcher');
const catcherBottom = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('bottom'),
);
const hpImage = document.querySelectorAll('.hp');
const leaves = document.querySelector('.leaves');
const rain = document.querySelector('.rain')
const scorePoint = document.querySelector('.score-points');
const scorePointFinally = document.querySelector('.score-points-finally');
const buttonPlay = document.querySelector('.button__play-game');
const modalHello = document.querySelector('.modal-hello');
const modalGameOver = document.querySelector('.modal-game-over');
const gameWidth = parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) - parseInt(window.getComputedStyle(canvas).getPropertyValue('border-width')) * 3;
// const btnRestart = document.querySelector('.restart')
const buttonVolume = document.querySelector('.btn-sound-volume');
let catcherLeft = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('left'),
);

let hp = 3;
let score = 0;

// btnRestart.addEventListener('click', restartGame);

// function restartGame() {
//   hp = 3;
//   score = 0;
//     modalHello.style.display = 'none';
//     generateLeaves();
//     generateRain();
//     playAudio('background audio');
//     document.addEventListener('keydown', control);
//   }

function startGame() {
  modalHello.style.display = 'none';
  generateLeaves();
  generateRain();
  playAudio('background audio');
  document.addEventListener('keydown', control);
}

function moveCatcherLeft() {
  if (catcherLeft > 0) {
    catcherLeft -= 20;
    catcher.style.left = catcherLeft + 'px';
  }
}

function moveCatcherRight() {
  if (catcherLeft < 670) {
    catcherLeft += 20;
    catcher.style.left = catcherLeft + 'px';
  }
}

function control(event) {
  if (event.key === 'ArrowLeft' || event.code === 'KeyA') {
    moveCatcherLeft();
  }
  if (event.key === 'ArrowRight' || event.code === 'KeyD') {
    moveCatcherRight();
  }
}

function generateLeaves() {
  let leafBottom = 750;
  const leafLeft = getRandomNumber(gameWidth);
  const leaf = document.createElement('div');
  leaf.setAttribute('class', 'leaf');
  leaves.appendChild(leaf);
  function fallDownLeaves() {
    if (
      leafBottom < catcherBottom + 50 &&
      leafBottom > catcherBottom &&
      leafLeft > catcherLeft - 30 &&
      leafLeft < catcherLeft + 80
    ) {
      playAudio('catch leaf');
      leaves.removeChild(leaf);
      clearInterval(fallInterval);
      score++;
      scorePoint.innerText = `${score}`;
    }
    if (leafBottom < catcherBottom) {
      hp--;
      hpImage[hp].style.opacity = 0;
      clearInterval(fallInterval);
      clearTimeout(leafTimeout);
      if (hp === 0) {
        scorePointFinally.innerText = `${score}`;
        modalGameOver.classList.remove('none');
        modalHello.classList.add('none');
        playAudio('game over')
        return;
      }
    }
    leafBottom -= 5;
    leaf.style.bottom = leafBottom + 'px';
    leaf.style.left = leafLeft + 'px';
  }
  let fallInterval = setInterval(fallDownLeaves, 20);
  let leafTimeout = setTimeout(generateLeaves, 2000);
}

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
      playAudio('catch drop');
      rain.removeChild(drop);
      clearInterval(fallInterval);
      clearTimeout(dropTimeout);
      hp--;
      hpImage[hp].style.opacity = 0;
      if( hp === 0) {
        scorePointFinally.innerText = `${score}`;
        modalGameOver.classList.remove('none');
        modalHello.classList.add('none');
        playAudio('game over')
        // alert('Game over! Your score is:' + ` ${score}`);
        // // playAudio('game over')
        // location.reload();
      }
    }
    dropBottom -= 10;
    drop.style.bottom = dropBottom + 'px';
    drop.style.left = dropLeft + 'px';
  }
  let fallInterval = setInterval(fallDownDrop, 20);
  let dropTimeout = setTimeout(generateRain, 1000);
  if (hp === 0) {
    return;
  }
}



buttonPlay.addEventListener('click', startGame);
buttonVolume.addEventListener('click', () => controlAudio('background audio'))
