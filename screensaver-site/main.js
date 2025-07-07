const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;


const radius = 40;
const margin = 60; 
const maxSpeed = 4; 
const minSpeed = 1; 

const toggleText = document.getElementById('toggle-text');

let bounce = false;
let hueRotate = false;
let hue = 0;

document.getElementById('toggle').addEventListener('click', () => {
  bounce = !bounce;
  hueRotate = !hueRotate;

  if (!hueRotate) {
    // reset to default 

    document.body.style.background = 'black'; 
    toggleText.textContent = 'passing through';
  } else {
    toggleText.textContent = '...pushing away'
  }
});


// path
class Circle {
  constructor(x, y, dir, clockwise, color) {
    this.x = x;
    this.y = y;
    this.dir = dir; 

    // 0=right, 1=down, 2=left, 3=up
    
    this.clockwise = clockwise; 
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.speed = maxSpeed;
    this.updateVelocity();
  }

  updateVelocity() {
    switch (this.dir) {
      case 0: this.vx = this.speed; this.vy = 0; break; // right
      case 1: this.vx = 0; this.vy = this.speed; break; // down
      case 2: this.vx = -this.speed; this.vy = 0; break; // left
      case 3: this.vx = 0; this.vy = -this.speed; break; // up
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // corners
    const nearCorner = this.isNearCorner();
    this.speed = nearCorner ? minSpeed : maxSpeed;
    this.updateVelocity();

    
   if (this.dir === 0 && this.x >= width - margin) { this.turn(); }
   if (this.dir === 1 && this.y >= height - margin) { this.turn(); }
   if (this.dir === 2 && this.x <= margin) { this.turn(); }
   if (this.dir === 3 && this.y <= margin) { this.turn(); }
  } 

  turn() {
    if (this.clockwise) {
      this.dir = (this.dir + 1) % 4;
    } else {
      this.dir = (this.dir + 3) % 4; 
    }
  } 

  isNearCorner() {
    const nearX = Math.abs(this.x - margin) < 60 || Math.abs(this.x - (width - margin)) < 60;
    const nearY = Math.abs(this.y - margin) < 60 || Math.abs(this.y - (height - margin)) < 60;
    return nearX && nearY;
  }
}


const circle1 = new Circle(margin, margin, 0, true, 'rgba(100, 247, 67, 0.56)');
const circle2 = new Circle(width - margin, height - margin, 2, false, 'rgba(23, 16, 223, 0.5)');

function animate() {
  if (hueRotate) {
    hue = (hue + 0.5) % 360;
    const baseHue = 180; 
    const range = 60; 
    const limitedHue = baseHue + Math.sin(hue * Math.PI / 180) * range;
document.body.style.background = `hsl(${limitedHue}, 70%, 50%)`;


  }

  ctx.clearRect(0, 0, width, height);

  circle1.move();
  circle2.move();

  
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (bounce && distance < radius * 2) {
    
    [circle1.dir, circle2.dir] = [circle2.dir, circle1.dir];
    circle1.updateVelocity();
    circle2.updateVelocity();
  }

  
  ctx.fillStyle = circle1.color;
  ctx.beginPath();
  ctx.arc(circle1.x, circle1.y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = circle2.color;
  ctx.beginPath();
  ctx.arc(circle2.x, circle2.y, radius, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animate);
}

animate();

