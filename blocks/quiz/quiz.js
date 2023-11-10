import { decorateIcons } from '../../scripts/lib-franklin.js';
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
    <p class="days"><span>没有</span><span>1–2 天</span><span>3-4 天</span><span>5-6 天</span><span>每天</span></p>
    <p class="range-slider__value">没有</p>
    `;
  });
  const submitbtn = block.children[1].children[0];
  submitbtn.id = 'score-submit';
  const inputrange = document.querySelectorAll('.range-slider');
  const showvalue = document.querySelectorAll('.range-slider__value');
  inputrange.forEach((input, i) => {
    input.addEventListener('input', (event) => {
      const value = parseInt(event.target.value);

      const percentageValue = ((value) / (input.max - input.min)) * 100;
      input.style.background = `linear-gradient(to right, #0683ad 0%, #0683ad ${percentageValue}%, #fff 0%, #fff 100%)`;
      const newPosition = `calc(${percentageValue}% - 10px)`;
      showvalue[i].style.left = newPosition;
      updateContent(value, i);
    });
  });

  submitbtn.addEventListener('click', () => {
    const lastValues = Array.from(inputrange).map(input => parseInt(input.value));
    const totalScore = lastValues.reduce((sum, value) => sum + value, 0);
    const scoreSubmittedEvent = new CustomEvent('scoreSubmitted', { detail: { totalScore } });
    document.dispatchEvent(scoreSubmittedEvent);
    const scoreElement = document.getElementById('score');
    scoreElement.scrollIntoView({ behavior: 'smooth' });
  });
  function updateContent(value, i) {
    const currentURL = window.location.href;
    const languageRegex = /\/(en)\//;
    const match = currentURL.match(languageRegex);
    let content = '';
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
  }
  window.addEventListener("scroll", function () {
    const quizHead = document.querySelector(".quiz-head");
    const quizQuestions = document.querySelector(".quiz-questions");
    const scoreAnchor = document.getElementById("score");

    if (quizHead && quizQuestions) {
      const rectQuestions = quizQuestions.getBoundingClientRect();
      const rectScoreAnchor = scoreAnchor.getBoundingClientRect();

      const triggerFixedHeight = rectQuestions.top + window.scrollY;
      const cancelFixedHeight = rectScoreAnchor.top + window.scrollY;
      if (window.scrollY >= triggerFixedHeight && window.scrollY <= cancelFixedHeight) {
        quizHead.classList.add('fixed');
      } else {
        quizHead.classList.remove('fixed');
      }
    }
  });
}

