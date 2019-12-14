class Scoreboard {
  constructor() {
    this.padding = 0.15;
    this.margin = 0.09;
    this.loading = true;
    this.scores = [];
    this.getScores();

    noStroke();
    textAlign(CENTER, CENTER);
    textSize(HEIGHT * 0.1);
  }

  getScores() {
    fetch("/scoreboard")
      .then(res => res.json())
      .then(data => {
        this.scores = data;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
  }

  draw() {
    background(0);

    this.handleInput();

    fill(255);

    if (this.loading) {
      text("Loading...", WIDTH / 2, HEIGHT / 2);
    } else {
      text("Scoreboard", WIDTH / 2, HEIGHT * this.margin);

      this.scores.forEach((score, i) => {
        text(
          `${i + 1}. ${score.name} ${score.score}`,
          WIDTH / 2,
          HEIGHT * (this.padding * (i + 1)) + this.margin * HEIGHT
        );
      });
    }
  }

  handleInput() {
    if (controller.up) {
      if (!prevController.up) {
        changeState(Menu.getInstance());
      }
    }

    if (controller.down) {
      if (!prevController.down) {
        changeState(Menu.getInstance());
      }
    }

    if (controller.right) {
      if (!prevController.right) {
        changeState(Menu.getInstance());
      }
    }

    if (controller.left) {
      if (!prevController.left) {
        changeState(Menu.getInstance());
      }
    }

    prevController = { ...controller };
  }
}
