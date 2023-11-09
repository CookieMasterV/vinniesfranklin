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

  const totalScore = 5;
  const showScore = document.querySelector('.your-score');
  showScore.textContent = totalScore;
  const scores = document.querySelectorAll('.scorewrap li');

  if (totalScore >= 0 && totalScore <= 2) {
    scores[0].classList.add('active');
  } else if (totalScore >= 3 && totalScore <= 7) {
    scores[1].classList.add('active');
  } else if (totalScore >= 8 && totalScore <= 16) {
    scores[2].classList.add('active');
  } else if (totalScore >= 17 && totalScore <= 24) {
    scores[3].classList.add('active');
  } else if (totalScore >= 25 && totalScore <= 28) {
    scores[4].classList.add('active');
  }
  const linkscore = document.querySelector('.button-container a');
  if (totalScore >= 3 && totalScore <= 16) {
    linkscore.href = 'https://care4skincomhk-dev.web.pfizer/treatment/#如果屬-輕度至中度-的異位性皮膚炎';
  } else if (totalScore >= 17 && totalScore <= 28) {
    linkscore.href = 'https://care4skincomhk-dev.web.pfizer//treatment/#如果屬-中度至嚴重-的異位性皮膚炎';
  }
}


