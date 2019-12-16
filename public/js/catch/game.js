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

    textSize(HEIGHT * 0.04);
    noStroke();

    this._init();
  }

  _init() {
    this.time = Game.generatorCooldown;
    this.player = new Player();
    this.items = [];
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.gameOverCooldown = 180;
  }

  draw() {
    this.update();

    background(0);

    if (this.gameOver) {
      this.gameOverCooldown--;
      if (this.gameOverCooldown <= 0) {
        return this._init();
      }

      this.items.forEach(i => i.draw());
      this.player.draw();

      fill(255);
      textAlign(LEFT, TOP);
      text(`Score: ${this.score}`, Game.padding, Game.padding);
      textAlign(RIGHT, TOP);
      text(`Lives: ${this.lives}`, WIDTH - Game.padding, Game.padding);
      textAlign(CENTER, CENTER);
      text("Game Over", WIDTH / 2, HEIGHT / 2);
      text(
        `${ceil(this.gameOverCooldown / 60)}`,
        WIDTH / 2,
        HEIGHT / 2 + Game.padding
      );

      return;
    }

    this.items = this.items.filter(i => {
      if (i.canBeDeleted && i.passed && !i.isBad) {
        this.lives--;
      }
      return !i.canBeDeleted;
    });
    this.items.forEach(i => {
      i.draw();
      i.update();
      if (this.player.collidedWithItem(i)) {
        if (i.isBad) {
          this.lives--;
        } else {
          this.score++;
        }
        i.canBeDeleted = true;
      }
    });

    this.player.draw();
    this.player.update();

    fill(255);
    textAlign(LEFT, TOP);
    text(`Score: ${this.score}`, Game.padding, Game.padding);
    textAlign(RIGHT, TOP);
    text(`Lives: ${this.lives}`, WIDTH - Game.padding, Game.padding);
  }

  update() {
    this.handleInput();

    if (this.lives <= 0) {
      this.gameOver = true;
      return;
    }

    this.time++;

    if (this.time >= Game.generatorCooldown) {
      this.time -= Game.generatorCooldown;
      this.items.push(new Item());
    }
  }

  handleInput() {
    if (controller.up) {
      if (!prevController.up) {
        this._init();
      }
    }

    prevController = { ...controller };
  }
}
