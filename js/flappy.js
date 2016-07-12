// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)

var score;
var labelScore;
var score;
var player;
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var pipes = [];


/*
* Loads all resources for the game and gives them names.
*/
function preload() {
  game.load.image("backgroundImg", "../assets/buildings.jpg");
  game.load.image("playerImg", "../assets/flappy_superman.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");


}

/*
* Initialises the game. This function is only called once.
*/
function create(){
  // set the background colour of the scene

game.physics.startSystem(Phaser.Physics.ARCADE);

  var bg = game.add.image(0,0,"backgroundImg");
  bg.width = 790;
  bg.height = 400;

  game.stage.setBackgroundColor("#cc0000");
  game.add.text(300,20,"Flappy Superman",{font:"30px candara", fill: "#cccccc"});
  game.add.sprite(10,270,"playerImg");



  game.input.onDown.add(clickHandler);

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
        generatePipe
    );





}

/*
* This function updates the scene. It is called for every new frame.
*/
function update() {

    game.physics.arcade.overlap(
        player,

		  pipes,
		  gameOver);
}

function gameOver(){
  location.reload();
}



function clickHandler(event){
  game.add.sprite(60, 20, "playerImg");
  alert("The position is: " + event.x + "," + event.y,"playerImg");
  game.add.sprite(event.x, event.y, "playerImg");
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
      addPipeBlock(750, count*50);
    }
  }
  changeScore();
}
function addPipeBlock(x, y) {
  // create a new pipe block
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  // insert it in the 'pipes' array
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;

}
