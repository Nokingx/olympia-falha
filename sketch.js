var canvas;
var database, gameState;
var form, player, playerCount;
var bg, bgImg
var mangus, frango;
var frangoImg, mangusImg;
var fuelImage, fuels;

function preload() {
  
  frangoImg= loadImage("assets/frango.png");
  mangusImg= loadImage("assets/mangus.png");
  bgImg= loadImage ("assets/neon city.png");
  fuelImage= loadImage("assets/POWER.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  
}

function draw() {
  background(bgImg);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    
  }
  drawSprites()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}
