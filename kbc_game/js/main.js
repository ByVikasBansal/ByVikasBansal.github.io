var app = angular.module("myApp", ['ngRoute']);

app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/homePage.html',
            controller: 'homePageController'
        })
        .when('/gamePage', {
            templateUrl: 'pages/gamePage.html',
            controller: 'gamePageController'
        })
        .when('/congoPage', {
            templateUrl: 'pages/congoPage.html',
            controller: 'congoPageController'
        })
        .when('/gameWonPage', {
            templateUrl: 'pages/gameWonPage.html',
            controller: 'gameWonPageController'
        })
        .otherwise({
            redirectTo: '/' // provide a redirection URL - maybe a 404 page not found template
        });
});

app.factory('myFact', function() {
    var player = {};
    player.points = 0;

    player.setName = function(name) {
        player.pName = name;
    };
    player.getName = function() {
        return player.pName;
    };

    player.setPoints = function(points) {
        player.points = player.points + points;
    };
    player.getPoints = function() {
        return player.points;
    };


    return player;

})


app.controller('homePageController', function($scope, myFact, $location) {

    $scope.start = function(isValid) {


        var requestMethod = document.body.requestFullScreen || document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen || document.body.msRequestFullScreen;

        if (requestMethod) {

            // Native full screen.
            requestMethod.call(document.body);

        }
        document.onkeydown = function() {
            return false;
        }
        myFact.setName($scope.playerName);
        $location.path('/gamePage');
    }
})

app.controller('gamePageController', function($scope, $http, myFact, $location) {

    $http({
        url: 'js/data.json',
        method: 'GET'
    }).success(function(data, status) {
        $scope.pointsTree = data.points;
        $scope.questions = data.questions;
        $scope.pointsEarned = myFact.getPoints();
        $scope.isDisabled =false;
        $scope.quesIndex = generateQues();
        $scope.counter = 0;
        $scope.counterOpt = (parseInt(Math.random() * 4)) + 0;

        function generateQues() {
            questionSet = [];
            while (questionSet.length < 10) {
                var index = (parseInt(Math.random() * $scope.questions.length)) + 0;
                if (questionSet.indexOf(index) == -1) {
                    questionSet.push(index);
                }
            }
            return questionSet;
        }

        $scope.ques = generateOpt();

        function generateOpt() {
            options = [];
            while (options.length < 4) {
                var index = (parseInt(Math.random() * 4)) + 0;
                if (options.indexOf(index) == -1) {
                    options.push(index);
                }
            }
            return options;
        }
    }).error(function(data, status) {
        alert('json error!!')
    })

    $scope.pName = myFact.getName();
    $scope.optionSelected = function($event) {
        // console.log($event)
        // console.log($event.currentTarget.parentElement)
        // console.log(document.getElementsByClassName('optsAnC')[0])

        // to give blue background image on change of options
            for (var i = 0; i < 2; i++) {
                (document.getElementsByClassName('optsAnC')[i]).style.background = "url('images/optionAnC.png') no-repeat";
                (document.getElementsByClassName('optsBnD')[i]).style.background = "url('images/optionBnD.png') no-repeat";
            };
            $scope.selectedChoice = $event.currentTarget;
        if ($event.currentTarget.parentElement == (document.getElementsByClassName('optsAnC')[0]) ||
            ($event.currentTarget.parentElement == (document.getElementsByClassName('optsAnC')[1]))) {
            $event.currentTarget.parentElement.style.background = "url('images/selectedAnC.png') no-repeat"
            // console.log($scope.selectedChoice)
        } else if ($event.currentTarget.parentElement == (document.getElementsByClassName('optsBnD')[0]) ||
            ($event.currentTarget.parentElement == (document.getElementsByClassName('optsBnD')[1]))) {
            $event.currentTarget.parentElement.style.background = "url('images/selectedBnD.png') no-repeat"

        }
      
    }




    $scope.locked = function() {
        var options = $scope.questions[$scope.quesIndex[$scope.counter]].options;




        if ($scope.selectedChoice == undefined) {
            alert('Please select an option!!')
        } else {
            // console.log($scope.isDisabled);
            // console.log(!$scope.isDisabled);

            //for making correct option as green
            $scope.isDisabled = true; //for disabling the options once selected and locked

            //for showing and giving green color to the correct ans despite question selected is right or wrong.
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (document.querySelectorAll('[class^="opts"]')[i].children[0].innerHTML.substring(3) == options[j].content && options[j].correct == "true") {
                        if (document.querySelectorAll('[class^="opts"]')[i] == (document.getElementsByClassName('optsAnC')[0]) ||
                            (document.querySelectorAll('[class^="opts"]')[i] == (document.getElementsByClassName('optsAnC')[1]))) {
                            document.querySelectorAll('[class^="opts"]')[i].style.background = "url('images/correctAnC.png') no-repeat";
                        } else if (document.querySelectorAll('[class^="opts"]')[i] == (document.getElementsByClassName('optsBnD')[0]) ||
                            (document.querySelectorAll('[class^="opts"]')[i] == (document.getElementsByClassName('optsBnD')[1]))) {
                            document.querySelectorAll('[class^="opts"]')[i].style.background = "url('images/correctBnD.png') no-repeat";
                        }
                    }
                };

            };
             //for prohibiting the function to set points and other displays to wrong answer, thus setting the flag

            for (var i = 0; i < options.length; i++) {
                var flag;
                // console.log($scope.selectedChoice.innerHTML.substring(3))
                if ($scope.selectedChoice.innerHTML.substring(3) == options[i].content && options[i].correct == "true") {
                    flag = 1;
                    /*setting the flag to stop execution after checking the correct choice has been checked*/
                    break;

                } else {
                    flag = 0;
                };
            };
            if (flag == 1) {
                myFact.setPoints(100000);
                $scope.pointsEarned = myFact.getPoints();
                document.getElementById('rightWrong').style.display = "block";
                document.getElementById('rightWrong').src = "images/rightSign.png";
                document.getElementById('nextQues').style.display = "block";
                document.getElementById('gameOver').style.display = "none";

                //for checking the selected option is correct and making it green
                document.getElementById('fiftyLeft').style.display = "none";
                    document.getElementById('fiftyUsed').style.display = "inline";
                    document.getElementById('audienceLeft').style.display = "none";
                    document.getElementById('audienceUsed').style.display = "inline";

                // console.log($scope.selectedChoice.innerHTML.substring(3))

                //condition to go to gameWonPage on reaching 10 lac points
                if ($scope.pointsEarned == 1000000) {
                    $location.path('/gameWonPage');
                }

            } else {
                document.getElementById('rightWrong').style.display = "block";
                document.getElementById('rightWrong').src = "images/wrongSign.png";
                document.getElementById('gameOver').style.display = "block";
                document.getElementById('nextQues').style.display = "none";

                //for making selected wrong option as red

                if ($scope.selectedChoice.parentElement == (document.getElementsByClassName('optsAnC')[0]) ||
                    ($scope.selectedChoice.parentElement == (document.getElementsByClassName('optsAnC')[1]))) {
                    $scope.selectedChoice.parentElement.style.background = "url('images/wrongAnC.png') no-repeat";
                    document.getElementById('fiftyLeft').style.display = "none";
                    document.getElementById('fiftyUsed').style.display = "inline";
                    document.getElementById('audienceLeft').style.display = "none";
                    document.getElementById('audienceUsed').style.display = "inline";
                } else if ($scope.selectedChoice.parentElement == (document.getElementsByClassName('optsBnD')[0]) ||
                    ($scope.selectedChoice.parentElement == (document.getElementsByClassName('optsBnD')[1]))) {
                    $scope.selectedChoice.parentElement.style.background = "url('images/wrongBnD.png') no-repeat"
                        // console.log($scope.selectedChoice.innerHTML.substring(3))

                    document.getElementById('fiftyLeft').style.display = "none";
                    document.getElementById('fiftyUsed').style.display = "inline";
                    document.getElementById('audienceLeft').style.display = "none";
                    document.getElementById('audienceUsed').style.display = "inline";

                }

            };
            document.getElementById('lock').style.display = "none";
            document.getElementById('quit').style.display = "none";
            //to hide audience poll if it's shown
            document.getElementById("audPoll").style.display = "none";
            document.getElementsByClassName("rightOrWrong")[0].style.display = "block";
            document.getElementsByClassName("nextOrStop")[0].style.display = "block";
            
            //for animating question and options on moving to next ques (code contibued in nextQues())
            document.getElementsByClassName("question")[0].className="question";
            console.log(document.getElementsByClassName('optsAnC'))
            document.getElementsByClassName('optsAnC')[0].className="optsAnC"
            document.getElementsByClassName('optsAnC')[1].className="optsAnC"
            document.getElementsByClassName('optsBnD')[0].className="optsBnD"
            document.getElementsByClassName('optsBnD')[1].className="optsBnD"
            

        }

    }


    var flagFifty = 0;
    $scope.applyFifty = function() {
        var options = $scope.questions[$scope.quesIndex[$scope.counter]].options;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (document.querySelectorAll('[class^="opts"]')[i].children[0].innerHTML.substring(3) == options[j].content && options[j].fifty == "false") {
                    document.querySelectorAll('[class^="opts"]')[i].children[0].style.display= "none"
                }
            }
        };
        document.getElementById('fiftyLeft').style.display = "none";
        document.getElementById('fiftyUsed').style.display = "inline";
        flagFifty = 1;

    }

    var flagAud = 0;
    $scope.applyAudience = function() {
        document.getElementById('audienceLeft').style.display = "none";
        document.getElementById('audienceUsed').style.display = "inline";
        // console.log(document.getElementById("audPoll"))
        flagAud = 1;
        /*converting percentage of audience opinion from json  to pixels*/
        var audienceAdvice1 = (($scope.questions[$scope.quesIndex[$scope.counter]].options[$scope.ques[0]].audience) / 100) * 300;
        var audienceAdvice2 = (($scope.questions[$scope.quesIndex[$scope.counter]].options[$scope.ques[1]].audience) / 100) * 300;
        var audienceAdvice3 = (($scope.questions[$scope.quesIndex[$scope.counter]].options[$scope.ques[2]].audience) / 100) * 300;
        var audienceAdvice4 = (($scope.questions[$scope.quesIndex[$scope.counter]].options[$scope.ques[3]].audience) / 100) * 300;

        var cnvs = document.getElementById("audPoll");
        // console.log(document.getElementsByClassName("rightOrWrong")[0])
        document.getElementsByClassName("rightOrWrong")[0].style.display = "none";
        document.getElementsByClassName("nextOrStop")[0].style.display = "none";
        cnvs.style.display = "block";

        var context = cnvs.getContext("2d");
        var grd = context.createLinearGradient(0, 0, 200, 0);
        grd.addColorStop(0, "#7B3C7B");
        grd.addColorStop(1, "#EFCC79");

        context.font = "30px verdana";
        context.fillStyle = grd;
        context.fillText("Audience Poll", 120, 50)

        context.font = "20px verdana";

        context.fillStyle = "#8cf1f2";
        context.fillText("A.", 45, 118);
        context.strokeStyle = "white";
        context.fillStyle = grd;
        context.fillRect(75, 100, audienceAdvice1, 20);
        context.strokeRect(75, 100, 300, 20);

        context.font = "bold 15px verdana";
        context.fillStyle = "red";
        context.fillText($scope.questions[$scope.quesIndex[$scope.counter]].options[$scope.ques[0]].audience + "%", 315, 115);

        context.fillStyle = "#8cf1f2";
        context.fillText("B.", 45, 168);
        context.fillStyle = grd;
        context.fillRect(75, 150, audienceAdvice2, 20);
        context.strokeRect(75, 150, 300, 20);

        context.font = "bold 15px verdana";
        context.fillStyle = "red";
        context.fillText($scope.questions[$scope.quesIndex[$scope.counter]].options[$scope.ques[1]].audience + "%", 315, 165);


        context.fillStyle = "#8cf1f2";
        context.fillText("C.", 45, 218);
        context.fillStyle = grd;
        context.fillRect(75, 200, audienceAdvice3, 20);
        context.strokeRect(75, 200, 300, 20);

        context.font = "bold 15px verdana";
        context.fillStyle = "red";
        context.fillText($scope.questions[$scope.quesIndex[$scope.counter]].options[$scope.ques[2]].audience + "%", 315, 215);


        context.fillStyle = "#8cf1f2";
        context.fillText("D.", 45, 268);
        context.fillStyle = grd;
        context.fillRect(75, 250, audienceAdvice4, 20);
        context.strokeRect(75, 250, 300, 20);

        context.font = "bold 15px verdana";
        context.fillStyle = "red";
        context.fillText($scope.questions[$scope.quesIndex[$scope.counter]].options[$scope.ques[3]].audience + "%", 315, 265);

    }


    $scope.nextQues = function() {
        /*code for animating on going to next ques*/
            for (var j = 0; j < 4; j++) {
                    document.querySelectorAll('[class^="opts"]')[j].children[0].style.display= "block"
                }

        document.getElementsByClassName("question")[0].className="question flipInX";
        document.getElementsByClassName('optsAnC')[0].className="optsAnC bounceInLeft"
        document.getElementsByClassName('optsAnC')[1].className="optsAnC bounceInLeft"
        document.getElementsByClassName('optsBnD')[0].className="optsBnD bounceInRight"
        document.getElementsByClassName('optsBnD')[1].className="optsBnD bounceInRight"

        $scope.selectedChoice = null;
        $scope.isDisabled = false;  // For enabling the selection for the options shown for new question
        $scope.counter++;
        for (var i = 0; i < 2; i++) {
            (document.getElementsByClassName('optsAnC')[i]).style.background = "url('images/optionAnC.png') no-repeat";
            (document.getElementsByClassName('optsBnD')[i]).style.background = "url('images/optionBnD.png') no-repeat";
        };
        document.getElementById('rightWrong').style.display = "none";
        document.getElementById('nextQues').style.display = "none";
        document.getElementById('gameOver').style.display = "none";
        document.getElementById('lock').style.display = "inline-block";
        document.getElementById('quit').style.display = "inline-block";

        if (flagFifty == 0) {
            document.getElementById('fiftyLeft').style.display = "inline";
            document.getElementById('fiftyUsed').style.display = "none";
        } else {
            document.getElementById('fiftyLeft').style.display = "none";
            document.getElementById('fiftyUsed').style.display = "inline";
        }

        if (flagAud == 0) {
            document.getElementById('audienceLeft').style.display = "inline";
            document.getElementById('audienceUsed').style.display = "none";
        } else {
            document.getElementById('audienceLeft').style.display = "none";
            document.getElementById('audienceUsed').style.display = "inline";
        }
        // document.getElementById('fiftyLeft').style.display="inline";
        // document.getElementById('fiftyUsed').style.display="none";
        //  document.getElementById('audienceLeft').style.display="inline";
        // document.getElementById('audienceUsed').style.display="none";
        // console.log($scope.counter)
            // if($scope.counter==10){
            //    $location.path('/gameWonPage');
            // }
    }

    $scope.gameOver = function() {
        $location.path('/congoPage');
    }



    // $scope.disableFifty = function() {
    //     if (flagFifty==1){
    //         return true;    
    //     }
    //     else{
    //         return false;
    //     }

    // }

});

app.controller('congoPageController', function($scope, myFact, $location) {
    $scope.pName = myFact.getName();
    $scope.pointsEarned = myFact.getPoints()
    $scope.goToHome = function() {
        $scope.pointsEarned = myFact.setPoints(-$scope.pointsEarned);
        $location.path('/homePage');
        document.onkeydown = function() {
            return true;
        }

    }
})

app.controller('gameWonPageController', function($scope, myFact, $location) {
    $scope.pName = myFact.getName();
    $scope.pointsEarned = myFact.getPoints()
    $scope.goToHome = function() {
        $scope.pointsEarned = myFact.setPoints(-$scope.pointsEarned);
        $location.path('/homePage');
        document.onkeydown = function() {
            return true;
        }
    }
})