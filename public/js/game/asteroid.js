const ASTEROID_TYPE = {
  SMALL: 1,
  MEDIUM: 2,
  BIG: 3
};

const ASTEROIDS_PER_LEVEL = [6, 8, 9];

class Asteroid {
  constructor(type, pos, vel) {
    this.type = type;
    this.pos = pos;
    this.vel = vel;
    this.points = [];
    this.canBeDeleted = false;
    this._init();
  }

  _init() {
    switch (this.type) {
      case ASTEROID_TYPE.SMALL:
        this.speed = 1.6;
        this.size = 11;
        this.sides = 16;
        this.rotateSpeed = 0.015;
        break;
      case ASTEROID_TYPE.MEDIUM:
        this.speed = 1.2;
        this.size = 26;
        this.sides = 16;
        this.rotateSpeed = 0.008;
        break;
      case ASTEROID_TYPE.BIG:
        this.speed = 0.8;
        this.size = 44;
        this.sides = 16;
        this.rotateSpeed = 0.003;
        break;
      default:
        break;
    }

    if (!this.pos) {
      this.pos = p5.Vector.random2D()
        .mult(WIDTH / 2)
        .add(createVector(WIDTH / 2, HEIGHT / 2));
    }

    if (!this.vel) {
      this.vel = createVector(WIDTH / 2, HEIGHT / 2)
        .sub(this.pos)
        .normalize()
        .mult(this.speed)
        .rotate(random(-Math.PI / 4, Math.PI / 4));
    } else {
      this.vel.normalize().mult(this.speed);
    }

    const angleInc = (2 * Math.PI) / this.sides;
    let vec = createVector(this.size, 0);

    for (let i = 0; i < this.sides; i++) {
      this.points[i] = vec.copy();
      this.points[i].setMag(
        this.points[i].mag() + random(-this.size * 0.25, this.size * 0.25)
      );
      this.points[i].add(this.pos);
      vec.rotate(angleInc);
    }
  }

  break() {
    if (Menu.soundsOn) {
      socket.emit("sound", "b");
    }

    if (this.type == ASTEROID_TYPE.SMALL) {
      return [];
    }

    const newType = this.type - 1;
    return [
      new Asteroid(newType, this.pos.copy(), p5.Vector.random2D()),
      new Asteroid(newType, this.pos.copy(), p5.Vector.random2D())
    ];
  }

  collidesWithPlayer(player) {
    return collidePolyPoly(player.points, this.points);
  }

  collidesWithBullet(bullet) {
    return collidePointPoly(bullet.pos.x, bullet.pos.y, this.points);
  }

  draw() {
    fill(0);
    stroke(255);
    strokeWeight(1);

    beginShape();
    this.points.forEach(p => vertex(p.x, p.y));
    endShape(CLOSE);
  }

  rotate() {
    this.points.forEach(p =>
      p
        .sub(this.pos)
        .rotate(this.rotateSpeed)
        .add(this.pos)
    );
  }

  update() {
    this.pos.add(this.vel);
    this.points.forEach(p => p.add(this.vel));

    this.rotate();

    if (this.pos.x < 0) {
      this.pos.x += WIDTH;
      this.points.forEach(p => (p.x += WIDTH));
    }
    if (this.pos.x > WIDTH) {
      this.pos.x -= WIDTH;
      this.points.forEach(p => (p.x -= WIDTH));
    }
    if (this.pos.y < 0) {
      this.pos.y += HEIGHT;
      this.points.forEach(p => (p.y += HEIGHT));
    }
    if (this.pos.y > HEIGHT) {
      this.pos.y -= HEIGHT;
      this.points.forEach(p => (p.y -= HEIGHT));
    }
  }
}
