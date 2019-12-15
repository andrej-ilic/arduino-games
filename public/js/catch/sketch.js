const socket = io(`http://localhost:5000`);

const controller = { xAcc: 0 };
let prevController = {};
let WIDTH, HEIGHT;

let state;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("sketch");
  WIDTH = width;
  HEIGHT = height;

  socket.emit("mode", "1000000");

  socket.on("modeChanged", () => {
    state = new Game();
  });

  socket.on("data", data => {
    data = data.split(",").map(x => Number(x));
    controller.xAcc = map(data[0], -16, 16, -20, 20);
  });

  vec = createVector(0, 0);

  state = new LoadingScreen();
}

function draw() {
  state && state.draw();
}

function changeState(newState) {
  state = newState;
}
