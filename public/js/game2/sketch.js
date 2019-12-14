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
}

function loop() {}
