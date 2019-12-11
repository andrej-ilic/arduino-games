const socket = io(`http://localhost:5000`);

function setup() {
  const canvas = createCanvas(500, 500);
  canvas.parent("sketch");
}

function draw() {
  background(0);
  noLoop();
}
