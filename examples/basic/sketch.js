async function setup() {
  createCanvas(400, 400);

  loadingAnimation = createLoadingAnimation();
  loadingAnimation.start(true, 30, ["Loading..."]);

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
