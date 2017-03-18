$(document).ready(function(){

 
// script for loacing local storage which is used for storing highest scores, used in jquery.

 var arr = localStorage.getItem('score');
    
    if (arr != null)
        {
         var p = JSON.parse(arr);
         for(var i = 0; i <p.length; i++)
            {
            var index = i+1;
            $('#score').append("<p id = 'p1'>"+index+". "+p[i].name+" : "+p[i].time+"</p>");
            }
            $('#score').append("<button id = 'btn' onclick = 'scorehide()'>GO BACK</button>");
        }
    
    else 
        {
            $('#score').append("<p id = 'p1'>No Highscores Till Now. Please Complete the Game.</p>");
            $('#score').append("<button id = 'btn' onclick = 'scorehide()'>GO BACK</button>")
        }  


});




// window onload functions

window.onload=function()
{
 sound.play();

// new game icon click functions

document.getElementById("boat").onclick=function(){
		var uname = document.getElementById("uname").value;
		if(uname.length>2)
        {
		  window.location.href = 'boat.html#'+uname;
			
		}
		else{
			document.getElementById("error").style.visibility="visible";
		}
		
}

}


var flag = 0;
var play = 1;
var sound = new Audio('sounds/10.mp3');

// function for play pause

function try1(input) 
{
    
	

	if (flag != input)
	{
    document.getElementById("song").style.display = "none";
    document.getElementById("mute").style.visibility="visible";
    document.getElementById("sound").style.border="3px solid red";
    flag = 1;
    sound.pause();
    }
    else
    {
    document.getElementById("mute").style.visibility="hidden";
    document.getElementById("song").style.display = "";
    document.getElementById("sound").style.border="3px solid #669900";
    flag = 0;
    sound.play();

    }
}


// funcion for the onclick even of the highscore show/hide option

var flag1 = 0;

function highscore()
{
    if (flag1 == 0)
    {
        document.getElementById("score").style.visibility="visible";
        flag1 = 1;
    }
    else
    {
        document.getElementById("score").style.visibility="hidden";
        flag1 = 0;
    } 
}

function scorehide()
{
    document.getElementById("score").style.visibility="hidden";
    flag1 = 0;
}

var flag = 0;
// funcion for the onclick even of the rules show/hide option

function ruleshow()
{
    if (flag == 0)
    {
        document.getElementById("help").style.visibility="visible";
        flag = 1;
    }
    else
    {
        document.getElementById("help").style.visibility="hidden";
        flag = 0;
    }    



}   
function rulehide()
{
    document.getElementById("help").style.visibility="hidden";
    flag = 0;
}

