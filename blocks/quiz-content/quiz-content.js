import { decorateIcons } from '../../scripts/lib-franklin.js';
export default function decorate(block) {
  decorateIcons(block);

  const classes = ['score', 'caption', 'score-list','remark'];
  [...classes].forEach((c, i) => {
    const section = block.children[i];
    const scoreWrapper = block.querySelector('.quiz-conent-score > div');
    if (section) {
      section.classList.add(`quiz-conent-${c}`);
      if(section == 1) {
        console.log(111);
        console.log(scoreWrapper.children[2]);
      }
    }
  });

}


