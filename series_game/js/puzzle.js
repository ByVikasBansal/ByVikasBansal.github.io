// function to load details from json for puzzle options

$(document).ready(function(){
});

var stars = 5;

var totalmins=0,totalsec=0;

  var myArr=[],
    totalContinents=5,
    allData;
    
  // class for ezch element in puzzle page
  var classes=["one ","two ","three ","four ","five ","six ","seven ","eight ","nine ","ten ","eleven ","twelve ","thirteen "];
  
  // name to be displayed in puzzle
  var divNames=["Famous Animal","Population","Main Religion","Famous Tourist Place","Highest Mountain Peak","Population Rank","Famous Person","Famous Movie","Famous For?","Country Count","Popular Sport","Food","Largest Country"];
  

  // ajax  call to get the data
  $.ajax({
        url: "data/list.json",
        dataType:"text",
        context: document.body
  })
  .done(function(data) {
      allData=JSON.parse(data);
      
});



// function to start the puzzle page and select appropriate options

  $.fn.loadPuzzle = function(continent){
  alert("Hello " +userName+ ", welcome to "+continent);
  var index=0;
  $(".left").empty();
  $("#canvas1").empty();
  $("#wrapper").addClass("hidden");
  $(".puzzlePage").removeClass("hidden");

  // creating timer and starts
  
  $(".wrapperPuzzlePage").prepend('<canvas id="canvas1" class="timer"></canvas>');
  for (var key in allData[continent]) {
      var x=("<p id="+key+">"+allData[continent][key]+"</p>");
    myArr.push(x);


  // appending in the left div
  
  $(".left").append("<div class=\"droppable "+classes[index]+key+" \">"+divNames[index]+"</div>");
  ++index;
  };



  // drag and drop functions


  while(myArr.length>0){
    var randomElement=Math.floor(Math.random()*myArr.length);
    $(myArr[randomElement]).appendTo("#contains").draggable({revert:true,
      start:function(){
      contents=$(this);
      }
    });
    myArr.splice(randomElement,1);
  }
    
      $('.droppable').droppable({
        drop:function(){
          if($(this).hasClass(contents.attr('id')))
          {
          
            $(this).html(contents);
            $(this).append('<img src="images/tick2.png">');  //circle image
            $(this).find("img").css({width:"40px",height:"40px"});
            $(contents).draggable("disable");
          
          }
          if($("#contains").html()==""){
            checkGameFinish();
          }
        }
      });


  // puzzle contents ends


  var c=document.getElementById("canvas1");
  var ctx=c.getContext("2d");
  


  // function for timer decrement
  
  var sec=0;
  var min=5;
  var time=setInterval(function(){
                  Timer();
                  ++totalsec;
                  if(totalsec==60){
                    ++totalmins;
                    totalsec=0;
                  }
              },1000);



  // function for the canvas timer

  function Timer(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
    if(sec==0) 
      {
        if(min>0)
        {
        min--;
        sec=59;
          }       
      }
    if(sec>9)
      {
        var timer="0"+String(min)+":"+String(sec);
      }
    else
      {
         var timer="0"+String(min)+":0"+String(sec);
        }
      ctx.strokeStyle="#9ea0b7";
      ctx.font = "100px arial";
      ctx.strokeText(timer, 10, 90);
      sec--;

    if(min==0&&sec==0){
         if (confirm("GAME OVER!! YOU HAVE EXCEEDED YOUR TIME LIMIT") == true) 
    {
         window.location.href = 'index.html';
    } 
    else
      {
          window.location.href = 'index.html';
      }
    }
  }




  // function to check game is over or not

  function checkGameFinish(){

      
      var totalContinents = 5;
      var x = [];
      
      if(continents.length==5)
      {

         
         var arr = localStorage.getItem('score');
          if (arr == null)
          {
            x.push({'name': userName, 'time': totalmins+":"+totalsec});
            localStorage.setItem('score', JSON.stringify(x));
          }
          else
          {
            var p = JSON.parse(arr);
            p.push({'name': userName, 'time': totalmins+":"+totalsec});
            localStorage.setItem('score', JSON.stringify(p));
          }
     





        var starsAwarded=Math.ceil(((+totalContinents*5)-totalmins)/totalContinents);
        window.location.href = 'score.html#'+totalmins+'?'+totalsec+'$'+userName+'*'+starsAwarded;

  
    }
    else
    {
  
      $("#wrapper").removeClass("hidden");
      $("#contains").empty();
      $(".puzzlePage").addClass("hidden");
      clearInterval(time);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      console.log(continents.length);
      
    
    }
  }
}

