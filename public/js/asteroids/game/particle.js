class Particle {
  constructor(pos, dir) {
    this.pos = pos;
    this.minSpeed = 0.25;
    this.maxSpeed = 1;
    this.distance = 100;
    this.canBeDeleted = false;
    dir.normalize().mult(random(this.minSpeed, this.maxSpeed));
    this.vel = dir;
  }

  static generateFromPosition(pos, amount) {
    const particles = [];
    for (let i = 0; i < amount; i++) {
      particles.push(new Particle(pos.copy(), p5.Vector.random2D()));
    }
    return particles;
  }

  draw() {
    point(this.pos.x, this.pos.y);
  }

  update() {
    this.distance -= this.vel.mag();
    if (this.distance < 0) this.canBeDeleted = true;

    this.pos.add(this.vel);
    this.vel.mult(0.999);
  }
}
