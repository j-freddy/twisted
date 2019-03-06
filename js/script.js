const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let keyList = [];

for(let i = 0; i < 255; i++) {
  keyList.push(false);
}

document.onkeydown = (e) => {
  keyList[event.keyCode] = true;
}

document.onkeyup = (e) => {
  keyList[event.keyCode] = false;
}

window.onload = () => {
  console.log("Hello world!");
  console.log("Press [SHIFT] and [x] simultaneously to skip a level");
  console.log("Learn how a promise works and attempt to use it for fading");
  console.log("Beware: if a promise halts all code underneath, return will be delayed, hence tick will continue to run");
  console.log("Settings in a corner: when hovered over, reveals settings to mute sFx and/or music");
  console.log("Update hitbox for spike and lava tiles");

  const game = new GameController();
  game.init();
}
