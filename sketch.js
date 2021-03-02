let img;

var leftBuffer;
var inputBuffer;
var outputBuffer;
var kernelBuffer;

var kernelGrid = 3;
var kernelGridSize = 6 * kernelGrid;
function preload() {
  img = loadImage('/test.jpg');
}

function setup() {
  // 800 x 400 (double width to make room for each "sub-canvas")
  createCanvas(windowWidth, windowHeight);
  // Create both of your off-screen graphics buffers
  leftBuffer = createGraphics(windowWidth / 4, windowHeight);
  inputBuffer = createGraphics(windowWidth / 3, windowWidth / 3);
  outputBuffer = createGraphics(windowWidth / 3, windowWidth / 3);
  kernelBuffer = createGraphics(windowWidth / 6, windowWidth / 6);
  image(img, 0, 0);

}

function draw() {
  // Draw on your buffers however you like
  background(53)
  drawLeftBuffer();
  drawInputBuffer();
  drawOutputBuffer();
  drawKernelBuffer();
  img.loadPixels();
  // Paint the off-screen buffers onto the main canvas


  for (let i = 0; i < kernelGrid; i++) {
    for (let j = 0; j < kernelGrid; j++) {
      var x = i * (windowWidth / kernelGridSize);
      var y = j * (windowWidth / kernelGridSize);
      kernelBuffer.stroke(0);
      kernelBuffer.fill(255);
      kernelBuffer.rect(x, y, windowWidth / kernelGridSize, windowWidth / kernelGridSize);
    }
  }
  image(leftBuffer, windowWidth - windowWidth / 4, 0);
  image(inputBuffer, 10, 80);
  image(outputBuffer, windowWidth / 3 + 20, 80);
  image(kernelBuffer, (windowWidth - (windowWidth / 4)) + windowWidth / 22, windowHeight / 5);
}

function drawLeftBuffer() {
  leftBuffer.background(62);
  leftBuffer.fill(255, 255, 255);
  leftBuffer.textSize(32);
  leftBuffer.textAlign(CENTER);
  leftBuffer.text("Panel", leftBuffer.width / 2, 40);
}

function drawInputBuffer() {
  inputBuffer.background(img);
  inputBuffer.fill(255, 255, 255);

  //inputBuffer.image(img, 0,0,windowWidth / 3,windowWidth / 3);
  inputBuffer.line(mouseX-10, 0, mouseX-10, windowWidth * 3);
  inputBuffer.stroke('red');
  inputBuffer.strokeWeight(1);
  inputBuffer.line(0, mouseY-80, windowWidth, mouseY-80);
}

function drawOutputBuffer() {
  outputBuffer.background(255);
  outputBuffer.fill(255, 255, 255);
  outputBuffer.line(mouseX-10, 0, mouseX-10, windowWidth * 3);
  outputBuffer.stroke('green');
  outputBuffer.strokeWeight(1);
  outputBuffer.line(0, mouseY-80, windowWidth, mouseY-80);
}

function drawKernelBuffer() {
  kernelBuffer.background(255, 0, 0);
  kernelBuffer.fill(255, 255, 255);
}

function windowResized() {
  console.log("Resized")
  resizeCanvas(windowWidth, windowHeight);
  leftBuffer.resizeCanvas(windowWidth / 4, windowHeight)
  inputBuffer.resizeCanvas(windowWidth / 3, windowWidth / 3);
  outputBuffer.resizeCanvas(windowWidth / 3, windowWidth / 3);
}