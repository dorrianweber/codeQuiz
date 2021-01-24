var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var header = document.querySelector("#header");
var content = document.querySelector("#content");
var pageBody =  document.querySelector("#pageBody");
var buttonSection = document.querySelector(".center");
var scoreDisplay = document.querySelector("#score-display")

var secondsLeft = 10;
var qIndex = 0;
var incorrectAnswers = 0;
var correctAnswers = 0;
var currentScore = 0

// Array of objects, each object has an array within it
var questions = [
  {
    q: "Question 1",
    a: ["q1_a1", "q1_a2", "q1_a3"],
    correct: "q1_a3",
  },

  {
    q: "Question 2",
    a: ["q2_a1", "q2_a2", "q2_a3"],
    correct: "q2_a1",
  },

  {
    q: "Question 3",
    a: ["q3_a1", "q3_a2", "q3_a3"],
    correct: "q3_a2",
  },

  {
    q: "Question 4",
    a: ["q4_a1", "q4_a2", "q4_a3"],
    correct: "q4_a1",
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
      content.innerHTML = "";
      header.textContent = "";
      gameOver();
    }
}, 1000)};

// Puts user's initials & score in local storage
function storeScore (userInitials) {
  localStorage.setItem(userInitials, currentScore);
};

// Shows the "game over" message when user runs out of time & prompts them to enter their initials
function gameOver() {
  var userInitials = prompt("Thanks for playing! Enter your initials to save your score.");
  storeScore(userInitials);
};

// Shows user each question after they hit "start" & after clicking "next" after answering each question
function displayQuestion() {
  header.textContent = questions[qIndex].q;
  
  buttonSection.innerHTML = "";

  for (var i = 0; i < questions[qIndex].a.length; i++) {
    var answerButton = document.createElement("button");
    content.appendChild(answerButton);

    answerButton.textContent = questions[qIndex].a[i];
    answerButton.addEventListener("click", function(event) {
      compareAnswers(event);
    }
  );
}};



// Creates a "next" button when user clicks on one of the answer options that moves onto the next quesiton
function compareAnswers(event) {

  if (event.target.matches("button")) {
    buttonSection.innerHTML = "";
    var nextButton = document.createElement("button");
    buttonSection.appendChild(nextButton);
    nextButton.textContent = "Next";

    nextButton.addEventListener("click", function() {
    qIndex ++;
    header.innerHTML = "";
    content.innerHTML = "";
    displayQuestion();
  })};

  console.log(event.target.textContent);
  console.log(questions[qIndex].correct);
  
  if (event.target.textContent === questions[qIndex].correct) {
    currentScore += 1;
  };

  scoreDisplay.textContent = "Current score: " + currentScore;
  
  console.log(qIndex);
  console.log(currentScore);

};

// Clears intro text content & starts the timer when user hits "start" button
startBtn.addEventListener("click", function() {
  content.innerHTML = "";
  buttonSection.innerHTML = "";
  setTime();
});




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