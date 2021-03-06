let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

/*
c.fillStyle = "blue";
c.fillRect(50, 100, 100, 100);
c.fillStyle = "green";
c.fillRect(100, 400, 100, 100);
c.fillStyle = "lightgrey";
c.fillRect(300, 400, 50, 50);

//line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "red";
c.stroke();

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//arc / circ
for (let i = 0; i < 6; i++) {
  c.strokeStyle = getRandomColor();
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  c.beginPath();
  c.arc(x, y, 50, 0, 360, false);
  c.stroke();
}
/*
c.strokeStyle = "black";
c.beginPath();
c.arc(300, 300, 50, 22, 90, true);
c.stroke();
*/
let mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 100;
let distance = 50;

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
  console.log(cirles.length);
});

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = getRandomColor();
    this.minRadius = radius;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }
  updatePos() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < distance &&
      mouse.x - this.x > -distance &&
      mouse.y - this.y < distance &&
      mouse.y - this.y > -distance
    ) {
      if (this.radius < maxRadius) {
        this.radius += 3;
      }
    } else if (this.radius > this.minRadius) {
      this.radius--;
    }
  }
}

function getCircle() {
  let radius = Math.random() * 20 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() + 0.5) * 4;
  let dy = (Math.random() + 0.5) * 4;
  return new Circle(x, y, dx, dy, radius);
}

let cirles = [];
const NCIRCS = 100;

for (let i = 0; i < NCIRCS; i++) {
  cirles.push(getCircle());
}

function init() {
  let cirles = [];
  for (let i = 0; i < NCIRCS; i++) {
    cirles.push(getCircle());
  }
}

let frame = 0;
function animate() {
  if (frame > 1000) {
    return;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < cirles.length; i++) {
    cirles[i].draw();
    cirles[i].updatePos();
  }

  frame++;
}

animate();
