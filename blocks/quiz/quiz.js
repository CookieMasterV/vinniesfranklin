import { decorateIcons } from '../../scripts/lib-franklin.js';
export let quizData = {
  totalScore: 0,
};
export const scoreSubmittedEvent = new Event('scoreSubmitted');
export default function decorate(block) {
  decorateIcons(block);
  [...block.children].forEach((row) => {
    row.className = 'quiz-row';
  });
  const quizdiv = document.createElement('div');
  quizdiv.id = 'quiz';
  block.appendChild(quizdiv);
  const quizContainer = block.querySelector("#quiz");
  const quizRows = block.querySelectorAll(".quiz-row");
  if (quizContainer && quizRows.length > 1) {
    for (var i = 0; i < quizRows.length - 1; i++) {
      quiz.appendChild(quizRows[i]);
    }
  }
  const subbtn = block.children[0];
  if (subbtn !== quizContainer) {
    block.insertBefore(quizContainer, subbtn);
  }

  const quizRowsv2 = quizContainer.querySelectorAll(".quiz-row");
  quizRowsv2.forEach((quizRowsv2, i) => {
    quizRowsv2.innerHTML += `
    <input type="range" id="range${i}" class="range-slider" min="0" max="4" step="1" value="0">
    <p class="range-slider__value">没有</p>
    `;
  });
  const submitbtn = block.children[1].children[0];
  submitbtn.id = 'score-submit';
  const inputrange = document.querySelectorAll('.range-slider');
  const showvalue = document.querySelectorAll('.range-slider__value');
  // let totalScore = 0;
  inputrange.forEach((input, i) => {
    input.addEventListener('input', (event) => {
      const value = parseInt(event.target.value);
      const currentURL = window.location.href;
      const languageRegex = /\/(en)\//;
      const match = currentURL.match(languageRegex);
      let content = '';
      const percentageValue = ((value) / (input.max - input.min)) * 100;
      input.style.background = `linear-gradient(to right, #0683ad 0%, #0683ad ${percentageValue}%, #fff 0%, #fff 100%)`;
      quizData.totalScore += value;
      const newPosition = `calc(${percentageValue}% - 10px)`;
      showvalue[i].style.left = newPosition;
      if (match) {
        switch (value) {
          case 0:
            content = 'NO';
            break;
          case 1:
            content = '1-2 DAYS';
            break;
          case 2:
            content = '3-4 DAYS';
            break;
          case 3:
            content = '5-6 DAYS';
            break;
          case 4:
            content = 'EVERY DAY';
            break;
        }
      } else {
        switch (value) {
          case 0:
            content = '没有';
            break;
          case 1:
            content = '1-2 天';
            break;
          case 2:
            content = '3-4 天';
            break;
          case 3:
            content = '5-6 天';
            break;
          case 4:
            content = '每天';
            break;
        }
      }
      showvalue[i].textContent = content;
    });
  });
  submitbtn.addEventListener('click', () => {
    console.log('Total Score: ' + quizData.totalScore);
    block.dispatchEvent(scoreSubmittedEvent);
  });
}

