// const socket = io(`http://localhost:5000`);

let WIDTH, HEIGHT;
let p;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  WIDTH = width;
  HEIGHT = height;

  p = new Player();
}

function draw() {
  background(0);

  handleInput();

  p.update();
  p.draw();
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    p.rotate(-1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    p.rotate(1);
  }
  if (keyIsDown(UP_ARROW)) {
    p.boost();
  }
}
