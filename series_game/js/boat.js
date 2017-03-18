$(document).ready(function(){
});



// window onload function

window.onload=function(){
    userName = window.location.hash;
    userName = userName.substring(1,userName.length);
    draw();
 
// keypress eventhandler to get the index of the arrow keys

    document.onkeydown=function(e){
        e=e || window.event;
        switch(e.keyCode){
            case 37:
                leftArrow();
                break;
            case 38:
                upArrow();
                break;
            case 39:
                rightArrow();
                break;
            case 40:
                backArrow();
        }
        
    };

// function to laod local storage for highest score

    var arr = localStorage.getItem('score');
    if (arr != null)
        {
            var p = JSON.parse(arr);
            for(var i = 0; i <p.length; i++)
                {
                var index = i+1;
                $('#score').append("<p id = 'p1'>"+index+". "+p[i].name+" : "+p[i].time+"</p>");
                }
            $('#score').append("<button id = 'btn' onclick = 'scorehide()'>GO BACK</button>")
        }
    
    else 
        {
            $('#score').append("<p id = 'p1'>No Highscores Till Now. Please Complete the Game.</p>");
            $('#score').append("<button id = 'btn' onclick = 'scorehide()'>GO BACK</button>")
        }  


}




// coordinates for the canvas and boat div and values for the movement of the boat div


var can = document.getElementById("canvas");
var ctxt = can.getContext('2d');
var img = new Image();
var deg = 0;
var degRad = 0;
var boatTop = 580;  //coordinate where the boat stars when moving
var boatLeft = 910; //coordinate where the boat stars when moving

var prevTop = 580;  //same
var prevLeft = 910; //same

var xcord = 927,ycord = 580; // position of the tip of the boat

var centX = 927, centY = 613, prevCentX = 927, prevCentY = 613; //start of the boat in the canvas


var continents=[];


// canvas background image

function draw(){
    img.onload = function(){
        ctxt.drawImage(img, 0,0);
    }
    img.src = "images/15.png";
}







function leftArrow(){
    
    var boat=document.getElementById('boat');
    var leftColor = getPixel( xcord-1, ycord-1 );
    if(leftColor==0){
        deg = deg-5;
    }
    else{
       
    }

    console.log("Left Degree : "+deg);
    degRad = (deg*Math.PI)/180;
    boat.style.webkitTransform = 'rotate('+deg+'deg)';
    boat.style.mozTransform    = 'rotate('+deg+'deg)'; 
    boat.style.msTransform     = 'rotate('+deg+'deg)'; 
    boat.style.oTransform      = 'rotate('+deg+'deg)'; 
    boat.style.transform       = 'rotate('+deg+'deg)'; 

    xcord = centX -  Math.round(Math.cos(degRad+1.5707)*33);
    ycord = centY - Math.round(Math.sin(degRad+1.5707)*33);
   

}





function rightArrow(){
    
    var boat=document.getElementById('boat');
    
    var rightColor = getPixel( xcord+1, ycord+1 );
    if(rightColor==0){
        deg = deg+5;
    }
    else{
       
    }
    console.log("Right Degree : "+deg);
    degRad = (deg*Math.PI)/180;
    boat.style.webkitTransform = 'rotate('+deg+'deg)';
    boat.style.mozTransform    = 'rotate('+deg+'deg)'; 
    boat.style.msTransform     = 'rotate('+deg+'deg)'; 
    boat.style.oTransform      = 'rotate('+deg+'deg)'; 
    boat.style.transform       = 'rotate('+deg+'deg)'; 

    xcord = centX -  Math.round(Math.cos(degRad+1.5707)*33);
    ycord = centY - Math.round(Math.sin(degRad+1.5707)*33);
    
}


// function for the movement in upwards direction and the puzzle page that pops out when we reach the destination

function upArrow(){
    var boat = document.getElementById('boat');
    console.log("Top : "+boatTop);  
    console.log("Left : "+boatLeft);
   
    var leftColor = getPixel( xcord-1, ycord-1 );
    var rightColor = getPixel( xcord+1, ycord+1 );
    if( leftColor==0 && rightColor==0 && boatTop > 0 && boatLeft > 15){
        
        

        prevLeft = boatLeft;
        prevTop = boatTop;
        prevCentX=centX;
        prevCentY=centY;
        boatTop = Math.round(boatTop - Math.cos((-1)*degRad)*4);
        boatLeft = Math.round(boatLeft - Math.sin((-1)*degRad)*4);
        centY = Math.round(centY - Math.cos((-1)*degRad)*4);
        centX = Math.round(centX - Math.sin((-1)*degRad)*4);
        ycord = Math.round(ycord - Math.cos((-1)*degRad)*4);
        xcord = Math.round(xcord - Math.sin((-1)*degRad)*4);
        boat.style.top = boatTop+'px';
        boat.style.left = boatLeft+'px';
       
       
    }
    else if((leftColor<75 && leftColor>35) || (rightColor<75 && rightColor>35))

            {
               if(continents.indexOf('europe')<0)
                {
                    continents.push('europe');
                    $.fn.loadPuzzle('europe');
                }
                else
                {
                    alert("This area is complete. Please Visit other continents");
                }
               
            }

    else if((leftColor>75 && leftColor<100) || (rightColor>75 && rightColor<100))
         
         {
               if(continents.indexOf('america')<0)
                {
                    continents.push('america');
                    $.fn.loadPuzzle('america');
                }
                else
                {
                    alert("This area is complete. Please Visit other continents");
                }
               
            }

    else if((leftColor>110 && leftColor<150) || (rightColor>110 && rightColor<150))
            
            {
               if(continents.indexOf('africa')<0)
                {
                    continents.push('africa');
                    $.fn.loadPuzzle('africa');
                }
                else
                {
                    alert("This area is complete. Please Visit other continents");
                }
               
            }
           
        
    else if((leftColor>150 && leftColor<200) || (rightColor>150 && rightColor<200))
        
            {
               if(continents.indexOf('asia')<0)
                {
                    continents.push('asia');
                    $.fn.loadPuzzle('asia');
                }
                else
                {
                    alert("This area is complete. Please Visit other continents");
                }
               
            }


    else if((leftColor>200 && leftColor<240) || (rightColor>200 && rightColor<240))
        
            {
               if(continents.indexOf('australia')<0)
                {
                    continents.push('australia');
                    $.fn.loadPuzzle('australia');
                }
                else
                {
                    alert("This area is complete. Please Visit other continents");
                }
               
            }

    else if(leftColor!=0){
            boatLeft = prevLeft;
            boatTop = prevTop;
            centX = prevCentX;
            centY = prevCentY;
            boat.style.top = boatTop+'px';
            boat.style.left = boatLeft+'px';
            rightArrow();
    }
    else if(rightColor!=0){
            boatLeft = prevLeft;
            boatTop = prevTop;
            centX = prevCentX;
            centY = prevCentY;
            boat.style.top = boatTop+'px';
            boat.style.left = boatLeft+'px';
            leftArrow();
    }
}



function backArrow(){
    prevLeft = boatLeft;
    prevTop = boatTop;
    prevCentX=centX;
    prevCentY=centY;
    if(getPixel(centX, centY) == 0 && (centY>0 && centY<600) && (centX>0 && centX<950)){
        boatTop = Math.round(boatTop + Math.cos((-1)*degRad)*4);
        boatLeft = Math.round(boatLeft + Math.sin((-1)*degRad)*4);
        centY = Math.round(centY + Math.cos((-1)*degRad)*4);
        centX = Math.round(centX + Math.sin((-1)*degRad)*4);
        ycord = Math.round(ycord + Math.cos((-1)*degRad)*4);
        xcord = Math.round(xcord + Math.sin((-1)*degRad)*4);
        boat.style.top = boatTop+'px';
        boat.style.left = boatLeft+'px';
        
    }

}



// function the get the color/coordinate on the position of the boat

function getPixel( x, y ) {
            
            var imagedata =  ctxt.getImageData( x, y, 1, 1 );
            var  data = imagedata.data;
            return data[0];
            
}




// function for the change boat slider

function showOptions(){
      if ( $( "#options" ).is( ":hidden" ) ) {
        $("#options").slideDown(800);
      }
      else{
         $("#options").slideUp(800);
      }   
    }



// function for the rules show/hide option

function ruleshow()
{
    document.getElementById("help").style.visibility="visible";
    document.getElementById("wrapper").style.visibility="hidden";
   
}
function rulehide()
{
    document.getElementById("help").style.visibility="hidden";
    document.getElementById("wrapper").style.visibility="visible";
    
}




// return home function




function gohome()
{
    if (confirm("Are you sure to Quit??") == true) 
    {
         window.location.href = 'index.html';
    } 
    
}


// changing boat function

function changeimg(inp)
    {
        if (inp == 1)
        {
             img = "images/boat2.png";
        }
        else if (inp == 2)
        {
            img = "images/boat1.png";
        }
        else if (inp == 3)
        {
            img = "images/boat4.png";
        }

 document.getElementById('boat').style.backgroundImage = "url("+img+")";
        
}



// function for highestscore hide/show

function highscore()
{
    document.getElementById("score").style.visibility="visible";
    document.getElementById("wrapper").style.visibility="hidden";

}

function scorehide()
{
    document.getElementById("score").style.visibility="hidden";
    document.getElementById("wrapper").style.visibility="visible";

}
