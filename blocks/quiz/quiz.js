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
    const languageRegex = /\/(en)\//;
    const match = window.location.href.match(languageRegex);
    let daysLabels;
    if (match) {
      daysLabels = ['None', '1–2 Days', '3–4 Days', '5–6 Days', 'Every Day'];
    } else {
      daysLabels = ['没有', '1–2 天', '3–4 天', '5–6 天', '每天'];
    }
    quizRowsv2.innerHTML += `
      <input type="range" id="range${i}" class="range-slider" min="0" max="4" step="1" value="0">
      <p class="days">
        <span>${daysLabels[0]}</span>
        <span>${daysLabels[1]}</span>
        <span>${daysLabels[2]}</span>
        <span>${daysLabels[3]}</span>
        <span>${daysLabels[4]}</span>
      </p>
      <p class="range-slider__value">${daysLabels[0]}</p>
    `;
  });
  const submitbtn = block.children[1].children[0];
  const newLink = document.createElement('a');
  newLink.innerHTML = submitbtn.innerHTML;
  submitbtn.parentNode.replaceChild(newLink, submitbtn);
  const updatedSubmitbtn = newLink;
  updatedSubmitbtn.id = 'score-submit';
  const inputrange = document.querySelectorAll('.range-slider');
  const showvalue = document.querySelectorAll('.range-slider__value');
  const daysContainers = document.querySelectorAll('.quiz-row .days');
  function formWorkflowInput(a, b, c, d) {
    const dataLayer = [];
    dataLayer.push({
      event: 'pfFormWorkflowInput',
      pfFormWorkflowInput: {
        formName: a,
        formQuestion: b,
        formAnswer: c,
        formQuestionIndex: d,
      },
    });
    const event = new CustomEvent('pfAnalytics', {
      detail: dataLayer,
    });
    document.querySelector('body').dispatchEvent(event);
  }
  inputrange.forEach((input, i) => {
    input.addEventListener('input', (event) => {
      const value = parseInt(event.target.value);
      const percentageValue = ((value) / (input.max - input.min)) * 100;
      input.style.background = `linear-gradient(to right, #0683ad 0%, #0683ad ${percentageValue}%, #fff 0%, #fff 100%)`;
      let newPosition;
      if (value === 0) {
        newPosition = `calc(0% - 10px)`;
      } else if (value === 4) {
        newPosition = `calc(100% - 50px)`;
      } else {
        newPosition = `calc(${percentageValue}% - ${showvalue[i].offsetWidth / 2}px + 4px)`;
      }
      showvalue[i].style.left = newPosition;
      if (value === 0) {
        showvalue[0].style.left = -8;
      }
      updateContent(value, i);
      handleInput(input, daysContainers[i]);
      formWorkflowInput('quiz', i, value, i);
    });
    handleInput(input, daysContainers[i]);
  });
  function handleInput(input, daysContainer) {
    const value = parseInt(input.value);
    const spans = daysContainer.querySelectorAll('span');
    spans.forEach((span, index) => {
      span.style.opacity = index === value ? '0' : '1';
    });
  }
  let clickCount = 0;
  const linktext = updatedSubmitbtn.querySelector('h6');
  const updateLinkName = () => {
    updatedSubmitbtn.setAttribute('sc:linkname', `${window.metaTitle}|submit|${linktext.innerText}|clickCount:${clickCount}`);
  };
  updatedSubmitbtn.addEventListener('click', () => {
    clickCount++;
    const lastValues = Array.from(inputrange).map(input => parseInt(input.value));
    const totalScore = lastValues.reduce((sum, value) => sum + value, 0);
    const scoreSubmittedEvent = new CustomEvent('scoreSubmitted', { detail: { totalScore } });
    document.dispatchEvent(scoreSubmittedEvent);
    const scoreElement = document.getElementById('score');
    scoreElement.scrollIntoView({ behavior: 'smooth' });
    updateLinkName();
  });
  updateLinkName();
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
    if (document.querySelector('.quiz-head').parentNode.getBoundingClientRect().height >= document.querySelector('.quiz-questions').getBoundingClientRect().top) {
      quizHead.classList.add('fixed');
      quizHead.style.zIndex = 999;
      quizHead.style.opacity = 1;
    } else {
      quizHead.classList.remove('fixed');
    }
    if (document.querySelector('.quiz-questions').getBoundingClientRect().height + document.querySelector('.quiz-content').getBoundingClientRect().top <= window.scrollY) {
      quizHead.style.zIndex = -1;
      quizHead.style.opacity = 0;
    }
  });

}

