const ASTEROID_TYPE = {
  SMALL: 1,
  MEDIUM: 2,
  BIG: 3
};

const ASTEROIDS_PER_LEVEL = [4, 5, 7];

class Asteroid {
  constructor(type, pos) {
    this.type = type;
    this.pos = pos;
    this.points = [];
    this.canBeDeleted = false;
    this._init();
  }

  _init() {
    switch (this.type) {
      case ASTEROID_TYPE.SMALL:
        this.speed = 1.6;
        this.size = 17;
        this.sides = 16;
        break;
      case ASTEROID_TYPE.MEDIUM:
        this.speed = 1.2;
        this.size = 31;
        this.sides = 16;
        break;
      case ASTEROID_TYPE.BIG:
        this.speed = 0.8;
        this.size = 48;
        this.sides = 16;
        break;
      default:
        break;
    }

    if (!this.pos) {
      this.pos = p5.Vector.random2D()
        .mult(WIDTH / 2)
        .add(createVector(WIDTH / 2, HEIGHT / 2));
    }

    this.vel = createVector(WIDTH / 2, HEIGHT / 2)
      .sub(this.pos)
      .normalize()
      .mult(this.speed)
      .rotate(random(-Math.PI / 4, Math.PI / 4));

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
    if (this.type == ASTEROID_TYPE.SMALL) {
      return [];
    }

    const newType = this.type - 1;
    return [
      new Asteroid(newType, this.pos.copy()),
      new Asteroid(newType, this.pos.copy())
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

  update() {
    this.pos.add(this.vel);
    this.points.forEach(p => p.add(this.vel));

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
