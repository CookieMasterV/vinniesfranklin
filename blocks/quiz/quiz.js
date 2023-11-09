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
    <input type="range" id="range${i}" class="range-slider" min="0" max="4" step="1">
    <p class="range-slider__value">没有</p>
    `;
  });
  const submitbtn = block.children[1].children[0];
  submitbtn.id = 'score-submit';
  const inputrange = document.querySelectorAll('.range-slider');
  const showvalue = document.querySelectorAll('.range-slider__value');
  inputrange.forEach((input, i) => {
    input.addEventListener('input', (event) => {
      const value = parseInt(event.target.value, 10);
      const currentURL = window.location.href;
      const languageRegex = /\/(en)\//;
      const match = currentURL.match(languageRegex);
      if (value === 0) {
        if(match) {
          showvalue[i].textContent = 'NO';
        } else {
          showvalue[i].textContent = '没有';
        }
      } else if (value === 1) {
        if(match) {
          showvalue[i].textContent = '1-2 DAYS';
        } else {
          showvalue[i].textContent = '1-2 天';
        }
      } else if (value === 2) {
        if(match) {
          showvalue[i].textContent = '3-4 DAYS';
        } else {
          showvalue[i].textContent = '3-4 天';
        }
      } else if (value === 3) {
        if(match) {
          showvalue[i].textContent = '5-6 DAYS';
        } else {
          showvalue[i].textContent = '5-6 天';
        }
      } else if (value === 4) {
        if(match) {
          showvalue[i].textContent = 'EVERY DAY';
        } else {
          showvalue[i].textContent = '每天';
        }
      }
    });
  });
  function gitAllValues() {
    const rangeInputs = document.querySelectorAll('.range-slider');
    const rangeValues = [];
    rangeInputs.forEach((input) => {
      const value = input.value;
      rangeValues.push(value);
      rangeValues.map(Number);
    });
    const valueArr = rangeValues.map(Number)
    const total = eval(valueArr.join("+"));
    console.log(total);
  }
  submitbtn.addEventListener('click', () => {
    gitAllValues();
  });

}
