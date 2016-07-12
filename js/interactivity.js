jQuery("#credits").on("click", function() {

    jQuery("#credits").empty();

    var message = "Game created by Sam!";
    jQuery("#credits").append(
        "<p>" + message + "</p>"
    );
});

var playerName = prompt("What's your name?");
var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";

function gameOver(){
    registerScore(score);
    game.state.restart();
}
