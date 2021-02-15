//const gamepads = {};
//const buttonState = {};
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

//function readValue() {
  window.addEventListener("keydown", function(event) {
    if (event.code == "KeyZ") {
      buttonPressed(2);
      window.requestAnimationFrame(readValue);
    }
    if (event.code == "KeyX") {
      buttonPressed(3);
      window.requestAnimationFrame(readValue);
    }
    if (event.code == "KeyM") {
      buttonPressed(0);
      window.requestAnimationFrame(readValue);
    }
    if (event.code == "Comma") {
      buttonPressed(1);
      window.requestAnimationFrame(readValue);
    }
  });
  /*const connectedGamepads = navigator.getGamepads();
  const gamepadIndexes = Object.keys(gamepads);
  
  for (let x = 0; x < gamepadIndexes.length; x++) {
    const buttons = connectedGamepads[gamepadIndexes[x]].buttons;
    for (let y = 0; y < buttons.length; y++) {
      if (buttons[y].pressed) {
        if (!buttonState[y]) {
          buttonState[y] = true;
          buttonPressed(y);
          console.log('ID кнопки '+y);
        }
      } else {
        delete buttonState[y];
      }
    }
  }*/
  
  //if (gamepadIndexes.length > 0) {
    /*if ("keydown") {
      window.requestAnimationFrame(readValue);
  }
}*/

/*window.addEventListener("DOMContentLoaded", function(e) {
  console.log("Gamepad connected!");
  gamepads[e.gamepad.index] = true;
  generateRandomActive();
  readValue();
});*/

/*window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected!");
  delete gamepads[e.gamepad.index];
});*/

var playerVideoHead;
function onYouTubeIframeAPIReady() {
    playerVideoHead = new YT.Player('video', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

togglePlayer(playerVideoHead);

function togglePlayer(player) {
    if (typeof player.getPlayerState == "undefined") return;
    var state = player.getPlayerState();

    if (state == YT.PlayerState.PLAYING) {
      generateRandomActive();
    }
}