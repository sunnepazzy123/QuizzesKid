const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
//Retrieve data using Local Storage in Json format
const mostRecentScore = localStorage.getItem('mostRecentScore');
//Dynamically update final score to recent score
finalScore.innerText = mostRecentScore;


// localStorage.setItem("highScores", JSON.stringify([]));
//Retrieve Highscore key value from Local Storage conditionally
//Converting the Json to Object
const highScores = JSON.parse(localStorage.getItem("highScores") ) || [];
console.log(highScores )



//Add event listener to username input field
username.addEventListener('keyup', (e) => {
    // console.log(e.target.value)
    //Remove disable attribute on the saveButton Element
    saveScoreBtn.disabled = !username.value;
});
//Method to save User Final Score per Game
saveHighScore = (e) => {
    console.log("you clicked this button");
    e.preventDefault();

    //Set mostRecntScore to user score per game
const score = {
    score: mostRecentScore,
    username: username.value
};

const MAX_HIGH_SCORES = 5;
//Push the score object into the Highscores Array
highScores.push(score)
//Sort the highscore by comparing the score key value from the score variable
highScores.sort( (a, b)=> b.score - a.score);
//Take the first 5 out of the array
highScores.splice(MAX_HIGH_SCORES);

localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign("/")

console.log(highScores);



};

