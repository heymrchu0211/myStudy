let score = 0;
const game_time = 5;
let time = game_time;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDispaly = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
  buttonChange('게임로딩중...');
  getWords();
  wordInput.addEventListener('input', checkMatch);
}

function run() {
  if (isPlaying) { // 게임 도중에는 '게임중'버튼이 클릭되지 않도록 위한 조건문
    return;
  }
  isPlaying = true;
  time = game_time;
  wordInput.focus();
  scoreDispaly.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange('게임중');
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange('게임시작');
    clearInterval(checkInterval);
  }
}

function getWords() {
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
      response.data.forEach((word) => {
        if (word.length < 10) {
          words.push(word); // words을 선언할때 아무런 값을 할당하지않아 undifined였음.
        }
      })
      buttonChange('게임시작');

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = '';
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDispaly.innerText = score;
    time = game_time;
    const randomIndex = Math.floor(words.length * Math.random()); // (words 배열의 길이) 곱하기 (0이상 1미만의 수)
    wordDisplay.innerText = words[randomIndex];
  }
}

function countDown() {
  time > 0 ? time-- : isPlaying = false;
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

function buttonChange(text) {
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}