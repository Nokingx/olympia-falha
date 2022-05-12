class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    mangus=createSprite(width/2-200,height-200);
    mangus.addImage(mangusImg);

    frango=createSprite(width/2+200,height-200);
    frango.addImage(frangoImg);
    frango.scale= 0.9;
    
    //fuels = new Group();
    //this.addSprites(fuels, 4, fuelImage, 0.02);
  }
  addSprites(spriteGroup,numberOfSprites,spriteImage,scale){
    for(var i=0; i<numberOfSprites;i++){
      var x,y;
      x=random(0,1920);
      y=random(0,1080);
      var sprite=createSprite(x,y);
      sprite.addImage("sprite",spriteImage);
      sprite.scale=scale;
      spriteGroup.add(sprite);
    }
  }

  
  handleElements() {
    form.hide();

    //C39
    this.resetTitle.html("Reiniciar");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();
    Player.getPlayersInfo();
    if (allPlayers!==undefined){
      var index=0;
    for (var plyr in allPlayers){
      index=index+1;
      var x = allPlayers[plyr].positionX;
      var y = allPlayers[plyr].positionY;

      if (index === player.index) {
        stroke(10);
        fill("red");
        ellipse(x, y, 60, 60);
  
        this.handleFuel(index);
        
        }
    }
    }

    this.showFuelBar();
    this.movimentacao();

    
      //alterar a posição da câmera na direção y
      camera.position.y = cars[index - 1].position.y;
    }
  
  
  showFuelBar() {
    push();
    image(fuelImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 350, player.fuel, 20);
    noStroke();
    pop();
    }
    
  
  handleFuel(index) {
    //adicionando combustível
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185;
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();
    });
    
    // reduzindo o combustível do carro
    if (player.fuel > 0 && this.playerMoving) {
      player.fuel -= 0.3;
    }

    if (player.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }
  movimentacao() {
    if (keyDown (UP_ARROW)){
      player.positionY= player.positionY-10;
      player.update();
    }
    if (keyDown (LEFT_ARROW)){
      player.positionX= player.positionX-10;
      player.update();
    }
    if (keyDown (DOWN_ARROW)){
      player.positionY= player.positionY+10;
      player.update();
    }
    if (keyDown (RIGHT_ARROW)){
      player.positionX=player.positionX-10;
      player.update();
    }

  }
}
