var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var header = document.querySelector("#header");
var content = document.querySelector("#content");
var pageBody =  document.querySelector("#pageBody");
var buttonSection = document.querySelector(".center");

var secondsLeft = 10;
var qIndex = 0;
var incorrectAnswers = 0;
var correctAnswers = 0;
var currentScore = 0;

var userScores = [];

// Array of objects, each object has an array within it
var questions = [
  {
    q: "Question 1",
    a: ["q1_a1", "q1_a2", "q1_a3"],
    correct: "a3",
  },

  {
    q: "Question 2",
    a: ["q2_a1", "q2_a2", "q2_a3"],
    correct: "a1",
  },

  {
    q: "Question 3",
    a: ["q3_a1", "q3_a2", "q3_a3"],
    correct: "a2",
  },

  {
    q: "Question 4",
    a: ["q4_a1", "q4_a2", "q4_a3"],
    correct: "a1",
  },
]

// Controls the timer in the top center of the page
function setTime() {
  displayQuestion();
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time left: " + secondsLeft + " seconds";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      gameOver();
    }
}, 1000)};

function storeScore () {
  localStorage.setItem("")
};

// Shows the "game over" message when user runs out of time
function gameOver() {
  var userInitials = prompt("Thanks for playing! Enter your initials to save your score.");
  storeScore();
}

// Shows user each question after they hit "start" & after clicking "next" after answering each question
function displayQuestion() {
  header.textContent = questions[qIndex].q;
  
  buttonSection.innerHTML = "";

  for (var i = 0; i < questions[qIndex].a.length; i++) {
    var answerButton = document.createElement("button");
    content.appendChild(answerButton);
    answerButton.textContent = questions[qIndex].a[i];
  }
  
  content.addEventListener("click", function(event) {
    compareAnswers(event);
  })
};

function compareAnswers(event) {
  if (event.target.matches("button")){
    console.log(event.target);
    buttonSection.innerHTML = "";
    var nextButton = document.createElement("button");
    buttonSection.appendChild(nextButton);
    nextButton.textContent = "Next";
  }

  nextButton.addEventListener("click", function() {
    qIndex ++;
    header.innerHTML = "";
    content.innerHTML = "";
    displayQuestion();
  });
};

// if (press incorrect answer) {
//  timer - 3 seconds;
//  incorrectAnswers ++;
//  incorrectAnswers --> local storage;
// }

// if (press correct answer) {
//  timer + 3 seconds;
//  correctAnswers ++;
//  correctAnswers --> local storage;
// }

// Clears intro text content & starts the timer when user hits "start" button
startBtn.addEventListener("click", function() {
  content.innerHTML = "";
  buttonSection.innerHTML = "";
  setTime();
});