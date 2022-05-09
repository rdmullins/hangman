const alphabet = [
  "A", "B", "C", "D", "E", "F", "G", 
  "H", "I", "J", "K", "L", "M", "N",
  "O", "P", "Q", "R", "S", "T", "U",
  "V", "W", "X", "Y", "Z"
];

let word = "";

let guessedLetter = "";

let counter = 0;

let winCount = 1;


const hangman = () => {
// Activated by 'Start' button on page.
// Displays alphabet board, starts the drawing, and executes the API call
  buildAlphabetBoard();
  updateDrawing(0);
  fetch("https://random-word-api.herokuapp.com/word?length=6")
    .then(response => response.json())
    .then(function (dataObject) {
      word = dataObject[0];
      showBlanks(word);
  });
} 


const updateDrawing = (stage) => {
// Updates the hangman drawing canvas in stages
  let canvas = document.getElementById('hangman');
  if (canvas.getContext) {
  let ctx = canvas.getContext("2d")
    if (stage == 0) { // Draws the scaffold
      ctx.fillStyle = '#2E294E';
      ctx.fillRect(200, 10, 130, 20);
      ctx.fillRect(310, 20, 20, 170);
      ctx.fillRect(100, 190, 320, 50);      
    } else if (stage == 1) { // Adds the rope
      ctx.moveTo(230, 20);
      ctx.lineTo(230, 50);
      ctx.stroke();
    } else if (stage == 2) {  // Head
      ctx.beginPath();
      ctx.arc(230, 70, 20, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (stage == 3) {  // Body
      ctx.moveTo(230, 90);
      ctx.lineTo(230, 140);
      ctx.stroke();
    } else if (stage == 4) {  // Left arm
      ctx.moveTo(230, 100);
      ctx.lineTo(210, 105);
      ctx.stroke();
    } else if (stage == 5) {  // Right arm
      ctx.moveTo(230, 100);
      ctx.lineTo(250, 105);
      ctx.stroke();
    } else if (stage == 6) {  // Left leg
      ctx.moveTo(230, 140);
      ctx.lineTo(210, 160);
      ctx.stroke();
    } else { // Right leg and game over
      ctx.moveTo(230, 140);
      ctx.lineTo(250, 160);
      ctx.stroke();
      alert("Game Over! The mystery word was " + word + ".");
      location.reload(true);
    } 
  }}


const showBlanks = (wordIn) => {
  let e = document.getElementById("word-area");
  for (let i=0; i<=(5); i++) {
    let hangmanWord = document.createElement("div");
    hangmanWord.classList.add("letter-box");
    hangmanWord.id=("wordBox" + i);
    hangmanWord.innerText = "*";
    e.appendChild(hangmanWord);
  }
}


const buildAlphabetBoard = () => {
  for (let i=0; i<=25; i++) {
    let e = document.getElementById("alphabet");
    let letter = document.createElement("div");
    letter.innerText=(alphabet[i]);
    letter.classList.add("letter-box");
    letter.id = (alphabet[i]);
    letter.setAttribute("onclick", "guess(\"" + (alphabet[i]) + "\")");
    e.appendChild(letter);
  }
}


const showLetterInWord = (guessedLetter) => {
  let wordLowerCase = word.toLowerCase();
  guessedLetter = guessedLetter.toLowerCase();
  for (let i=0; i<=5; i++) {
    if (wordLowerCase[i] == guessedLetter) {
      let e = document.getElementById("wordBox"+i);
      e.innerText = guessedLetter.toUpperCase();
    }
  }
}


const guess = (letterPicked) => {
  guessedLetter = letterPicked.toLowerCase();
  let e = document.getElementById(letterPicked);
  if (word.includes(guessedLetter)) {
      e.classList.add("correct");
      showLetterInWord(letterPicked);
      winCount = winCount + 1;
      if (winCount == 6) {
        alert("You Win!");
        location.reload(true);
      }
      } else {
        e.classList.add("incorrect");
        e.removeAttribute("onclick");
        counter = counter + 1;
        updateDrawing(counter);
      }
}