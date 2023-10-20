const questions = [
  {
    quetion: `Which two countries compete for cricket's "Ashes"?"`,
    answers: [
      { text: `India & Pakistan`, correct: false },
      { text: `England & Australia`, correct: true },
      { text: `South Africa & New Zealand`, correct: false },
      { text: `west indies vs netherlands`, correct: false },
    ]
  },

  {
    quetion: `What does the term "LBW" stand for in cricket?`,
    answers: [
      { text: `Lift Bat and Whack`, correct: false },
      { text: `Let's Behave Wickedly`, correct: false },
      { text: `Launch Ball Wicketwards`, correct: false },
      { text: `Leg Before Wicket`, correct: true },
    ],
  },

  {
    quetion: `Which of these is not a fielding position in cricket?`,
    answers: [
      { text: `Silly Mid On`, correct: false },
      { text: `Winded Willow`, correct: true },
      { text: `Fine Leg`, correct: false },
      { text: `Second Slip`, correct: false },
    ],
  },

  {
    quetion: `How many balls or deliveries are bowled in one over?`,
    answers: [
      { text: `8`, correct: false },
      { text: `5`, correct: false },
      { text: `6`, correct: true },
      { text: `7`, correct: false },
    ],
  },

  {
    quetion: `Who was the champion of the 2015 Cricket World Cup?`,
    answers: [
      { text: `India`, correct: false },
      { text: `Australia`, correct: true },
      { text: `England`, correct: false },
      { text: `New Zealand`, correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");

const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.quetion;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`Your scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Start Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
