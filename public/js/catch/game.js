class Game {
  constructor() {
    Game.padding = HEIGHT / 20;
    Game.laneCount = 10;
    Game.lanes = [];
    for (let i = 0; i < Game.laneCount; i++) {
      Game.lanes[i] =
        Game.padding + (i * (WIDTH - 2 * Game.padding)) / Game.laneCount;
    }
    Game.speed = 4;
    Game.generatorCooldown = 60;

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
      if (i.hit(this.player)) {
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
