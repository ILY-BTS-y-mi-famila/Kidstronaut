window.addEventListener('load', function(){
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = screen.availWidth;
canvas.height = window.innerHeight;
let gameOver = false;
      // function init() {
      //   if (canvas.getContext) {
      //     window.addEventListener('resize', resizeCanvas, false);
      //     window.addEventListener('orientationchange', resizeCanvas, false);
      //     resizeCanvas();
      //   }
      // }
 
      // function resizeCanvas() {
      //   canvas.width = window.innerWidth;
      //   canvas.height = window.innerHeight;
      // }

class InputHandler {
constructor(){
this.keys = [];
window.addEventListener('keydown', e => {
if ((e.key === 'ArrowDown' || 
e.key === 'ArrowUp' ||
e.key === 'ArrowRight')
&& this.keys.indexOf(e.key) === -1){
this.keys.push(e.key);
}
});
window.addEventListener('keyup', e => {
if ((e.key === 'ArrowDown' || 
e.key === 'ArrowUp' ||
e.key === 'ArrowRight')
&& this.keys.indexOf(e.key) === 1){
this.keys.splice(this.keys.indexOf(e.key), 1);
}
});
window.addEventListener('keyup', e => {
if ((e.key === 'ArrowDown' || 
e.key === 'ArrowUp' ||
e.key === 'ArrowRight')
&& this.keys.indexOf(e.key) === 0){
this.keys.splice(this.keys.indexOf(e.key), 1);
}
}
)};
}

class Player {
constructor(gameWidth, gameHeight){
this.gameWidth = gameWidth;
this.gameHeight = gameHeight;
this.width = 200;
this.height = 200;
this.x = 0;
this.y = this.gameHeight - this.height;
this.image = document.getElementById('playerImage');
this.maxFrame = 8;
this.frameX = 0;
this.frameY = 0;
this.fps = 70;
this.frameTimer = 0;
this.frameInterval = 1000/this.fps;
this.speed = 2.5;
this.vy = 0;
this.weight = 1.5;
}
draw(context){
//context.fillStyle = 'white';
//context.fillRect(this.x, this.y, this.width, this.height);
/*context.strokeStyle = "white"
context.strokeRect(this.x, this.y, this.width, this.height);
context.beginPath();
context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
context.stroke();
context.strokeStyle = 'blue';
context.beginPath();
context.arc(this.x, this.y, this.width/2, 0, Math.PI * 2);
context.stroke();*/
context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
}
update(input, deltaTime, enemies){
enemies.forEach(enemy => {
const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);
const distance = Math.sqrt(dx * dx + dy * dy);
if (distance < enemy.width/2 + this.width/2){
gameOver = true;
}
});
if (this.frameTimer > this.frameInterval){
if (this.frameX >= this.maxFrame) this.frameX = 0;
else this.frameX++;
this.frameTimer = 0;
} else {
this.frameTimer += deltaTime;
}
if (input.keys.indexOf('ArrowRight') > -1){
this.speed = 5;
} else if (input.keys.indexOf('ArrowLeft') > -1) {
this.speed = -5;
} else if (input.keys.indexOf('ArrowUp') > -1) {
this.vy -= 3;
} else if (input.keys.indexOf('ArrowDown') > -1) {
this.vy += 1.5;
} else {
this.speed = 0;
}
this.x += this.speed;
if (this.x < 0) this.x = 0;
else if(this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
this.y += this.vy
if(!this.onGround()){
   this.vy += this.weight;
   this.maxFrame = 5;
   this.frameY = 1;
} else {
   this.vy = 0;
   this.maxFrame = 8;
   this.frameY = 0;
}
if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
}
onGround(){
    return this.y >= this.gameHeight - this.height;
}
}

class Background {
constructor(gameWidth, gameHeight){
this.gameWidth = gameWidth;
this.gameHeight = gameHeight;
this.image = document.querySelector('#backgroundImage');
this.x = 0;
this.y = 0;
this.width = 2400;
this.height = 720;
this.speed = 7;
}
draw(context){
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
}
update(){
this.x -= this.speed;
if (this.x < 0 - this.width) this.x = 0;
}
}

class Enemy {
constructor(gameWidth, gameHeight){
this.gameWidth = gameWidth;
this.gameHeight = gameHeight;
this.width = 160;
this.height = 119;
this.image = document.querySelector('#enemyImage');
this.x = this.gameWidth;
this.y = this.gameHeight - this.height;
this.frameX = 0;
this.maxFrame = 5;
this.fps = 60;
this.frameTimer = 0;
this.frameInterval = 1000/this.fps;
this.speed = 2.5;
}
draw(context){
/*context.strokeStyle = "white"
context.strokeRect(this.x, this.y, this.width, this.height);
context.beginPath();
context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
context.stroke();
context.strokeStyle = 'blue';
context.beginPath();
context.arc(this.x, this.y, this.width/2, 0, Math.PI * 2);
context.stroke();*/
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
}
update(deltaTime){
if(this.frameTimer > this.frameInterval){
if(this.frameX >= this.maxFrame) this.frameX = 0;
else this.frameX++;
this.frameTimer = 0;
} else {
this.frameTimer += deltaTime;
}
this.x -= this.speed;
if (this.x < 0 - this.width) {
this.markedForDeletion = true;
score++;
}
}
}

//enemies.push(new Enemy(canvas.width, canvas.height));
function handleEnemies(deltaTime) {
if (enemyTimer > enemyInterval + randomEnemyInterval){
enemies.push(new Enemy(canvas.width, canvas.height));
console.log(enemies);
randomEnemyInterval = Math.random() * 1000 + 500;
enemyTimer = 0;
} else {
enemyTimer += deltaTime;
}
enemies.forEach(enemy => {
enemy.draw(ctx);
enemy.update(deltaTime);
});
enemies = enemies.filter(enemy => !enemy.markedForDeletion);
}

function displayStatusText(context) {
context.font = "40px Helvetica";
context.fillStyle = "blue";
context.fillText('Score: ' + score, 22, 52);
context.fillStyle = "pink";
context.fillText('Score: ' + score, 20, 50);
if (gameOver){
context.textAlign = 'center';
context.fillStyle = "black";
context.fillText('!!!GAME OVER!!!', canvas.width/2, 200);
context.fillStyle = "white";
context.fillText('!!!GAME OVER!!!', canvas.width/2, 200 - 2);
}
}

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);
const background = new Background(canvas.width, canvas.height);

let lastTime = 0;
let enemyTimer = 0;
let enemyInterval = 1000;
let randomEnemyInterval = Math.random() * 1000 + 500;

function animate(timeStamp) {
const deltaTime = timeStamp - lastTime;
lastTime = timeStamp;
ctx.clearRect(0, 0, canvas.width, canvas.height);
background.draw(ctx);
background.update();
player.draw(ctx);
player.update(input, deltaTime, enemies);
handleEnemies(deltaTime);
displayStatusText(ctx);
if (!gameOver) requestAnimationFrame(animate);
}
animate(0);
});
