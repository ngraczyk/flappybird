const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = 'img/BG.png';
const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height
};

function handleBackground() {
  if (BG.x1 <= -BG.width + 2* gameSpeed) BG.x1 = BG.width;
  else BG.x1 -= gameSpeed;
  if (BG.x2 <= -BG.width + 2* gameSpeed) BG.x2 = BG.width;
  else BG.x2 -= gameSpeed;

  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillRect(10, canvas.height - 90, 50, 50);
  handleBackground();
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = '90px Georgia';
  ctx.strokeText(score, canvas.width - 150, 70);
  ctx.fillText(score, canvas.width - 150, 70);
  handleCollisions();
  if (handleCollisions()) return;
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}

animate();

window.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    spacePressed = true;
  }
});

window.addEventListener('keyup', function(e) {
  if (e.code === 'Space') {
    spacePressed = false;
    bird.frameX = 0;
  }
});

window.addEventListener('resize', function(e) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  BG.width = canvas.width,
  BG.height = canvas.height
  animate();
});

const bang = new Image();
bang.src = 'img/bang.png';

function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
    bird.x + bird.width > obstaclesArray[i].x &&
    ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
    (bird.y > canvas.height - obstaclesArray[i].bottom &&
    bird.y + bird.height < canvas.height))) {
      // collision detected
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      ctx.font = '25px Georgia';
      ctx.fillStyle = 'white';
      ctx.fillText('Game Over, your score is ' + score, 160, canvas.height / 2 - 10);
      return true;
    }
  }
}
