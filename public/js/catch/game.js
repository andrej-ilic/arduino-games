class Game {
  constructor() {
    Game.padding = HEIGHT / 20;
    Game.laneCount = 10;
    Game.lanes = [];
    Game.laneSize = (WIDTH - Game.padding * 2) / Game.laneCount;
    for (let i = 0; i < Game.laneCount; i++) {
      Game.lanes[i] = Game.padding + i * Game.laneSize + Game.laneSize / 2;
    }
    Game.speed = 4;
    Game.generatorCooldown = 50;

    this.player = new Player();
    this.items = [];
    this.time = Game.generatorCooldown;

    noStroke();
  }

  draw() {
    this.update();

    background(0);

    this.items = this.items.filter(i => !i.canBeDeleted);
    this.items.forEach(i => {
      i.draw();
      i.update();
      if (this.player.collidedWithItem(i)) {
        i.canBeDeleted = true;
      }
    });

    this.player.draw();
    this.player.update();
  }

  update() {
    this.time++;

    if (this.time >= Game.generatorCooldown) {
      this.time -= Game.generatorCooldown;
      this.items.push(new Item());
    }
  }
}
