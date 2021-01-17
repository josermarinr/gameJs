
 let imgRex, imgNube, imgCactus, imgSuelo;
 let canvas, ctx; 
  
 const width = 700;
 const heigth = 300;

function initialize(){
   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   uploadImg();
 }
 

function uploadImg(){
   imgRex = new Image();
   imgCloud = new Image();
   imgTree = new Image();
   imgGround = new Image();
   imgRex.src = "./assets/dino.png";
   imgCloud.src = "./assets/cloud.png";
   imgTree.src = "./assets/treee.png";
   imgGround.src = "./assets/ground.png";
 }
 
 function deleteCanvas(){
   canvas.width = width;
   canvas.heigth = width;
 }
 
 var ground = 200;
 let trex = {
    y: ground,
    vy: 0,
    gravedad: 2,
    jumping: 28,
    vymax: 9,
    jump: false
 };
 var level = {
    velocidad: 9,
    score: 0,
    isDead: false
 };
 var cactus = {
    x: width + 100,
    y: ground - 25
 };
 var Cloud = {
    x: 400,
    y: 100,
    velocidad: 3
 };
 var gorundBg = {
    x: 0,
    y: ground + 30
 };
 
 function paintRex() {
   ctx.drawImage(imgRex, 0, 0, 89, 93, 100, trex.y, 50, 50);
 }

function paintCactus() {
   ctx.drawImage(imgTree, 0, 0, 37, 75, cactus.x, cactus.y, 38, 75);
}

function paintCloud() {
   ctx.drawImage(imgCloud, 0, 0, 94, 34, Cloud.x, Cloud.y, 82, 25);
}

function paintground() {
   ctx.drawImage(imgGround, gorundBg.x, 0, 700, 37, 0, gorundBg.y, 700, 37);
}


document.addEventListener('keydown', function (event) {
   if (event.code == 'Space') {
      if (level.isDead == false) {
         (trex.jump === true)? null:
         jumping();
      } else {
         level.velocidad = 9;
         Cloud.velocidad = 2;
         cactus.x = width + 100;
         Cloud.x = width + 100;
         level.score = 0;
         level.isDead = false;
      }
   }
});
  
  
function jumping() {
   trex.jump = true;
   trex.vy = trex.jumping;
}

function gravedad() {

   if (trex.jump == true) {
      // console.log("trex.y - trex.vy - trex.gravedad > ground");
      if (trex.y - trex.vy - trex.gravedad > ground) {
         trex.jump = false;
         trex.vy = 0;
         trex.y = ground;
      } else {
         // console.log("else_gravedad");
         trex.vy -= trex.gravedad;
         trex.y -= trex.vy;
      }
   }
}


function logicaground() {
   if (gorundBg.x > 700) {
      gorundBg.x = 0;
   } else {
      gorundBg.x += level.velocidad;
   }
}


function logicaCactus() {
   if (cactus.x < -100) {
      cactus.x = width + 100;
      level.score++;
   } else {
      cactus.x -= level.velocidad;
   }
}

function logicaCloud() {
   if (Cloud.x < -100) {
      Cloud.x = width + 100;
   } else {
      Cloud.x -= Cloud.velocidad;
   }
}


function colision() {

   if (cactus.x >= 100 && cactus.x <= 150) {
      if (trex.y >= ground - 25) {
         level.isDead = true;
         level.velocidad = 0;
         Cloud.velocidad = 0
      }
   }
}

function points() {
   ctx.font = "30px impact";
   ctx.fillStyle = "#555555";
   ctx.fillText(`${level.score}`, 600, 50);
  
   if (level.isDead == true) {
      ctx.font = "60px impact";
      ctx.fillText(`GAME OVER`, 240, 150);
   }
 }
 

let FPS = 60;
setInterval(function(){
  init();
},2000/FPS); 
 
function init(){
   deleteCanvas()
   paintRex()
   paintCactus()
   paintground()
   paintCloud()
   gravedad()
   logicaCactus()
   logicaCloud()
   logicaground()
   colision()
   points()
}
