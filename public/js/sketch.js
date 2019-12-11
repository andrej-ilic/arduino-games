const controller = {};
let WIDTH, HEIGHT;
let p;

const socket = io(`http://localhost:5000`);

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  WIDTH = width;
  HEIGHT = height;

  socket.on("data", data => {
    data = JSON.parse(data);
    data.x = map(data.x, -500, 500, -1, 1);
    for (const key in data) {
      controller[key] = data[key];
    }
  });

  p = new Player();
}

function draw() {
  background(0);

  handleInput();

  p.update();
  p.draw();
}

function handleInput() {
  if (abs(controller.x) > 0.1) {
    p.rotate(controller.x);
  }
  if (controller.down) {
    p.boost();
  }
}
