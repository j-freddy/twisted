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
  console.log("Switch gravity only allowed once in midair");
  console.log("Push basic physics engine to GitHub");

  const game = new GameController();
  game.init();
}
