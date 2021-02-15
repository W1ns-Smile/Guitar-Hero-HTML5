let active = 0;
let points = 0;
let streak = 0;

function generateRandomActive() {
  active = Math.floor(Math.random() * 4);
  document.querySelector("#drumset").className = `drum-${active}`;
  document.querySelector("#points").textContent = points;
  document.querySelector("#streak").textContent = streak;
}

function buttonPressed(id) {
  let booster = 1;
  console.log(`Button ${id} pressed.`);
  if (id === active) {
    streak++;
    booster = Math.min(streak, 5);
    points += booster;
    generateRandomActive();
  } else {
    streak = 0;
  }
  document.querySelector("#streak").textContent = streak;
  document.querySelector("#booster").textContent = `x${booster}`;
}

window.addEventListener("keydown", function (event) {
  if (event.code == "KeyZ") {
    buttonPressed(2);
  }
  if (event.code == "KeyX") {
    buttonPressed(3);
  }
  if (event.code == "KeyM") {
    buttonPressed(0);
  }
  if (event.code == "Comma") {
    buttonPressed(1);
  }
});

/*var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("video", {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    generateRandomActive();
  }
}*/

windows.onload = function() {
  let video = prompt('Введите ссылку на YouTube клип');
  document.querySelector('#video').innerHTML = '<iframe width="100%" height="100%" src="'+ video +'?autoplay=1&modestbranding=1&iv_load_policy=3&controls=0&disablekb=1&showinfo=0&rel=0" frameborder="0" allowfullscreen></iframe>';
  generateRandomActive();
}