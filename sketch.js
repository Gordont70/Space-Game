var coin;

var PLAY = 1;
var END = 0;
var score=0;
var obstacleGroup, obstacle1, obstacle2;
var gameState = PLAY;
var distance=0;

function preload(){
 
Background1 = loadImage("game.png")
Rocket1 = loadImage("Rocket12.png")
Coin1 = loadImage("coin.png")
GamerOver = loadImage("GameOver.png")
enemy1 = loadImage("enemy2.png")
enemy2 = loadImage("enemy3.png")
enemy3 = loadImage("enemy4.png")
 
 
 
 
coinGroup = createGroup()
enemyGroup = createGroup()
 

}

function setup(){
 createCanvas(1920,969)
 
Background2 = createSprite(windowWidth/2,windowHeight/2,displayWidth,displayHeight)
Background2.addImage('r', Background1)
Background2.scale = 1 
Background2.velocityY = +(6 + 3*distance/100);
 
Rocket = createSprite(250,400,10,10)
Rocket.addImage("R", Rocket1)
Rocket.scale = 0.14
Rocket.setCollider("circle",0,0,0.1)
 
Over = createSprite(250,250,10,10)
Over.addImage("r", GamerOver)
Over.visible = false 
 
}


function draw(){
 background("black")
 
 
 if(gameState === PLAY){
   Background2.velocityY = +(6 + 3*distance/100);
   
 
   
   if(Background2.y>900){
   Background2.y = 150
   

 }
    if(keyDown(RIGHT_ARROW)){
     Rocket.x = Rocket.x + 5
   }
 
   if(keyDown(LEFT_ARROW)){
     Rocket.x = Rocket.x -5
   }
 
   if(keyDown(UP_ARROW)){
     Rocket.y = Rocket.y-3
   }
 
   if(keyDown(DOWN_ARROW)){
     Rocket.y = Rocket.y + 3
   }
 
   if(keyDown("Space")){
     Rocket.y = Rocket.y + -14
   
   }
   if(Rocket.isTouching(coinGroup)){
     coinGroup.destroyEach()
     score=score+2
     console.log(score)
   }
 

   spawnCoins()
   spawnenemy()
 
   if(enemyGroup.isTouching(Rocket)){
     gameState= END
  }
 }
 
 else if(gameState === END){
 
   
    Background2.velocityY = 0
   Rocket.velocityX = 0
   Rocket.velocityY = 0
   enemyGroup.setVelocityYEach(0)
   coinGroup.setVelocityYEach(0)
   enemyGroup.setLifetimeEach(-1)
   coinGroup.setLifetimeEach(-1)

   text("GameOver", windowWidth/2, windowHeight/2)

 }

 
 drawSprites();
 text("Score:" + score, 50, 100)
 text("Distance:" + distance, 50, 70)
 
}


function spawnCoins(){
 if (frameCount % 90 === 0){
   coin = createSprite(250,100,10,10)
   coin.x = Math.round(random(0,1920))
   coin.addImage('r', Coin1)
   coin.velocityY = 3
   coin.scale = 0.1
   
   coin.depth = enemyGroup.depth
   enemyGroup.depth = enemyGroup.depth  + 5
   
   coinGroup.add(coin)
 }
 
}

function spawnenemy(){
 if(frameCount % 30 === 0){
   enemy = createSprite(250,100,10,10)
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
     default: break
   }
       enemy.scale = 0.25
       enemy.lifetime = 300
       enemyGroup.add(enemy)
 }
}





