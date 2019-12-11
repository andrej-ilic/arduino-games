class Game {
  constructor() {
    this._init();
  }

  _init() {
    this.player = new Player();
    this.asteroids = [];
    this.bullets = [];
    this.level = 1;
    this.gameOver = false;
    this.won = false;
    this.score = 0;

    for (let i = 0; i < ASTEROIDS_PER_LEVEL[this.level - 1]; i++) {
      this.asteroids.push(new Asteroid(ASTEROID_TYPE.BIG));
    }
  }

  nextLevel() {
    this.level++;

    if (this.level > ASTEROIDS_PER_LEVEL.length) {
      this.gameOver = true;
      this.won = true;
      return;
    }

    for (let i = 0; i < ASTEROIDS_PER_LEVEL[this.level - 1]; i++) {
      this.asteroids.push(new Asteroid(ASTEROID_TYPE.BIG));
    }
  }

  draw() {
    if (this.gameOver) {
      changeState(
        new GameOver(
          this.player,
          this.bullets,
          this.asteroids,
          this.won,
          this.score
        )
      );
      return;
    }

    background(0);

    fill(255);
    textAlign(LEFT, TOP);
    textSize(HEIGHT / 16);
    text(this.score, 5, 5);

    this.handleInput();

    this.player.draw();
    this.player.update();

    this.bullets = this.bullets.filter(b => !b.canBeDeleted);
    this.bullets.forEach(b => {
      b.draw();
      b.update();
    });

    this.asteroids = this.asteroids.filter(b => !b.canBeDeleted);
    if (this.asteroids.length === 0) this.nextLevel();

    this.asteroids.forEach(a => {
      this.bullets.forEach(b => {
        if (a.collidesWithBullet(b)) {
          if (a.type == ASTEROID_TYPE.BIG) this.score += 10;
          if (a.type == ASTEROID_TYPE.MEDIUM) this.score += 20;
          if (a.type == ASTEROID_TYPE.SMALL) this.score += 30;
          a.break().forEach(newAsteroid => this.asteroids.push(newAsteroid));
          a.canBeDeleted = true;
          b.canBeDeleted = true;
        }
      });

      if (a.collidesWithPlayer(this.player)) {
        this.gameOver = true;
      }

      a.draw();
      a.update();
    });
  }

  handleInput() {
    if (abs(controller.x) > 0.1) {
      this.player.rotate(controller.x);
    }

    if (controller.down) {
      this.player.boost();
    }

    if (controller.left) {
      if (!prevController.left) {
        this.bullets.push(this.player.shoot());
      }
    }

    if (controller.up) {
      if (!prevController.up) {
        this._init();
      }
    }

    prevController = { ...controller };
  }
}
