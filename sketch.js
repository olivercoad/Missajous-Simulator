let circleRadius = 30;
let linkSize = 10;
let topCirclePos, rightCirclePos, topCircleLink, rightCircleLink;
let topLinkLength = 200, rightLinkLength = 200;
let speedSlider, offsetSlider, speedRatioSlider;
let missajousCurve = new curve();

function setup() {
  // put setup code here
  createCanvas(400, 400);
  background(57);
  topCirclePos = createVector(width / 2, circleRadius * 2);
  rightCirclePos = createVector(width - circleRadius * 2, height / 2);
  topCircleLink = createVector();
  rightCircleLink = createVector();
  createP("Speed");
  speedSlider = createSlider(0, 255, 20, 0);
  createP("Speed Ratio");
  speedRatioSlider = createSlider(0, 10, 2, 0);
  createP("Rotation Offset");
  offsetSlider = createSlider(0, 360, 90, 0);
  //frameRate(2);
}

let time = 0;

function draw() {
  // put drawing code here
  background(57);
  fill(255, 10);
  stroke(230, 0, 100);
  ellipse(topCirclePos.x, topCirclePos.y, circleRadius * 2);
  ellipse(rightCirclePos.x, rightCirclePos.y, circleRadius * 2);
  
  updateCircleLinks(time, offsetSlider.value() * Math.PI / 180, speedRatioSlider.value());

  fill(20, 220, 190);
  ellipse(topCircleLink.x, topCircleLink.y, linkSize);
  ellipse(rightCircleLink.x, rightCircleLink.y, linkSize);

  thirdPoint = findThirdPoint(topCircleLink, rightCircleLink, rightLinkLength, topLinkLength);
  
  missajousCurve.plot(thirdPoint);
  missajousCurve.draw();
  ellipse(thirdPoint.x, thirdPoint.y, linkSize);

  stroke(255, 165, 0);
  line(topCircleLink.x, topCircleLink.y, thirdPoint.x, thirdPoint.y);
  line(rightCircleLink.x, rightCircleLink.y, thirdPoint.x, thirdPoint.y);

  time += speedSlider.value() / 512;
}

function updateCircleLinks(rotation, offset, ratio) {
  topCircleLink.set(topCirclePos.x + circleRadius * Math.cos(rotation),
    topCirclePos.y + circleRadius * Math.sin(rotation));
  rotation = rotation + offset;
  rightCircleLink.set(rightCirclePos.x + circleRadius * Math.cos(rotation * ratio),
    rightCirclePos.y + circleRadius * Math.sin(rotation * ratio));
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

function touchMoved() {

}