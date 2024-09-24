

let shapes = [];
let numShapes = 21;
let horrorColors = ["#8B0000", "#4B0082", "#FF1493", "#00FF00", "#FFD700"];
let glitchTimer = 0;
let flickerDuration = 0; // Track how long to flicker
let maxFlickerDuration = 20; // How long the flicker lasts (in frames)
let isFlickering = false; // Flag to trigger flicker effect

let isSpedUp = false; // Flag to track speed state
let normalSpeed = 0.006; // Normal rotation speed
let fastSpeed = 0.2; // Fast rotation speed
let currentSpeed = normalSpeed; // Set the initial rotation speed

let isLargeDistance = false; // Flag to track distance mode
let normalDistance = 90; // Normal interaction distance
let largeDistance = 30000; // Larger interaction distance
let currentDistance = 140;

let music;
let isMusicPlaying = false; // Track music state
let imgMusicOn, imgMusicOff; // Music control images
let musicButtonX, musicButtonY, musicButtonSize = 90; 
let musicButtonWidth = 140; 
let musicButtonHeight = 80;

let bg;
let img;
let eyeImg;

let iframe; // To store reference to the iframe element

function preload() {
  bg = loadImage('images/image2.png');
  img = loadImage('images/image1.png');
  eyeImg = loadImage('images/image3.png');
  imgTopLayer = loadImage('images/image4.png');

  imgMusicOn = loadImage('images/on_music.png'); // Music ON image
  imgMusicOff = loadImage('images/off_music.png'); // Music OFF image
  music = loadSound('asset/music.mp3'); // Music fil
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");

  noCursor();

  musicButtonX = width / 2 + 730;
  musicButtonY = height / 40 +10;

  // Create initial shapes
  for (let i = 0; i < numShapes; i++) {
    shapes.push({
      x: random(width),
      y: random(height),
      r: random(50, 150),
      color: random(horrorColors),
      growth: random(0.1, 0.5),
      glitchFactor: random(5, 20)
    });
  }
}

function draw() {
  if (isFlickering) {
    background(random(255)); // More extreme flicker colors
    flickerDuration++;
    if (flickerDuration > maxFlickerDuration) {
      isFlickering = false; // Stop flickering after the duration
      flickerDuration = 0;
    }
  } else {
    background(bg, 0, 0, width, height); // Normal background when not flickering
  }

  glitchTimer++;

  // Draw insane shapes
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];

    // Hover interaction: Move shape towards the mouse when close
    let d = dist(mouseX, mouseY, s.x, s.y);
    if (d < currentDistance) {
      s.x += (mouseX - s.x) * 0.02;
      s.y += (mouseY - s.y) * 0.02;
    }

    // Glitchy behavior
    if (random(1) < 0.001) {
      s.x = random(width); // Sudden jump
      s.y = random(height);
    }

    // Pulsating size
    s.r += s.growth;
    if (s.r > 200 || s.r < 50) s.growth *= -1;

    push();
    translate(s.x, s.y);
    rotate(frameCount * currentSpeed);

    fill(1, 6, 9, 150);
    stroke(random(255), random(255), random(255), 200);

    // Create jagged polygon for glitchy, crazy effect
    beginShape();
    for (let j = 0; j < 7; j++) {
      let angle = TWO_PI / 7 * j;
      let radius = s.r + random(-s.glitchFactor, s.glitchFactor);
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);

    imageMode(CENTER);
    image(img, 0, 0, s.r * 2, s.r * 2);

    pop();
  }

  // Crazy mouse trail effect
  for (let i = 0; i < 10; i++) {
    fill(255, random(255), random(255), 100);
    ellipse(mouseX + random(-20, 20), mouseY + random(-20, 20), random(10, 50));
  }
  
  // Creepy eyes still following the mouse
  drawCreepyEyes(mouseX, mouseY);

  // Display the music control button
  if (isMusicPlaying) {
    image(imgMusicOn, musicButtonX, musicButtonY, musicButtonWidth, musicButtonHeight); // Music ON image
  } else {
    image(imgMusicOff, musicButtonX, musicButtonY, musicButtonWidth, musicButtonHeight); // Music OFF image
  }

  image(imgTopLayer, width / 100, height / 40 + 10, 130, 80);
}

// Mouse click handler to toggle music on/off
function mousePressed() {
  // Check if the mouse is within the bounds of the music button
  if (mouseX > musicButtonX && mouseX < musicButtonX + musicButtonSize &&
      mouseY > musicButtonY && mouseY < musicButtonY + musicButtonSize) {
    
    if (isMusicPlaying) {
      music.stop(); // Stop the music
      isMusicPlaying = false; // Update state
    } else {
      music.play(); // Play the music
      isMusicPlaying = true; // Update state
    }
  }
}

// Trigger a strong flicker effect on spacebar press
function keyPressed() {
  if (key == ' ') {
    isFlickering = true;
    flickerDuration = 0;
  }

  if (key == 'S' || key == 's') {
    isSpedUp = !isSpedUp;
    currentSpeed = isSpedUp ? fastSpeed : normalSpeed;
  }

  if (key == 'A' || key == 'a') {
    isLargeDistance = !isLargeDistance;
    currentDistance = isLargeDistance ? largeDistance : normalDistance;
  }

  // Display the P5.js sketch as an iframe above all layers when ESC is pressed
  if (keyCode === ESCAPE && !iframe) {
    iframe = createElement('iframe');
    iframe.attribute('src', 'topSketch.html'); // Path to your new P5.js sketch file
    iframe.position(0, 0);
    iframe.size(windowWidth, windowHeight);
    iframe.style('z-index', '9999');
    iframe.style('border', 'none');
  }
}

function keyReleased() {
  // Remove iframe when ESC is released
  if (keyCode === ESCAPE && iframe) {
    iframe.remove(); // Remove the iframe element
    iframe = null; // Reset the reference
  }
}

function drawCreepyEyes(x, y) {

  image(eyeImg, x - 30, y -80, 150, 80); // Left eye image
  image(eyeImg, x -120 , y - 80, 150, 80); // Right eye image
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
