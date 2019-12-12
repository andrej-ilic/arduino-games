class Menu {
  constructor() {
    this.asteroidCount = 12;
    this._init();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Menu();
    }
    return this.instance;
  }

  _init() {
    this.asteroids = [];
    this.stars = [];
    this.items = ["Play", "Scoreboard"];
    this.selectedItem = 0;
    this.padding = HEIGHT / 20;
    this.margin = HEIGHT / 8;

    for (let i = 0; i < this.asteroidCount; i++) {
      this.asteroids.push(new Asteroid(random(Object.values(ASTEROID_TYPE))));
    }

    for (let i = 0; i < 30; i++) {
      this.stars.push(
        createVector(abs(random()) * WIDTH, abs(random()) * HEIGHT)
      );
    }

    textAlign(CENTER, CENTER);
  }

  draw() {
    background(0);

    this.handleInput();

    stroke(255);
    this.stars.forEach(s => point(s.x, s.y));

    this.asteroids.forEach(a => {
      a.draw();
      a.update();
    });

    noStroke();
    fill(255);
    textSize(WIDTH / 8);
    text("Asteroids", WIDTH / 2, HEIGHT / 3);

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
        } else if (this.selectedItem === 1) {
          changeState(new Scoreboard());
        }
      }
    }

    if (controller.left) {
      if (!prevController.left) {
        if (this.selectedItem === 0) {
          changeState(new Game());
        } else if (this.selectedItem === 1) {
          changeState(new Scoreboard());
        }
      }
    }

    prevController = { ...controller };
  }
}
