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
var allHighscores = JSON.parse(localStorage.getItem("userInitials"));

// Array of objects for each question. Answer options are an array of their own within the object.
var questions = [
  {
    q: "What symbols indicate that you're defining an object?",
    a: ["( )", "[ ]", "{ }"],
    correct: "{ }",
  },

  {
    q: "Is 'textContent' a property or a function?",
    a: ["Property", "Function", "Both"],
    correct: "Property",
  },

  {
    q: "How often should you push new commits to Github?",
    a: ["Only after each time you define a new variable", "As often as possible", "Only once at the end of your project"],
    correct: "As often as possible",
  },

  {
    q: "Who is the smartest & most helpful TA in this bootcamp?",
    a: ["Ryan", "Zac", "I would sooner die than choose between them"],
    correct: "I would sooner die than choose between them",
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
  var newHighscore = {
  player: userInitials,
  score: currentScore};
  
  allHighscores.push(newHighscore);

  localStorage.setItem("userInitials", JSON.stringify(allHighscores));
};

// Display highscores from local storage when "View Highscores" button is clicked
viewHighscores.addEventListener("click", function(){
  header.textContent = "Highscores";
  var storedScores = JSON.parse(localStorage.getItem("userInitials"));
  
  for (var i = 0; i < storedScores.length; i++) {
    var highscoreText = document.createElement("p");
    highscoreText.textContent = storedScores[i].player + ": " + storedScores[i].score;
    content.appendChild(highscoreText);
  }
  console.log(storedScores);
});

// Shows the "game over" message when user runs out of time & prompts them to enter their initials
function gameOver() {
  header.textContent = "";
  content.textContent = "";
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