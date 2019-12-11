class Player {
  constructor() {
    this.pos = createVector(WIDTH / 2, HEIGHT / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.dir = createVector(0, -1);
    this.points = [];
    this.rotateSpeed = 0.05;
    this.r = 12;
    this.maxSpeed = 5;
    this.boostSpeed = 0.08;
    this._init();
  }

  _init() {
    const vec = createVector(0, -this.r);
    const angle = (2 * Math.PI) / 3;

    this.points[0] = vec.copy();
    vec.rotate(angle);
    this.points[1] = vec.copy();
    this.points[2] = createVector(0, 0);
    vec.rotate(-2 * angle);
    this.points[3] = vec.copy();
  }

  draw() {
    fill(0);
    stroke(255);
    strokeWeight(1);

    beginShape();
    this.points.forEach(p => {
      p = p.copy().add(this.pos);
      vertex(p.x, p.y);
    });
    endShape(CLOSE);
  }

  boost() {
    this.acc.add(
      this.dir
        .copy()
        .normalize()
        .mult(this.boostSpeed)
    );
  }

  rotate(dir) {
    this.dir.rotate(this.rotateSpeed * dir);
    this.points.forEach(p => p.rotate(this.rotateSpeed * dir));
  }

  update() {
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

    if (this.pos.x < 0) this.pos.x += WIDTH;
    if (this.pos.x > WIDTH) this.pos.x -= WIDTH;
    if (this.pos.y < 0) this.pos.y += HEIGHT;
    if (this.pos.y > HEIGHT) this.pos.y -= HEIGHT;
  }
}
