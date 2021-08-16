var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;

var level=0;

$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        
        newSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function newSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.random()*4;
    randomNumber=Math.floor(randomNumber);
    
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }

    else
    {
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over! Press Any Key To Restart!");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        
        startOver();
    }
}

function startOver()
{
    started=false;
    level=0;
    gamePattern=[];
    userClickedPattern=[];

}