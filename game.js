
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level: "+level);
    level++;
}

$(".btn").click(function () {

    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    console.log(gamePattern);
    checkAnswer(userClickedPattern.length-1); //needed the minus 1 cause the item number in an array index starts with zero and not 1 

    $("#"+userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function playSound(name) {

    if (name === buttonColours[0]) {
        var redSound = new Audio("sounds/red.mp3");
        redSound.play();
    } else if (name === buttonColours[1]) {
        var blueSound = new Audio("sounds/blue.mp3");
        blueSound.play();
    } else if (name === buttonColours[2]) {
        var greenSound = new Audio("sounds/green.mp3");
        greenSound.play();
    } else {
        var yellowSound = new Audio("sounds/yellow.mp3");
        yellowSound.play();
    }
}

function animatePress(currentColour){
    
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$("body").one("keypress", function(){
    nextSequence();
});

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("right!");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);

        }
    }else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any key to Restart");

        console.log("wrong!");
        
        $("body").keypress(function(){
            //startOver();
            location.reload();
        });
    }
}

// function startOver(){
//     level = 0;
//     gamePattern = [];
// }
