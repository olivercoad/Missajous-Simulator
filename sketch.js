let linkSize = 10;
let topCirclePos, rightCirclePos, topCircleLink, rightCircleLink;
let speedSlider, offsetSlider, speedRatioSlider, lineDecaySlider, penSlipSlider;
let lineALengthSlider, lineBLengthSlider, circleARadiusSlider, circleBRadiusSlider;
let missajousCurve = new curve();

function setup() {
  // put setup code here
  createCanvas(600, 600);
  background(57);
  //TODO Wrap this in a menu
  //TODO CSS
  createP("Speed");
  speedSlider = createSlider(0, 255, 20, 0);
  createP("Speed Ratio");
  speedRatioSlider = createSlider(0, 10, 2, 0);
  createP("Rotation Offset");
  offsetSlider = createSlider(0, 360, 90, 0);
  createP("Pen Slip");
  penSlipSlider = createSlider(0, 15, 0);
  
  //TODO actually connect these
  createP("Line Decay");
  lineDecaySlider = createSlider(0, 1000, 150, 1);
  createP("Line A length");
  lineALengthSlider = createSlider(0, 500, 250, 0);
  createP("Line B length");
  lineBLengthSlider = createSlider(0, 500, 250, 0);
  
  createP("Circle A Radius");
  circleARadiusSlider = createSlider(0, 150, 50, 0);
  createP("Circle B Radius");
  circleBRadiusSlider = createSlider(0, 150, 50, 0);


  topCirclePos = createVector(width / 2, circleARadiusSlider.value() * 1.5);
  rightCirclePos = createVector(width - circleBRadiusSlider.value() * 1.5, height / 2);
  topCircleLink = createVector();
  rightCircleLink = createVector();
}

let time = 0;
let penTip = null;

function draw() {
  // put drawing code here
  background(57);
  fill(255, 10);
  stroke(230, 0, 100);
  ellipse(topCirclePos.x, topCirclePos.y, circleARadiusSlider.value() * 2);
  ellipse(rightCirclePos.x, rightCirclePos.y, circleBRadiusSlider.value() * 2);

  updateCircleLinks(time, offsetSlider.value() * Math.PI / 180, speedRatioSlider.value());

  fill(20, 220, 190);
  ellipse(topCircleLink.x, topCircleLink.y, linkSize);
  ellipse(rightCircleLink.x, rightCircleLink.y, linkSize);

  let penHold = findThirdPoint(topCircleLink, rightCircleLink, lineBLengthSlider.value(), lineALengthSlider.value());

  if(penTip) {
    if(penTip.dist(penHold) > penSlipSlider.value()) {
      penTip = penTip.sub(penHold).normalize().mult(penSlipSlider.value()).add(penHold);
    }
  }
  else {
    penTip = penHold;
  }

  missajousCurve.plot(penTip);
  missajousCurve.draw();
  missajousCurve.setDecay(lineDecaySlider.value());

  ellipse(penHold.x, penHold.y, linkSize / 2);
  ellipse(penTip.x, penTip.y, linkSize / 2);

  stroke(255, 165, 0);
  line(topCircleLink.x, topCircleLink.y, penHold.x, penHold.y);
  line(rightCircleLink.x, rightCircleLink.y, penHold.x, penHold.y);

  time += speedSlider.value() / 512;
}

function updateCircleLinks(rotation, offset, ratio) {
  topCircleLink.set(topCirclePos.x + circleARadiusSlider.value() * Math.cos(rotation),
    topCirclePos.y + circleARadiusSlider.value() * Math.sin(rotation));
  rotation = rotation + offset;
  rightCircleLink.set(rightCirclePos.x + circleBRadiusSlider.value() * Math.cos(rotation * ratio),
    rightCirclePos.y + circleBRadiusSlider.value() * Math.sin(rotation * ratio));
}

//given 2 points of a triange and the distances opposide those points,
//calculates the possible third points of the triangle
function findThirdPoint(pointA, pointB, sideLenA, sideLenB) {
  sideLenC = pointA.dist(pointB);

  let a2 = sideLenA * sideLenA;
  let b2 = sideLenB * sideLenB;
  let c2 = sideLenC * sideLenC;

  //C = A + b * unit(A, B).rot(+/- alpha)

  let alpha = Math.acos((b2 + c2 - a2) / (2 * sideLenB * sideLenC));
  let pointC = pointB.copy().sub(pointA).normalize().rotate(alpha).mult(sideLenB).add(pointA);

  return pointC;
}

let movingA = false, movingB = false;
function mousePressed() {
  let mousePos = createVector(mouseX, mouseY);
  if (mousePos.dist(topCirclePos) < circleARadiusSlider.value()) {
    movingA = true;
  }
  if (mousePos.dist(rightCirclePos) < circleBRadiusSlider.value()) {
    movingB = true;
  }
}

function mouseReleased() {
  movingA = false;
  movingB = false;
}

function mouseDragged() {
  let mousePos = createVector(mouseX, mouseY);
  if (movingA) {
    topCirclePos = mousePos;
  }
  else if (movingB) {
    rightCirclePos = mousePos;
  }
}