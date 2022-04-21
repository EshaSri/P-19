var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlocksGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("334698.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost1.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 // spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4
  climbersGroup=new Group()
  doorsGroup=new Group()
  invisibleBlocksGroup=new Group()
}

function draw(){
  background(0);
  if(gameState==="play"){

  
  if (tower.y>600){
    tower.y=300
  }
  if(keyDown("left")){
    ghost.x-=3
  }
  if(keyDown("right")){
    ghost.x+=3
  }
  if(keyDown("space")){
    ghost.velocityY=-3
  }
  ghost.velocityY+=0.5
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  if(invisibleBlocksGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy()
    gameState="end"
  }
  drawSprites()
  spawnDoors()
  }
  else if(gameState==="end"){
    stroke("orange")
    strokeWeight(3)
    fill("red")
    textSize(30)
    text("Game Over! ",230,250)
  }
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
  door=createSprite(Math.round(random(120,480)),-15)
  door.addImage(doorImg)
  door.velocityY=1
  doorsGroup.add(door)
  climber=createSprite(door.x,35)
  climber.addImage(climberImg)
  climber.velocityY=1
  climbersGroup.add(climber)
  ghost.depth=climber.depth+1
  invisibleBlock=createSprite(door.x,climber.y+15,climber.width,2)
  invisibleBlock.velocityY=1
  invisibleBlocksGroup.add(invisibleBlock)
  door.lifetime=600
  climber.lifetime=600
  invisibleBlock.lifetime=600
  }
}

