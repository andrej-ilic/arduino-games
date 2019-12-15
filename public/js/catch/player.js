class Player {
  constructor() {
    this.width = (WIDTH - Game.padding * 2) / Game.laneCount;
    this.height = 10;

    this.pos = createVector(WIDTH / 2 - this.width, HEIGHT - Game.padding);
    this.vel = createVector(0, 0);
  }

  draw() {
    fill(255);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
    this.handleInput();

    this.pos.add(this.vel);

    if (this.pos.x < Game.padding) {
      this.pos.x = Game.padding;
    } else if (this.pos.x > WIDTH - this.width - Game.padding) {
      this.pos.x = WIDTH - this.width - Game.padding;
    }
  }

  handleInput() {
    this.vel = createVector(controller.xAcc, 0);
  }
}
