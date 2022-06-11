var coin,coin1;
var enemy1,enemy2,enemy3;
var coinGroup,coinGroup;
var background1,rocket1,background2;
var over;

var PLAY = 1;
var END = 0;
var score = 0;
var obstacleGroup, obstacle1, obstacle2;
var gameState = PLAY;
var distance=0;
var gameOver;
var bullet, bulletImg, bulletGroup;


function preload(){
 
background1 = loadImage("game.png");
rocket1 = loadImage("Rocket12.png");
coin1 = loadImage("coin.png");
gameOver = loadImage("Gamerover.png");
enemy1 = loadImage("enemy2.png");
enemy2 = loadImage("enemy3.png");
enemy3 = loadImage("enemy4.png");
bulletImg = loadImage("bullet1.png")
 
 
 
 
coinGroup = new Group();
enemyGroup = new Group();
bulletGroup = new Group();
 

}

function setup(){
 createCanvas(windowWidth,windowHeight);
 
background2 = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
background2.addImage('r', background1);
background2.scale = 1;
background2.velocityY = +(6 + 3*distance/100);
 
rocket = createSprite(250,400,10,10);
rocket.addImage("R", rocket1);
rocket.scale = 0.14;
rocket.setCollider("circle",0,0,200);
//here is debug
rocket.debug = false;
 
over = createSprite(windowWidth/2,windowHeight/2,10,10);
over.addImage("r", gameOver);
over.visible = false;
 
}


function draw(){
 background("black")
 
 
 if(gameState === PLAY){
   distance = distance + Math.round(getFrameRate()/60)
   background2.velocityY = +(6 + 3*distance/100);
   
 
   
   if(background2.y>900){
   background2.y = 100;
   

 }
    if(keyDown(RIGHT_ARROW)){
     rocket.x = rocket.x + 5;
     if(rocket.x > 1920){
      rocket.x = 0
     }
   }
 
   if(keyDown(LEFT_ARROW)){
     rocket.x = rocket.x -5;
     if(rocket.x < 0){
      rocket.x = 1920
     }
   }
 
   if(keyDown(UP_ARROW)){
     rocket.y = rocket.y-3;
   }
 
   if(keyDown(DOWN_ARROW)){
     rocket.y = rocket.y + 3;
   }
 
   if(keyDown("Space")){
     rocket.y = rocket.y + -14;
     if(rocket.y < 0){
       rocket.y = 999;
     }

   if(keyDown("S")){
     shootBullet();
   }
   
   }
   if(rocket.isTouching(coinGroup)){
    coin.destroy();
     score=score+2;
     console.log(score);
   }
 

   spawnCoins();
   spawnenemy();
 
   if(rocket.isTouching(enemyGroup)){
     gameState= END;
  }
 }
 
 else if(gameState === END){
 

  fill("pink");
  text("OPPS", 200, 200);
  textSize(20);

   background2.velocityY = 0;
   rocket.velocityX = 0;
   rocket.velocityY = 0;
   enemyGroup.setVelocityYEach(0);
   coinGroup.setVelocityYEach(0);
   enemyGroup.setLifetimeEach(-1);
   coinGroup.setLifetimeEach(-1);
   over.visible = true;
   
   
  

/*background("white");
over.visible = true; 
background2.visble = false;
enemyGroup.visible= false;
coinGroup.visible = false;  
rocket.visble = false;*/

console.log(gameState);

 }

 
 drawSprites();
 fill("pink");
 textSize(20);
 text("Score:" + score, 200, 100);
 text("Distance:" + distance, 200, 70);
 
 
}


function spawnCoins(){
 if (frameCount % 90 === 0){
   coin = createSprite(250,100,10,10);
   coin.x = Math.round(random(0,1920));
   coin.addImage('r', coin1);
   coin.velocityY = 3;
   coin.scale = 0.1;
   
   coin.depth = enemyGroup.depth;
   enemyGroup.depth = enemyGroup.depth  + 5;
   
   coinGroup.add(coin);
 }
 
}

function spawnenemy(){
 if(frameCount % 30 === 0){
   enemy = createSprite(250,100,10,10);
   
   enemy.velocityY = +(6 + 3*distance/100);
   enemy.x = random(0,1920)
   var rand = Math.round(random(1,3))
   switch(rand){
     case 1: enemy.addImage(enemy1)
       break;
     case 2: enemy.addImage(enemy2)
       break;
     case 3: enemy.addImage(enemy3)
       break;
     default: break;
   }
       enemy.scale = 0.25;
       enemy.setCollider("circle",0,0,200);
       //here is debug
       enemy.debug = false;
       enemyGroup.depth = rocket.depth;
       rocket.depth = rocket.depth  + 5;
       enemy.lifetime = 300;
       enemyGroup.add(enemy);
 }
}

function shootBullet(){
  bullet = createSprite(150, width/2, 50,50);
  bullet.y = rocket.y;
  bullet.x = rocket.x;
  bullet.addImage(bulletImg);
  bullet.scale=0.12;
  bullet.velocityY= 7;
  
}




