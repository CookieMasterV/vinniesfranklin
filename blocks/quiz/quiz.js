export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = 'quiz-row';
  });
  const quizdiv = document.createElement('div');
  quizdiv.id = 'quiz';
  block.appendChild(quizdiv);
  const quizContainer = block.querySelector("#quiz");
  const quizRows = block.querySelectorAll(".quiz-row");
  if (quizContainer && quizRows.length > 1) {
    for (let i = 0; i < quizRows.length - 1; i++) {
      quizContainer.appendChild(quizRows[i]);
    }
  }
  const subbtn = block.children[0];
  if (subbtn !== quizContainer) {
    block.insertBefore(quizContainer, subbtn);
  }
  quizRows.forEach((quizRow, i) => {
    quizRow.innerHTML += `<input type="range" id="range${i}" class="range-slider" min="0" max="8" step="2">`;
  });
}
