class Player {
  constructor() {
    this.width = (WIDTH - Game.padding * 2) / Game.laneCount;
    this.height = 10;

    this.pos = createVector(WIDTH / 2 - this.width, HEIGHT - Game.padding);
    this.vel = createVector(0, 0);
    this.points = [];
    this.points[0] = this.pos;
    this.points[1] = createVector(this.pos.x + this.width, this.pos.y);
    this.points[2] = createVector(
      this.pos.x + this.width,
      this.pos.y - this.height
    );
    this.points[3] = createVector(this.pos.x, this.pos.y - this.height);
  }

  draw() {
    fill(255);
    beginShape();
    this.points.forEach(p => vertex(p.x, p.y));
    endShape();
  }

  update() {
    this.handleInput();

    this.points.forEach(p => p.add(this.vel));

    if (this.points[0].x < Game.padding) {
      const fixVec = createVector(Game.padding - this.points[0].x, 0);
      this.points.forEach(p => p.add(fixVec));
    } else if (this.points[1].x > WIDTH - Game.padding) {
      const fixVec = createVector(WIDTH - Game.padding - this.points[1].x, 0);
      this.points.forEach(p => p.add(fixVec));
    }
  }

  handleInput() {
    this.vel = createVector(controller.xAcc, 0);
  }

  collidedWithItem(item) {
    return collideRectCircle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.height,
      item.pos.x,
      item.pos.y,
      item.d
    );
  }
}
