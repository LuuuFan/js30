

window.addEventListener('keydown', playSound);

function playSound(e){
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');

  // setTimeout will conflict with timeout in css, not a good idea to use it here
  // setTimeout(()=>{
  //   key.classList.remove('playing');
  // }, 100)
}

function removeTransition(e){
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');

keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
});
