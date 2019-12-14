class LoadingScreen {
  constructor(bgColor = 0) {
    this.bgColor = bgColor;
    fill(255);
    textSize(WIDTH / 10);
    textAlign(CENTER, CENTER);
  }

  draw() {
    background(this.bgColor);
    text("Loading...", WIDTH / 2, HEIGHT / 2);
  }
}
