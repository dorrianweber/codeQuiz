var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var secondsLeft = 10;
var header = document.querySelector("#header");
var content = document.querySelector("#content");
var qIndex = 0;
var buttonSection = document.querySelector(".center");

// Array of objects, each object has an array within it
var questions = [
  {
    q: "Question 1",
    a: ["answer1", "answer2", "answer3"],
    correct: "answer3",
  },

  {
    q: "Question 2",
    a: ["answer1", "answer2", "answer3"],
    correct: "answer1",
  },
]


function setTime() {
  displayQuestion();
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
}, 1000)};

function displayQuestion() {
  header.textContent = questions[qIndex].q;
  
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

    var nextButton = document.createElement("button");

    buttonSection.appendChild(nextButton);
    nextButton.textContent = "Next";
}};

// function sendMessage() {
    
// };

startBtn.addEventListener("click", function() {
  content.innerHTML = "";
  buttonSection.innerHTML = "";
  setTime();
});