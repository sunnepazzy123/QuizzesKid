//Get the Elements from the html body
const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");

const loader = document.getElementById('loader');
const game = document.getElementById('game');

// console.log(question, "question")
// console.log(choices, "choices")
//Declarations of Variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
//Set Questions to Empty Array
let questions = [];
//Retrieve a request from a Local Json file or Restful Api
setTimeout(()=>{

    fetch("questions.json").then(res=>  { 
        // console.log(res);
        return res.json(); 
    }).then( loadedQuestions => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        //Game Start
        startGame();
    }).catch( err=>{
        console.error(err);
    });

}, 1000);
  



//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

//Method to Start the Game
const startGame = ()=>{

    questionCounter = 0;
    score = 0;
    //Make use of Spread Operator => Make a copy of the orginal Question array
    availableQuesions = [...questions];
    // console.log(availableQuesions, "Available Questions");
    //Call the getNewQuestion Function
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');

}

//Methodto handle getQuestions
getNewQuestion = () => {
    //When no more qestions available in the available question
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //Set the Updated score to the local store
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
     //Update the css progress bar dynamically using javascript
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    //Pick random question index from the available question
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    //Set the Current Question Object to the the Available Question Index
    currentQuestion = availableQuesions[questionIndex];
    // console.log(currentQuestion, "Current Question");
    //Set the Question (#id) in the Html using innerText to the newly Current Question 
    question.innerText = currentQuestion.question;
    //Loop into the choices Array from the list of Array
    choices.forEach((choice) => {
        //Set each choice dataset attribute to the number variable
        const number = choice.dataset['number'];
        //Set the choice html innerText to the newly current Question
        choice.innerText = currentQuestion['choice' + number];
    });
    //Remove the randomly picked question out of the Available Question Array
    availableQuesions.splice(questionIndex, 1);
    //Set this each time we start a game
    acceptingAnswers = true;
};

//Set and action the Game
//Loop into each choices and attach a listener to the click event
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        //return nothing when it is false 
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        // console.log(selectedAnswer == currentQuestion.answer)
        // Setting a Css class variable using Javascript conditional statements
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        //If correct answer, Call the IncrementScore function
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
          }


        // Setting a Css class variable using DOM
      selectedChoice.parentElement.classList.add(classToApply);
        //Delay action after 1s
      setTimeout(() => {
        // Remove a Css class variable using DOM
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);






    });
});
//Increment the Score when 
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };




//LOCALLY QUESTIU
//   fetch("questions.json").then(res=>  { 
//     // console.log(res);
//     return res.json(); 
// }).then( loadedQuestions => {
//     console.log(loadedQuestions);
//     questions = loadedQuestions;
//     //Game Start
//     startGame();
// }).catch( err=>{
//     console.error(err);
// });



//RestFul Api Implementation
// fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
//     .then((res) => {
//         return res.json();
//     })
//     .then((loadedQuestions) => {
//         questions = loadedQuestions.results.map((loadedQuestion) => {
//             const formattedQuestion = {
//                 question: loadedQuestion.question,
//             };

//             const answerChoices = [...loadedQuestion.incorrect_answers];
//             formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
//             answerChoices.splice(
//                 formattedQuestion.answer - 1,
//                 0,
//                 loadedQuestion.correct_answer
//             );

//             answerChoices.forEach((choice, index) => {
//                 formattedQuestion['choice' + (index + 1)] = choice;
//             });

//             return formattedQuestion;
//         });

//         //Start The Game Method
//         startGame();

//         console.log(questions)
//     })
//     .catch((err) => {
//         console.error(err);
//     });