const gamepads = {};
const buttonState = {};
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

function readValue() {
  /*window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
  
    switch(event.code) {
      case "KeyZ":
      case "PressZ":
        // Handle "back"
        buttonPressed('KeyZ');
        break;
      case "KeyX":
      case "PressX":
        // Handle "forward"
        buttonPressed('KeyX');
        break;
      case "KeyM":
      case "PressM":
        // Handle "turn left"
        buttonPressed('KeyM');
        break;
      case "Comma":
      case "Press<":
        // Handle "turn right"
        buttonPressed('Comma');
        break;
    }
  
    refresh();

    event.preventDefault();
  }, true);*/
  const connectedGamepads = navigator.getGamepads();
  const gamepadIndexes = Object.keys(gamepads);
  
  for (let x = 0; x < gamepadIndexes.length; x++) {
    const buttons = connectedGamepads[gamepadIndexes[x]].buttons;
    for (let y = 0; y < buttons.length; y++) {
      if (buttons[y].pressed) {
        if (!buttonState[y]) {
          buttonState[y] = true;
          buttonPressed(y);
        }
      } else {
        delete buttonState[y];
      }
    }
  }
  
  if (gamepadIndexes.length > 0) {
    window.requestAnimationFrame(readValue);
  }
}

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected!");
  gamepads[e.gamepad.index] = true;
  generateRandomActive();
  readValue();
});

window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected!");
  delete gamepads[e.gamepad.index];
});