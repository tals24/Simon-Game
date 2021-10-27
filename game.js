////Array of colours//////////////////
var buttonColours = ["red","blue","green","yellow"];

///// the game history/////////////////////
var gamePattern = [];
var  userClickedPattern = [];

var started = false;
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started){

    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }else{
      playSound("wrong");

      $("body").addClass("game-over");

      setTimeout(function(){
        $("body").removeClass("game-over"); }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}






function nextSequence(){

  userClickedPattern = [];
  level ++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4) ;

  var randomChosenColour =  buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColur){
   $("#"+ currentColur).addClass("pressed");
   setTimeout(function(){
     $('#'+ currentColur).removeClass("pressed");
    }, 100);
   }

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];


}
