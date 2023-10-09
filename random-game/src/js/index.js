const catcher = document.querySelector('.catcher');
const catcherBottom = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('bottom'),
);
const hpImage = document.querySelectorAll('.hp');
const leaves = document.querySelector('.leaves');
const rain = document.querySelector('.rain')
const scorePoint = document.querySelector('.score-points');
const buttonPlay = document.querySelector('.button__play-game');
const modalHello = document.querySelector('.modal-hello');
let catcherLeft = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('left'),
);
let hp = 3;
let score = 0;

function startGame() {
  modalHello.style.display = 'none';
  generateLeaves();
  generateRain();
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
  const leafLeft = Math.floor(Math.random() * 700);
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
        hpImage[hp].style.opacity = 0;
        alert('Game over! Your score is:' + ` ${score}`);
        location.reload();
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
  const dropLeft = Math.floor(Math.random() * 700);
  const drop = document.createElement('div');
  drop.setAttribute('class', 'drop');
  rain.appendChild(drop);
  function fallDownDrop() {
    if (
      dropBottom < catcherBottom + 50 &&
      dropBottom > catcherBottom &&
      dropLeft > catcherLeft - 30 &&
      dropLeft < catcherLeft + 80
    ) {
      rain.removeChild(drop);
      clearInterval(fallInterval);
      clearTimeout(dropTimeout);
      hp--;
      hpImage[hp].style.opacity = 0;
      if( hp === 0) {
        alert('Game over! Your score is:' + ` ${score}`);
        location.reload();
      }
    }
    dropBottom -= 5;
    drop.style.bottom = dropBottom + 'px';
    drop.style.left = dropLeft + 'px';
  }
  let fallInterval = setInterval(fallDownDrop, 20);
  let dropTimeout = setTimeout(generateRain, 1000);
}



buttonPlay.addEventListener('click', startGame);
