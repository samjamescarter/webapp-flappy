// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)

var labelScore;
var score=0;
var player;
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var pipes = [];
var background;
var balloons =[];



/*
* Loads all resources for the game and gives them names.
*/
function preload() {
  game.load.image("backgroundImg", "../assets/buildings.jpg");
  game.load.image("playerImg", "../assets/flappy_superman.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.image("pipeEnd","../assets/pipe2-end.png");
  game.load.image("balloons","../assets/balloons.png");



}

/*
* Initialises the game. This function is only called once.
*/
function create(){
  // set the background colour of the scene

game.physics.startSystem(Phaser.Physics.ARCADE);
background=game.add.tileSprite(0,0,790,400,"backgroundImg");
background.scale.setTo(2.5,2.5);
background.autoScroll(-100,0);



  game.add.text(300,20,"Flappy Superman",{font:"30px candara", fill: "#cccccc"});



  //alert(score);
  labelScore = game.add.text(20, 20, "0");
  player = game.add.sprite(100,200,"playerImg");
  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);
  game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  .onDown.add(moveLeft);
  game.input.keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(moveup);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
  .onDown.add(movedown);
  generatePipe();

  game.physics.arcade.enable(player);
  player.body.velocity.x = 0;
  player.body.velocity.y = -100;
  player.body.gravity.y =500;

  game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown
    .add(playerJump);
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(
        pipeInterval,
        generate
    );

score=0;

player.anchor.setTo(0.5, 0.5);
player.angle=30;





}

/*
* This function updates the scene. It is called for every new frame.
*/
function update() {

    game.physics.arcade.overlap(
        player,pipes,gameOver);
        if(player.y<0|| player.y>400)
        {gameOver();}

        for(var i = balloons.length - 1; i >= 0; i--){
      game.physics.arcade.overlap(player, balloons[i], function(){

if(player.body.gravity.y>100)
        {player.body.gravity.y=player.body.gravity.y-50;}
        balloons[i].destroy();
        balloons.splice(i, 1);

    });
}
}

function gameOver(){
  registerScore(score);
  score=0;
  game.state.restart();
}



function playerJump() {
  player.body.velocity.y=-200;

}

function changeScore(){
  score = score + 1;
  labelScore.setText(score.toString());

}
function moveRight(){
  player.x = player.x +5;
}
function moveLeft() {
  player.x = player.x - 5;
}
function moveup(){
  player.y = player.y -5;
}
function movedown(){
  player.y = player.y +5;
}
function generatePipe() {
  var gap  = game.rnd.integerInRange(1, 5);
  for(var count=0; count<8; count++){
    if(count != gap && count !=gap+1) {
      addPipeBlock(900, count*50);
    }
  }
  changeScore();
}
function addPipeBlock(x, y) {
  // create a new pipe block
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipeBlock.width = 40;
  pipeBlock.height = 50;
  // insert it in the 'pipes' array
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;

}
function generateBalloons(){
    var bonus = game.add.sprite(900,400, "balloons");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(20, 100);
}

function generate() {
    var diceRoll = game.rnd.integerInRange(1, 4);
    if(diceRoll==1) {
        generateBalloons();
    } else {
        generatePipe();
    }
}
