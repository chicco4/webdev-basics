/* UTILITY FUNCTIONS */

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function getDistance(x1, y1, x2, y2) {
  let xDist = x2 - x1;
  let yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/* MAIN STUFF */

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: 10,
  y: 10,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let circle1;
let circle2;
function init() {
  circle1 = new Circle(200, 300, 100, "grey");
  circle2 = new Circle(undefined, undefined, 30, "red");
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circle1.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();
  console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y));

  if (
    getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <
    circle1.radius + circle2.radius
  ) {
    console.log("IMPACT");
    circle1.color = "red";
  }else{
    circle1.color = "grey";
  }
}

init();
animate();
