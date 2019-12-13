class Player {
  constructor() {
    this.pos = createVector(WIDTH / 2, HEIGHT / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.dir = createVector(0, -1);
    this.boosting = false;
    this.points = [];
    this.boostPoints = [];
    this.rotateSpeed = 0.08;
    this.r = 12;
    this.maxSpeed = 7;
    this.boostSpeed = 0.08;
    this.dead = false;
    this._init();
  }

  _init() {
    let vec = createVector(0, -this.r);
    let angle = (2 * Math.PI) / 3;

    this.points[0] = vec.copy();
    vec.rotate(angle);
    this.points[1] = vec.copy();
    this.points[2] = createVector(0, 0);
    vec.rotate(-2 * angle);
    this.points[3] = vec.copy();

    vec = createVector(0, this.r * 0.65);
    angle = Math.PI / 5;
    this.boostPoints[1] = vec.copy().mult(0.65);
    vec.rotate(angle);
    this.boostPoints[0] = vec.copy();
    vec.rotate(-2 * angle);
    this.boostPoints[2] = vec.copy();

    this.points.forEach(p => p.add(this.pos));
    this.boostPoints.forEach(p => p.add(this.pos));
  }

  die() {
    if (Menu.soundsOn) {
      socket.emit("sound", "d");
    }

    this.dead = true;
    this.deadVectors = this.points.map(() =>
      p5.Vector.random2D().mult(random(0.3, 0.5))
    );
    this.points.splice(0, 0, this.points[0].copy());
    this.points.splice(2, 0, this.points[2].copy());
    this.points.splice(4, 0, this.points[4].copy());
    this.points.splice(6, 0, this.points[6].copy());
  }

  draw() {
    fill(0);
    stroke(255);
    strokeWeight(1);

    if (this.dead) {
      beginShape(LINES);
      vertex(this.points[0].x, this.points[0].y);
      vertex(this.points[2].x, this.points[2].y);
      vertex(this.points[1].x, this.points[1].y);
      vertex(this.points[7].x, this.points[7].y);
      vertex(this.points[3].x, this.points[3].y);
      vertex(this.points[4].x, this.points[4].y);
      vertex(this.points[5].x, this.points[5].y);
      vertex(this.points[6].x, this.points[6].y);
      endShape();
      return;
    }

    beginShape();
    this.points.forEach(p => vertex(p.x, p.y));
    endShape(CLOSE);

    if (this.boosting) {
      beginShape(LINES);
      this.boostPoints.forEach(p => {
        vertex(this.points[2].x, this.points[2].y);
        vertex(p.x, p.y);
      });
      endShape();
      this.boosting = false;
    }
  }

  shoot() {
    if (Menu.soundsOn) {
      socket.emit("sound", "f");
    }

    return new Bullet(this.points[0].copy(), this.dir.copy());
  }

  boost() {
    this.boosting = true;
    this.acc.add(
      this.dir
        .copy()
        .normalize()
        .mult(this.boostSpeed)
    );
  }

  rotate(dir) {
    dir = map(dir, -10, 10, -1, 1);
    this.dir.rotate(this.rotateSpeed * dir);
    this.points.forEach(p =>
      p
        .sub(this.pos)
        .rotate(this.rotateSpeed * dir)
        .add(this.pos)
    );
    this.boostPoints.forEach(p =>
      p
        .sub(this.pos)
        .rotate(this.rotateSpeed * dir)
        .add(this.pos)
    );
  }

  update() {
    if (this.dead) {
      this.points[0].add(this.deadVectors[0]);
      this.points[2].add(this.deadVectors[0]);
      this.points[1].add(this.deadVectors[1]);
      this.points[7].add(this.deadVectors[1]);
      this.points[3].add(this.deadVectors[2]);
      this.points[4].add(this.deadVectors[2]);
      this.points[5].add(this.deadVectors[3]);
      this.points[6].add(this.deadVectors[3]);
      return;
    }

    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.points.forEach(p => p.add(this.vel));
    this.boostPoints.forEach(p => p.add(this.vel));

    if (this.pos.x < 0) {
      this.pos.x += WIDTH;
      this.points.forEach(p => (p.x += WIDTH));
      this.boostPoints.forEach(p => (p.x += WIDTH));
    }
    if (this.pos.x > WIDTH) {
      this.pos.x -= WIDTH;
      this.points.forEach(p => (p.x -= WIDTH));
      this.boostPoints.forEach(p => (p.x -= WIDTH));
    }
    if (this.pos.y < 0) {
      this.pos.y += HEIGHT;
      this.points.forEach(p => (p.y += HEIGHT));
      this.boostPoints.forEach(p => (p.y += HEIGHT));
    }
    if (this.pos.y > HEIGHT) {
      this.pos.y -= HEIGHT;
      this.points.forEach(p => (p.y -= HEIGHT));
      this.boostPoints.forEach(p => (p.y -= HEIGHT));
    }
  }
}
