class Item {
  constructor() {
    this.size = (WIDTH - Game.padding * 2) / Game.laneCount;
    this.badItem = random() < 0.05;

    this.pos = createVector(random(Game.lanes) + this.size / 2, -this.size);
    this.vel = createVector(0, Game.speed);
    this.canBeDeleted = false;
  }

  draw() {
    if (this.badItem) fill(200, 0, 0);
    else fill(255);
    circle(this.pos.x, this.pos.y, this.size / 2);
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.y > HEIGHT + this.size) {
      this.canBeDeleted = true;
    }
  }

  hit(player) {
    if (this.pos.y < HEIGHT - Game.padding - this.size / 4) return false;
    if (this.pos.y > HEIGHT - Game.padding) return false;

    if (player.pos.x < this.pos.x && player.pos.x + width > this.pos.x) {
      return true;
    }

    return false;
  }
}
