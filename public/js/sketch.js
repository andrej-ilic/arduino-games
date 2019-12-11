const socket = io(`http://localhost:5000`);

const controller = {};
let WIDTH, HEIGHT;
let player;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  WIDTH = width;
  HEIGHT = height;

  socket.on("data", data => {
    data = data.split(",").map(x => Number(x));

    controller.x = map(data[0], -10, 10, -1, 1);
    controller.y = map(data[1], -10, 10, -1, 1);
    controller.up = data[2];
    controller.down = data[3];
    controller.left = data[4];
    controller.right = data[5];
  });

  player = new Player();
}

function draw() {
  background(0);

  handleInput();

  player.update();
  player.draw();
}

function handleInput() {
  if (abs(controller.x) > 0.1) {
    player.rotate(controller.x);
  }
  if (controller.down) {
    player.boost();
  }
}
