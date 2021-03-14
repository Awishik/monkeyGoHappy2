var monkey , monkey_running, monkeyCollided;
var banana ,bananaImage, rock, rockImage;
var bananaG, rockG;
var ground, groundI;
var invisibleGround;
var score=0;
var survivalTime=0;


function preload(){
  
  groundI=loadImage("jungle.jpg")
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  monkeyCollided=loadImage("Monkey_08.png");
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600,400);  
  ground=createSprite(0,160,50000,5)
  ground.addImage("background", groundI)
  ground.scale=1.2
  ground.velocityX=-14;
  
  monkey=createSprite(150,320,20,20)
  monkey.addAnimation("move",monkey_running);
  monkey.addImage("collided",monkeyCollided)
  monkey.scale=0.15
  
  invisibleGround=createSprite(0,380,500,50);
  invisibleGround.visible=false;
  
  bananaG= new Group();
  rockG= new Group();
}


function draw() {
  
  background("skyBlue");
  survivalTime = survivalTime +Math.round(getFrameRate()/60);
  
  monkey.collide(invisibleGround);
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
    bananas();
    obstacle();
  
  if(bananaG.isTouching(monkey)) {
    bananaG.destroyEach();
    score=score+2
  }
    if(rockG.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0;
      rockG.setVelocityXEach(0); 
      bananaG.setVelocityXEach(0);
      rockG.setLifetimeEach(-1); 
      bananaG.setLifetimeEach(-1);
      survivalTime=0;
      monkey.changeImage("collided", monkeyCollided);
    }
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
  
  if(bananaG.isTouching(monkey)){
      bananaG.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
  drawSprites();
  
  stroke("orange")
    fill("yellow")
    textSize(20)
    textFont("Segoe Script")
    text("Score:"+score,500,30)
    
    stroke("blue")
    fill("blue")
    textSize(20)
    textFont("Segoe Script")
    text("Survival Time:"+survivalTime,200,30)
  }
  




function bananas() {
  if (frameCount%80===0) {
    banana=createSprite(635,120,20,20);
    banana.addImage("asdfghj",bananaImage);
    banana.scale=0.1;
    banana.velocityX=-14;
    bananaG.add(banana);
    banana.y=Math.round(random(120,200));
    banana.lifetime=50;
  }
}


function obstacle () {
  
  if (frameCount%300===0) {
    rock=createSprite(635,320,20,20);
    rock.addImage("rock",rockImage);
    rock.scale=0.2
    rock.velocityX=-14
    rock.lifetime=300
    rockG.add(rock);
  }
}


