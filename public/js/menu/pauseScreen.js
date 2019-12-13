class PauseScreen {
  constructor(game) {
    this.game = game;
    const { player, bullets, asteroids, score, stars, particles } = game;
    this.player = player;
    this.bullets = bullets;
    this.asteroids = asteroids;
    this.score = score;
    this.stars = stars;
    this.particles = particles;
    this.items = ["Resume", "Quit"];
    this.padding = HEIGHT / 20;
    this.margin = HEIGHT / 8;
    this.selectedItem = 0;
  }

  draw() {
    this.handleInput();

    stroke(255);

    background(0);

    fill(255);
    textAlign(LEFT, TOP);
    textSize(HEIGHT / 16);
    text(this.score, 5, 5);

    this.stars.forEach(s => point(s.x, s.y));
    this.player.draw();
    this.bullets.forEach(p => p.draw());
    this.asteroids.forEach(p => p.draw());
    this.particles.forEach(p => p.draw());

    noStroke();
    textAlign(CENTER, CENTER);
    fill(255);

    textSize(WIDTH / 8);
    text("Paused", WIDTH / 2, HEIGHT / 3);

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
          changeState(this.game);
        } else if (this.selectedItem === 1) {
          changeState(Menu.getInstance());
        }
      }
    }

    if (controller.left) {
      if (!prevController.left) {
        if (this.selectedItem === 0) {
          changeState(this.game);
        } else if (this.selectedItem === 1) {
          changeState(Menu.getInstance());
        }
      }
    }

    prevController = { ...controller };
  }
}
