const socket = io(`http://localhost:5000`);

const controller = { x: 0, y: 0, up: 0, down: 0, left: 0, right: 0 };
let prevController = {};
let WIDTH, HEIGHT;

let state;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("sketch");
  WIDTH = width;
  HEIGHT = height;
  textFont("Arial Black");

  socket.on("data", data => {
    data = data.split(",").map(x => Number(x));
    controller.x = data[0];
    controller.y = data[1];
    controller.up = data[2];
    controller.down = data[3];
    controller.left = data[4];
    controller.right = data[5];
  });

  state = Menu.getInstance();
}

function draw() {
  state.draw();
}

function changeState(newState) {
  state = newState;
}
