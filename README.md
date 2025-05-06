# p5.loadingAnimation.js
p5.js library to support creating your own desired custom loading animation

![image](https://github.com/user-attachments/assets/a7eed8e3-1681-4ad9-9a1b-e8e300881613)


## Overview
Instead of staring at a blank screen when loading assets, you can create visually appealing loading animation which can also help as a good indication that something is loading.

## Installation
It is necessary to insert loadingAnimation.js in your html:
```html
<script src="loadingAnimation.js"></script>
<script src="sketch.js"></script>
```

## Usage
```javascript
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
```

## Methods
### createLoadingAnimation();
init the loading animation obj

### start([useLogo], [startDelay], [loadingWords])
start the animation
| Parameter |  Type | Required | Description
|----------|----------|----------|----------|
| useLogo    | Boolean | No (False is default) | change the normal cursor to some animated cursor
| startDelay    | Number     | No (30 is default)   | delay the start of the animation
| loadingWords    | Array of Strings     | No (['Loading...'] is default)  | loading words that appear on screen 

## Override the default animations
### backgroundAnimation()
user can change the background animation, default one is a simple grey background

**example:**
```javascript
async function setup() {
  createCanvas(400, 400);

  loadingAnimation = createLoadingAnimation();
  loadingAnimation.backgroundAnimation = backgroundAnimation;
  loadingAnimation.start();

  // Delay to simulate loading large files (for demonstration only)
  await fakeLoad(7000);

  // Your usual setup things below
  background("#EB5580");
  fill(255);
  circle(width / 2, height / 2, 100);
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
```
**Note:** you can use parameter frameCount in your animation function like in the above example
### cursorAnimation()
user can change the cursor animation, default one is the p5 spinning logo

**example:**
```javascript
async function setup() {
  createCanvas(400, 400);

  loadingAnimation = createLoadingAnimation();
  loadingAnimation.cursorAnimation = drawSpinningLogo;
  loadingAnimation.start(true);

  // Delay to simulate loading large files (for demonstration only)
  await fakeLoad(7000);

  // Your usual setup things below
  background("#EB5580");
  fill(255);
  circle(width / 2, height / 2, 100);
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
```
**Note:** you can use parameters (mouseX, mouseY, frameCount) in your animation like in the above example
### loadingWordsAnimation()
user can change the loading words animation, default one `loading...` at the top left corner

**example:**
```javascript
async function setup() {
  createCanvas(400, 400);

  loadingAnimation = createLoadingAnimation();
  loadingAnimation.loadingWordsAnimation = loadingWordsAnimation;
  loadingAnimation.start();

  // Delay to simulate loading large files (for demonstration only)
  await fakeLoad(7000);

  // Your usual setup things below
  background("#EB5580");
  fill(255);
  circle(width / 2, height / 2, 100);
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
```
**Note:** you can use parameter frameCount in your animation like in the above example, you can also use the `loadingWords` array in your function (be careful of `this` binding in anonymous functions)

## Credits
Credits for [SableRaf](https://github.com/SableRaf) for providing this [Proof Of Concept](https://openprocessing.org/sketch/2619980)


