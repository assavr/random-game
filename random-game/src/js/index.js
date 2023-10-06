const catcher = document.querySelector('.catcher');
const leaves = document.querySelector('.leaves');
let catcherLeft = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('left'),
);
const catcherBottom = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('bottom'),
);
const scorePoint = document.querySelector('.score-points');
const hpImage = document.querySelectorAll('.hp');
let score = 0;
let hp = 3;
console.log(hp);

function moveCatcherLeft() {
  if (catcherLeft > 0) {
    catcherLeft -= 15;
    catcher.style.left = catcherLeft + 'px';
  }
}
function moveCatcherRight() {
  if (catcherLeft < 670) {
    catcherLeft += 15;
    catcher.style.left = catcherLeft + 'px';
  }
}

function control(e) {
  if (e.key == 'ArrowLeft') {
    moveCatcherLeft();
    console.log(e.key);
  }
  if (e.key == 'ArrowRight') {
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
      console.log(hp);
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
generateLeaves();
document.addEventListener('keydown', control);
