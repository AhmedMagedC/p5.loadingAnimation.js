// Credits for SableRaf for providing the demo code which this code is based on.
// https://openprocessing.org/sketch/2619980

/**
 * this class creates a loading animation that can be displayed while the main sketch is loading.
 * user can customize the loading animation for the background, draw his own spinning logo, and add loading words.
 * @class AnimationLoader
 * @param {p5} pInit - The p5 instance to use for the animation (important for instance mode compatibility).
 */
class AnimationLoader {
  constructor(pInit) {
    this.frame = 0;
    this.isMouseInside = false;
    this.hasMouseMoved = false;
    this.pInit = pInit;
    this.bgColor = this.pInit.color(200);
  }

  /**
   * start the loading animation
   * @param {boolean} useLogo
   * @param {number} startDelay
   * @param {Array} loadingWords
   * @returns {void}
   */

  start(useLogo = false, startDelay = 30, loadingWords = ["Loading..."]) {
    this.useLogo = useLogo;
    this.startDelay = startDelay;
    this.loadingWords = loadingWords;
    this.createMouseInsideListener();
    this.createMouseMoveListener();
    this.show();
  }

  /**
   * animation function that is called every frame
   * it calls the background animation, loading words animation, and spinning logo animation
   * @returns {void}
   */

  animation() {
    this.backgroundAnimation();
    this.loadingWordsAnimation();
    this.spinningLogoAnimation();
  }

  /**
   * user can over override this function to change the background animation
   * the default imolementation is a simple background color change
   * @returns {void}
   */
  backgroundAnimation() {
    this.pInit.background(this.bgColor);
  }

  /**
   * user can override this function to change the loading words animation
   * the default implementation is a simple wave animation
   * @returns {void}
   */
  loadingWordsAnimation() {
    this.pInit.textAlign(this.pInit.LEFT, this.pInit.TOP);
    const fontSize = 20;
    this.pInit.textSize(fontSize);
    const spacing = fontSize * 1.4;

    for (let i = 0; i < this.loadingWords.length; i++) {
      const wave = this.pInit.sin(this.frame * 0.05 - i * 0.5);
      const greyValue = this.pInit.map(wave, -1, 1, 50, 140);

      this.pInit.fill(greyValue);
      this.pInit.text(`${this.loadingWords[i]}`, 20, 20 + i * spacing);
    }
  }

  spinningLogoAnimation() {
    if (this.useLogo && this.isMouseInside && this.hasMouseMoved) {
      this.pInit.noCursor();
      this.drawSpinningLogo(this.pInit.mouseX, this.pInit.mouseY, this.frame);
    }
  }

  /**
   * this function calls the animation function every frame
   * it recursively calls itself using requestAnimationFrame until the setup() fuunction is done
   * @returns {void}
   */
  show() {
    if (this.pInit._setupDone) {
      this.pInit.cursor();
      return;
    }

    this.frame += 1;

    // Wait a few frames before playing the loading animation
    if (this.frame > this.startDelay) {
      this.pInit.clear();
      this.animation();
    }

    setTimeout(() => {
      requestAnimationFrame(this.show.bind(this));
    }, 1000 / 60);
  }

  /**
   * user can override this function to change the spinning logo animation
   * the default implementation is the p5.js spinning logo
   * @returns {void}
   */
  drawSpinningLogo(x, y, t) {
    this.pInit.push();
    this.pInit.translate(x, y);
    this.pInit.scale(0.75);
    this.pInit.rotate(this.pInit.radians(t * 6.5));
    this.pInit.translate(-14, -14);
    this.pInit.noStroke();
    this.pInit.fill("#ED225D");
    this.pInit.beginShape();
    this.pInit.vertex(16.909, 10.259);
    this.pInit.vertex(25.442, 7.683);
    this.pInit.vertex(27.118, 12.839);
    this.pInit.vertex(18.62, 15.738);
    this.pInit.vertex(23.895, 23.218);
    this.pInit.vertex(19.448, 26.443);
    this.pInit.vertex(13.895, 19.095);
    this.pInit.vertex(8.487, 26.25);
    this.pInit.vertex(4.169, 22.961);
    this.pInit.vertex(9.444, 15.738);
    this.pInit.vertex(0.88, 12.647);
    this.pInit.vertex(2.558, 7.487);
    this.pInit.vertex(11.156, 10.258);
    this.pInit.vertex(11.156, 1.364);
    this.pInit.vertex(16.91, 1.364);
    this.pInit.endShape(this.pInit.CLOSE);
    this.pInit.pop();
  }

  /**
   * in each p5 instance, we attach the mouseenter and mouseleave events to the canvas element
   * to detect if the mouse is inside the canvas or not
   * @returns {void}
   */
  createMouseInsideListener() {
    const canvas = this.pInit.canvas;
    canvas.addEventListener("mouseenter", () => (this.isMouseInside = true));
    canvas.addEventListener("mouseleave", () => (this.isMouseInside = false));
  }

  /**
   * in each p5 instance, we attach the mousemove event to the canvas element
   * to detect if the mouse has moved or not
   * @returns {void}
   */

  createMouseMoveListener() {
    const canvas = this.pInit.canvas;
    canvas.addEventListener(
      "mousemove",
      () => {
        this.hasMouseMoved = true;
      },
      {
        once: true,
      }
    ); // Only trigger the first time
  }
}

p5.prototype.createLoadingAnimation = function () {
  const animationLoader = new AnimationLoader(this);
  return animationLoader;
};
