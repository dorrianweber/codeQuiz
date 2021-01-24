// Setting up global variables for all parts of the page I'll need to use
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var header = document.querySelector("#header");
var content = document.querySelector("#content");
var pageBody =  document.querySelector("#pageBody");
var buttonSection = document.querySelector(".center");
var scoreDisplay = document.querySelector("#score-display");
var viewHighscores = document.querySelector("#view-hs");

// Variables necessary for timer, score, and questions array functionality
var secondsLeft = 10;
var qIndex = 0;
var currentScore = 0

// Array of objects for each question. Answer options are an array of their own within the object.
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

    if(secondsLeft === 0 || secondsLeft < 0) {
      clearInterval(timerInterval);
      gameOver();
    }
}, 1000)};

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

// Checks if user's answer is correct
function compareAnswers(event) {

  // Creates a "next" button when user clicks on one of the answer options 
  if (event.target.matches("button")) {
    buttonSection.innerHTML = "";
    var nextButton = document.createElement("button");
    buttonSection.appendChild(nextButton);
    nextButton.textContent = "Next";

    // Shows next question when "next" button is clicked
    nextButton.addEventListener("click", function() {
    qIndex ++;
    header.innerHTML = "";
    content.innerHTML = "";
    displayQuestion();
  })};
  
  // If chosen answer is correct, user gains a point and 3 seconds on the clock
  if (event.target.textContent === questions[qIndex].correct) {
    currentScore += 1;
    secondsLeft += 3;
  }
  
  // If incorrect, user loses 3 seconds
  else {
    secondsLeft -= 3;
  };

  // Shows the user's current score on the top of the page
  scoreDisplay.textContent = "Current score: " + currentScore;

};

// Puts user's initials & score in local storage
function storeScore (userInitials) {
  localStorage.setItem(userInitials, currentScore);
};

// Display highscores from local storage when "View Highscores" button is clicked
viewHighscores.addEventListener("click", function(){
  header.textContent = "Highscores";
  var storedScores = json.stringify(localStorage.getItem(userInitials));
  content.textContent = storedScores;
  console.log(storedScores);
});

// Shows the "game over" message when user runs out of time & prompts them to enter their initials
function gameOver() {
  header.textContent = "";
  content.innerHTML = "";
  buttonSection.innerHTML = "";
  var userInitials = prompt("Thanks for playing! Enter your initials to save your score.");
  storeScore(userInitials);
};

// Clears intro text content & starts the timer when user hits "start" button
startBtn.addEventListener("click", function() {
  content.innerHTML = "";
  buttonSection.innerHTML = "";
  setTime();
});