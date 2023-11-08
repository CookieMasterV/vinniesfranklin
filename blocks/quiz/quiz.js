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
    <input type="range" id="range${i}" class="range-slider" min="0" max="8" step="2">
    <p class="range-slider__value">没有</p>
    `;
  });
  const submitbtn = block.children[1].children[0];
  submitbtn.id = 'score-submit';
  const rangeSlider = () => {
    const sliders = document.querySelectorAll('#quiz .quiz-row');
    sliders.forEach(slider => {
      const range = slider.querySelector('.range-slider');
      const value = slider.querySelector('.range-slider__value');
      value.innerHTML = range.value;
      range.addEventListener('input', () => {
        value.innerHTML = range.value;
      });
    });
  };
  rangeSlider();
}
