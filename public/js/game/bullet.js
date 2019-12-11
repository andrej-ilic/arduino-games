class Bullet {
  constructor(pos, dir) {
    this.pos = pos;
    this.speed = 3;
    dir.normalize();
    this.vel = dir.mult(this.speed);
    this.travelled = 0;
    this.canBeDeleted = false;
  }

  draw() {
    stroke(255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }

  update() {
    this.travelled += this.speed;
    if (this.travelled > WIDTH + HEIGHT) {
      this.canBeDeleted = true;
      return;
    }

    this.pos.add(this.vel);
  }
}
