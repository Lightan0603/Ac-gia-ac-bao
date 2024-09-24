let customFont;

function preload() {
    
    customFont = loadFont('asset/font.ttf'); 
}

function setup() {
    // Create a half-window canvas
    let cnv = createCanvas(windowWidth / 2, windowHeight / 2);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    noLoop(); // Stop continuous drawing if the image doesn't need to be animated
}

function draw() {
    textFont(customFont);
    background(111,102,82); // Background color
    

    // Title Section: Centered "USER MANUAL" at the top
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(36);
    text("ÁC GIẢ ÁC BÁO", width / 1.9, height / 10);

    // Left Side: Key and Function Board
    // Outer container
    fill(111,102,82);
    stroke(255);
    strokeWeight(2);
    rect(width / 2 - 300, height / 5, 300, 350);
    noStroke();

    // Table Headers
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text("KEY", width / 2 - 245, height / 3.55); 
    text("FUNCTION", width / 2 - 250 + 160, height / 3.55); 


    // Table Content
    textAlign(LEFT, CENTER);
    textSize(16);
    fill(255);

       // Divider Line
       stroke(255);
       strokeWeight(1);
       line(width / 2 - 230, height / 4 + 50, width / 2 - 70, height / 4 + 50); 
       noStroke();

    // Row 1
    text("ESC", width / 2 - 260, height / 4 + 105);
    text("Open menu", width / 2 - 140, height / 4 + 105);

    // Row 2
    text("Space", width / 2 - 260, height / 4 + 145);
    text("Thunder", width / 2 - 140, height / 4 + 145);

    // Row 3
    text("A", width / 2 - 260, height / 4 + 185);
    text("Assemble", width / 2 - 140, height / 4 + 185);

    // Row 4 
    text("S", width / 2 - 260, height / 4 + 225);
    text("Speed up", width / 2 - 140, height / 4 + 225);

    // Right Side: Abstract Board
    // Outer container for abstract
    fill(111,102,82);
    stroke(255);
    strokeWeight(2);
    rect(width / 2 + 25, height / 5, 300, 350); // Right side board for abstract
    noStroke();

    // Abstract Title
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text("ABSTRACT", width / 2 + 180, height / 3.55); 

           // Divider Line
           stroke(255);
           strokeWeight(1);
           line(width / 2 + 100, height / 4 + 50, width / 2 + 260, height / 4 + 50); 
           noStroke();

    // Abstract Content
    textSize(13);
    fill(255);
    textAlign(CENTER, CENTER);
    text("This code-based artwork project centers", width / 2 + 175, height / 4 + 83);
    text("around the Buddhist proverb", width / 2 + 175, height / 4 + 103);
    text("'Evil will be punished', symbolizing the belief", width / 2 + 175, height / 4 + 123);
    text("that those who commit harmful deeds", width / 2 + 175, height / 4 + 143);
    text("will be observed by heaven and", width / 2 + 175, height / 4 + 163);
    text("eventually face consequences.", width / 2 + 175, height / 4 + 183);

    text("The piece also features rotating prayer wheels", width / 2 + 175, height / 4 + 203);
    text("inscribed with the mantra", width / 2 + 175, height / 4 + 223);
    text("'Om mani padme hum', displayed in", width / 2 + 175, height / 4 + 243);
    text("hexagonal forms, representing the removal", width / 2 + 175, height / 4 + 263);
    text("of evil, and the attraction of good fortune.", width / 2 + 175, height / 4 + 283);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
