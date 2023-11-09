import { decorateIcons } from '../../scripts/lib-franklin.js';
export default function decorate(block) {
  decorateIcons(block);

  const classes = ['score', 'caption', 'score-list','remark'];
  [...classes].forEach((c, i) => {
    const section = block.children[i];
    if (section) {
      section.classList.add(`quiz-conent-${c}`);
      if (i == 0) {
        const scoreWrapper = block.querySelector('.quiz-conent-score > div');
        scoreWrapper.children[2].classList.add('your-score');
      }
      if(i == 2) {
        const scoreListWrap = block.querySelector('.quiz-conent-score-list > div');
        scoreListWrap.children[0].classList.add ("scorewrap");
      }
    }
  });
  const showscore = document.querySelector('.your-score');
  console.log(showscore);
}


