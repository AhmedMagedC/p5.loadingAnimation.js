async function setup() {
  createCanvas(400, 400);

  loadingAnimation = createLoadingAnimation();
  // you can override the background animation, cursor animation and loading words animation
  loadingAnimation.backgroundAnimation = backgroundAnimation;
  loadingAnimation.cursorAnimation = drawSpinningLogo;
  loadingAnimation.loadingWordsAnimation = loadingWordsAnimation;
  loadingAnimation.start(true, 30, [
    "Loading...",
    "Cargando..",
    "로딩중...",
    "読み込み中...",
    "...يتم التحميل",
    "Laden...",
  ]);

  // Delay to simulate loading large files (for demonstration only)
  await fakeLoad(7000);

  // Your usual setup things below
  background("#EB5580");
  fill(255);
  circle(width / 2, height / 2, 100);
}

function draw() {
  circle(mouseX, mouseY, 20);
}

async function fakeLoad(delay) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}

function backgroundAnimation(f) {
  background(20);
  push();
  translate(width / 2, height / 2);
  rotate(f / 2);
  noFill();
  stroke(100, 200, 255);
  strokeWeight(4);
  ellipse(100, 0, 50, 50);
  pop();
}

function drawSpinningLogo(x, y, f) {
  push();
  translate(x, y);
  scale(1);
  rotate(radians(f * 6.5));
  fill("#ED225D");
  noStroke();
  const size = 10;
  beginShape();
  vertex(0, -size);
  vertex(size * 0.866, size / 2);
  vertex(-size * 0.866, size / 2);
  endShape(CLOSE);
  pop();
}

function loadingWordsAnimation(f) {
  textAlign(LEFT, TOP);
  const fontSize = 13;
  textSize(fontSize);
  fill(255);
  const word = this.loadingWords.join(" ");
  const speed = 8;
  const maxChars = Math.min(Math.floor(f / speed), word.length);
  const displayText = word.substring(0, maxChars);
  text(displayText, 20, 20);
  if (Math.floor(f / 30) % 2 === 0 && maxChars < word.length) {
    const w = textWidth(displayText);
    text("_", 20 + w, 20); // Position cursor after text
  }
}
