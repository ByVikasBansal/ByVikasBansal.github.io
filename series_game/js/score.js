window.onload=function(){


    // to retieve the details that are being displayed on the final score page


	var img;
    var x = window.location.hash;
    x = x.substring(1,x.length);
	var hour = x.split('?')[0];
	var s1 = x.split('?')[1];
	var second = s1.split('$')[0];
	var u = s1.split('$')[1];
	var uname = u.split('*')[0];
	var star = u.split('*')[1];

	if (star == 1)
        {
             img = "images/1star.png";
        }
    else if (star == 2)
        {
            img = "images/2star.png";
        }
    else if (star == 3)
        {
            img = "images/3star.png";
        }
    else if (star == 4)
        {
            img = "images/4star.png";
        }
    else if (star == 5)
        {
            img = "images/5star.png";
        }    


	document.getElementById('hour').innerHTML = hour;
	document.getElementById('second').innerHTML = second;
	document.getElementById('nme').innerHTML = uname;
	document.getElementById('starcount').style.backgroundImage = "url("+img+")";



	

}


// function to go bak to homepage


function gohome()
{
    if (confirm("Go Back To Main Page??") == true) 
    {
         window.location.href = 'index.html';
    } 
    
}