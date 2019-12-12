class GameOver {
  constructor({ player, bullets, asteroids, won, score, stars }) {
    this.player = player;
    this.bullets = bullets;
    this.asteroids = asteroids;
    this.stars = stars;
    this.won = won;
    this.score = score;

    this._init();
  }

  _init() {
    this.items = ["Play again", "Scoreboard", "Menu"];
    this.selectedItem = 0;
    this.padding = HEIGHT * 0.05;
    this.margin = HEIGHT * 0.19;

    textAlign(CENTER, CENTER);
  }

  draw() {
    this.handleInput();

    stroke(255);

    background(0);
    this.stars.forEach(s => point(s.x, s.y));
    this.player.draw();
    this.bullets.forEach(p => p.draw());
    this.asteroids.forEach(p => p.draw());

    fill(255);
    noStroke();

    textSize(HEIGHT / 8);
    if (!this.won) {
      text("GAME OVER", WIDTH / 2, HEIGHT * 0.3);
    } else {
      text("YOU WON", WIDTH / 2, HEIGHT * 0.3);
    }

    textSize(HEIGHT * 0.11);
    text(`Score: ${this.score}`, WIDTH / 2, HEIGHT * 0.42);

    textSize(HEIGHT / 13);
    this.items.forEach((item, i) => {
      if (this.selectedItem == i) {
        fill(200, 0, 0);
      } else {
        fill(255);
      }

      text(
        item,
        WIDTH / 2,
        HEIGHT / 3 + ((i + 1) * HEIGHT) / 13 + i * this.padding + this.margin
      );
    });
  }

  handleInput() {
    if (controller.up) {
      if (!prevController.up) {
        this.selectedItem =
          this.selectedItem - 1 < 0
            ? this.items.length - 1
            : this.selectedItem - 1;
      }
    }

    if (controller.down) {
      if (!prevController.down) {
        this.selectedItem =
          this.selectedItem + 1 === this.items.length
            ? 0
            : this.selectedItem + 1;
      }
    }

    if (controller.right) {
      if (!prevController.right) {
        if (this.selectedItem === 0) {
          changeState(new Game());
        }

        if (this.selectedItem === 2) {
          changeState(new Menu());
        }
      }
    }

    if (controller.left) {
      if (!prevController.left) {
        if (this.selectedItem === 0) {
          changeState(new Game());
        }

        if (this.selectedItem === 2) {
          changeState(new Menu());
        }
      }
    }

    prevController = { ...controller };
  }
}
