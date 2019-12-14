class SaveScore {
  constructor(score) {
    this.score = score;
    this.margin = 0.11;
    this.charIndex = 0;
    this.positions = [0.4, 0.5, 0.6];
    this.name = ["A", "A", "A"];
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(HEIGHT * 0.1);
  }

  saveScore() {
    fetch(
      `http://localhost:5000/scoreboard/${this.name.join("")}/${this.score}`,
      { method: "POST" }
    );
    changeState(Menu.getInstance());
  }

  draw() {
    this.handleInput();

    background(0);

    this.name.forEach((char, i) => {
      fill(255);

      if (i === this.charIndex && this.charIndex != 3) {
        fill(200, 0, 0);
        stroke(200, 0, 0);
        strokeWeight(4);
        line(
          WIDTH * this.positions[i] - HEIGHT * 0.04,
          HEIGHT / 2 + HEIGHT * 0.04,
          WIDTH * this.positions[i] + HEIGHT * 0.04,
          HEIGHT / 2 + HEIGHT * 0.04
        );
        noStroke();
      }

      text(char, WIDTH * this.positions[i], HEIGHT / 2);
    });

    fill(255);
    text(`Score: ${this.score}`, WIDTH / 2, HEIGHT * this.margin);

    if (this.charIndex === 3) {
      fill(200, 0, 0);
    }
    text("OK", WIDTH / 2, HEIGHT * 0.9);
  }

  nextChar() {
    if (this.name[this.charIndex] === "Z") {
      this.name[this.charIndex] = "A";
    } else {
      this.name[this.charIndex] = String.fromCharCode(
        this.name[this.charIndex].charCodeAt(0) + 1
      );
    }
  }

  prevChar() {
    if (this.name[this.charIndex] === "A") {
      this.name[this.charIndex] = "Z";
    } else {
      this.name[this.charIndex] = String.fromCharCode(
        this.name[this.charIndex].charCodeAt(0) - 1
      );
    }
  }

  handleInput() {
    if (controller.up) {
      if (!prevController.up) {
        if (this.charIndex === 3) {
          this.saveScore();
        } else {
          this.nextChar();
        }
      }
    }

    if (controller.down) {
      if (!prevController.down) {
        if (this.charIndex === 3) {
          this.saveScore();
        } else {
          this.prevChar();
        }
      }
    }

    if (controller.right) {
      if (!prevController.right) {
        this.charIndex++;
        this.charIndex %= 4;
      }
    }

    if (controller.left) {
      if (!prevController.left) {
        if (this.charIndex === 0) this.charIndex = 3;
        else this.charIndex--;
      }
    }

    prevController = { ...controller };
  }
}
