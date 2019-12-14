class Bullet {
  constructor(pos, dir) {
    this.pos = pos;
    this.speed = 4;
    dir.normalize();
    this.vel = dir.mult(this.speed);
    this.range = HEIGHT * 0.3;
    this.canBeDeleted = false;
  }

  draw() {
    stroke(255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }

  update() {
    this.range -= this.speed;
    if (this.range < 0) {
      this.canBeDeleted = true;
      return;
    }

    this.pos.add(this.vel);
  }
}
