import { decorateIcons } from '../../scripts/lib-franklin.js';
export default function decorate(block) {
  decorateIcons(block);

  const classes = ['score', 'caption', 'score-list', 'remark'];
  [...classes].forEach((c, i) => {
    const section = block.children[i];
    if (section) {
      section.classList.add(`quiz-conent-${c}`);
      if (i == 0) {
        const scoreWrapper = block.querySelector('.quiz-conent-score > div');
        scoreWrapper.children[2].classList.add('your-score');
      }
      if (i == 2) {
        const scoreListWrap = block.querySelector('.quiz-conent-score-list > div');
        scoreListWrap.children[0].classList.add("scorewrap");
      }
    }
  });
  const scores2 = document.querySelectorAll('.scorewrap>li');
  scores2[0].classList.add("active");
  const updateLinkScoreHref = () => {
    const totaltext = block.querySelector('.your-score').innerText;
    const totalScore = parseInt(totaltext, 10);
    const linkscore = document.querySelector('.button-container a');
    const currentDomain = window.location.origin;
    const currentURL = window.location.href;
    const languageRegex = /\/(en)\//;
    const match = currentURL.match(languageRegex);
    if (totalScore >= 0 && totalScore <= 16) {
      linkscore.href = `${currentDomain}${match ? '/en/treatment#serious' : '/treatment#serious'}`;
    } else if (totalScore >= 17 && totalScore <= 28) {
      linkscore.href = `${currentDomain}${match ? '/en/treatment#very-serious' : '/treatment#very-serious'}`;
    } else {
      linkscore.href = `${currentDomain}${match ? '/en/treatment' : '/treatment'}`;
    }
  }
  updateLinkScoreHref();
  function FormWorkflow(a, b, c) {
    const dataLayer = [];
    dataLayer.push({
      event: 'pfFormWorkflow',
      pfFormWorkflow: {
        formName: a,
        formAction: b,
        formPageLoad: c,
      },
    });
    const event = new CustomEvent('pfAnalytics', {
      detail: dataLayer,
    });
    document.querySelector('body').dispatchEvent(event);
  }
  document.addEventListener('scoreSubmitted', (event) => {
    const totalScore = event.detail.totalScore;
    const showScore = document.querySelector('.your-score');
    showScore.textContent = totalScore;
    const scores = document.querySelectorAll('.scorewrap>li');
    const currentURL = window.location.href;
    const languageRegex = /\/(en)\//;
    const match = currentURL.match(languageRegex);
    scores.forEach(score => score.classList.remove('active'));
    if (totalScore >= 0 && totalScore <= 2) {
      console.log(111);
      scores[0].classList.add('active');
    } else if (totalScore >= 3 && totalScore <= 7) {
      console.log(111);
      scores[1].classList.add('active');
    } else if (totalScore >= 8 && totalScore <= 16) {
      scores[2].classList.add('active');
    } else if (totalScore >= 17 && totalScore <= 24) {
      scores[3].classList.add('active');
    } else if (totalScore >= 25 && totalScore <= 28) {
      scores[4].classList.add('active');
    }
    updateLinkScoreHref();
    FormWorkflow('quizscore', 'successful', true)
  });

  const morebtn = block.querySelector('.quiz-conent-score-list .button-container a');
  let clickCount = 0;
  morebtn.addEventListener('click', () => {
    clickCount++;
    updateLinkName();
  })
  const updateLinkName = () => {
    morebtn.setAttribute('sc:linkname', `${window.metaTitle}|navigation|${morebtn.innerText}|clickCount:${clickCount}`);
  };
  linkbtn.addEventListener('click', () => {
    clickCount++;
    updateLinkName();
  });
  updateLinkName();
}


