//define variables
var questionEl = document.getElementById("question");
var startButton = document.getElementById("start");
var detailsEl = document.getElementById("details");
var highScoreEl = document.getElementById("high-scores");
var timerEl = document.getElementById("timer");
var answerListEl = document.getElementById("answer-list");
var startArea = document.getElementById("start-area");
var correctArea = document.getElementById("correct");
var spaceArea = document.getElementById("space-correct");
var questionNumber = 0;
var answer;
var elementAnswer;
var i = 0;
var scoreNum;
var scoreLog;
var secondsLeft = 75;
var interval;

//on click, the start button begins the quiz
startButton.addEventListener("click", startQuiz);

//when quiz starts, the timer counts down
function startQuiz() {
    firstQuestion()
    interval = setInterval(function() {
        secondsLeft--;
        var timeLeft = Math.floor(secondsLeft)
        timerEl.textContent = "Time remaining: " + timeLeft;
        
        stopQuiz();
    }, 1000)
}
//when no time remains, clear the space and correct area and show the "all done" page 
function stopQuiz() {
    if(secondsLeft <= 0) {
        clearInterval(interval);
        spaceArea.innerHTML = "";
        correctArea.innerHTML = "";
        allDone();
    }
}
//this is the page that display at the end of the game
function allDone() {
    questionEl.textContent = "All Done!";
    //your remaining time is your score
    scoreNum = secondsLeft;
    detailsEl.textContent = "Your final score is " + scoreNum + ".";
    answerListEl.innerHTML = "";
    //text box for the high score registry
    var labelEl = document.createElement("label");
    labelEl.textContent = "Enter Initials:     ";
    startArea.appendChild(labelEl);
    //input initials
    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "initials");
    startArea.appendChild(inputEl);
    //submit initials
    var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("class", "btn btn-warning");
    submitButton.textContent = "Submit";
    startArea.appendChild(submitButton);

    //on click, take initials and score and add to local storage
    submitButton.addEventListener("click", function(event) {
        event.preventDefault
        var initialsEl = document.getElementById("initials");
        var initials = initialsEl.value.trim();
        var scoreObject = {
            initials:initials,
            scoreNum:scoreNum
        };
        var allScores = JSON.parse(window.localStorage.getItem("allScores")) || [];
        allScores.push(scoreObject);
        window.localStorage.setItem("allScores", JSON.stringify(allScores));

        questionEl.textContent = "High Score!"
        startArea.innerHTML = "";
        var goBackButton = document.createElement("button");
        goBackButton.setAttribute("class", "btn btn-warning");
        goBackButton.textContent = "Go Back";
        startArea.appendChild(goBackButton);
        var clearButton = document.createElement("button");
        clearButton.setAttribute("class", "btn btn-warning");
        clearButton.textContent = "Clear";
        startArea.appendChild(clearButton);
        clearButton.addEventListener("click", function() {
            window.localStorage.removeItem("allScores");
            detailsEl.textContent = "";
        })

        goBackButton.addEventListener("click", goBackFunction);
    })

}
//on click, this function restarts the quiz ***ERROR HERE, NOT WORKING***
function goBackFunction() {
    startArea.innerHTML = "";
    startArea.appendChild(startButton);
    questionsEl.textContent = "Coding Quiz";
    detailsEl.textContent = "Try to answer the following code-related questions within the time limit."
    questionNumber = 0;
    secondsLeft = 75;
    timerEl.textContent = "Time remaining: 75";
    firstQuestion();

}
//on click, generate the questions to choose from
answerListEl.addEventListener("click", questionQuiz);

//after submitting your initials, high scores should be displayed  ***ERROR HERE, NOT WORKING***
highScoreEl.addEventListener("click", function(){
    questionEl.textContent = "High Score!";
    detailsEl.textContent = localStorage.getItem("scoreLog");
    var highScores = JSON.parse(window.localStorage.getItem("allScores"));
    console.log(highScores);
    for (i = 0; i < highScores.length; i++) {
        var liTag = document.createElement("li");
        liTag.innerHTML = highScores[i].initials + ": " + highScores[i].scoreNum;
        document.getElementById("high-scores").appendChild(liTag);
    }

    startArea.innerHTML = "";
    var goBackButton2 = document.createElement("button");
    goBackButton2.setAttribute("class", "btn btn-warning");
    goBackButton2.textContent = "Go Back";
    startArea.appendChild(goBackButton2);
    goBackButton2.addEventListener("click", goBackFunction);

})
//how the quiz works
function questionQuiz(event) {
    elementAnswer = event.target;
    if(questionNumber < questions.length && elementAnswer.matches("button") === true) {
        questionEl.textContent = questions[questionNumber].title;
        detailsEl.textContent = "";
        answerListEl.innerHTML = "";
        if(elementAnswer.textContent !== answer) {
            secondsLeft-=15;
            spaceArea.innerHTML = "<hr>";
            correctArea.innerHTML = "Wrong";
        }else if (elementAnswer.textContent === answer) {
            spaceArea.innerHTML = "<hr>";
            correctArea.innerHTML = "Correct!"
        }
        if(questionNumber < questions.length) {
            for(i = 0; i < questions[questionNumber].choices.length; i++) {
                var questionBtn = document.createElement("button");
                questionBtn.setAttribute("class", "btn btn-warning list-group-item");
                questionBtn.setAttribute("id", i);
                questionBtn.textContent = questions[questionNumber].choices[i];
                var newListItem = document.createElement("li");
                newListItem.appendChild(questionBtn);
                answerListEl.appendChild(newListItem);

            }
            answer = questions[questionNumber].answer;
        }
        questionNumber++;
    }else if(questionNumber === questions.length) {
        clearInterval(interval);
        spaceArea.innerHTML = "";
        correctArea.innerHTML = "";
        allDone();
    }
 }
//how the questions appear
 function firstQuestion() {
     questionEl.textContent = questions[questionNumber].title;
     detailsEl.textContent = "";
     answerListEl.setAttribute("class", "list-group");
     answerListEl.innerHTML = "";
     startArea.innerHTML = "";
     if(questionNumber < 1) {
        for(i = 0; i < questions[questionNumber].choices.length; i++) {
            var questionBtn = document.createElement("button");
            questionBtn.setAttribute("class", "btn btn-warning list-group-item");
            questionBtn.setAttribute("id", i);
            questionBtn.textContent = questions[questionNumber].choices[i];
            var newListItem = document.createElement ("li");
            newListItem.appendChild(questionBtn);
            answerListEl.appendChild(newListItem);
        }

        answer = questions[questionNumber].answer
        questionNumber++;
     }
 }
    