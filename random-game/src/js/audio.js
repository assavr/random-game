const bgAudio = new Audio("./assets/audio/bgAudio.mp3");
const leafAudio = new Audio("./assets/audio/leaf.mp3");
const dropAudio = new Audio("./assets/audio/drop.mp3");
const gameOver = new Audio("./assets/audio/game-over.mp3");
const buttonVolume = document.querySelector('.btn-sound-volume');

const listAudio = {
  'background audio': bgAudio,
  'catch leaf': leafAudio,
  'catch drop': dropAudio,
  'game over': gameOver,
}

bgAudio.volume = 0.3;
leafAudio.volume = 0.1;
dropAudio.volume = 0.1;
gameOver.volume = 0.3;

export function controlAudio(audioKey) {
  let audio;
  if (audioKey === 'background audio') {
    audio = listAudio['background audio'];
    audio.setAttribute('loop', 'loop')
    buttonVolume.classList.toggle('volume-max');
  }
  if( audioKey === 'catch leaf') {
    audio = listAudio['catch leaf'];
  }
  if( audioKey === 'catch drop') {
    audio = listAudio['catch drop'];
  }
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

export  function playAudio(audioKey) {
  let audio;
  if (audioKey === 'background audio') {
    audio = listAudio['background audio'];
    buttonVolume.classList.add('volume-max');
    audio.play()
  }
  if (audioKey === 'game over') {
    audio = listAudio['game over'];
    audio.play()
  }
}
// buttonVolume.addEventListener('click', () => controlAudio('background audio'))



// bgAudio.onclick = playAudio(audio);


// buttonVolume.addEventListener('click', () => {
//   if (audio.paused) {
//     playAudio(bgAudio);
//     buttonVolume.classList.toggle('volume-max');
//   }
//   pauseAudio(bgAudio);
//   buttonVolume.classList.toggle('volume-max');
// })
// playAudio(bgAudio);


// buttonVolume.addEventListener('click', toggleVolume);
