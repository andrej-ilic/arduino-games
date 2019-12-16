class Item {
  constructor() {
    this.d = Game.laneSize * 0.5;
    this.badItem = random() < 0.1;
    this.pos = createVector(random(Game.lanes), -this.d / 2);
    this.vel = createVector(0, Game.speed);
    this.canBeDeleted = false;
  }

  draw() {
    if (this.badItem) {
      fill(200, 0, 0);
    } else {
      fill(255);
    }

    ellipse(this.pos.x, this.pos.y, this.d, this.d);
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.y > HEIGHT + this.r) {
      this.canBeDeleted = true;
    }
  }
}
