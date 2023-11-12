import { decorateIcons } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const classes = ['title', 'content', 'more'];
  [...classes].forEach((c, i) => {
    const section = block.children[i];
    if (section) {
      section.classList.add(`references-${c}`);
      if (i === 2) {
        const readmore = document.createElement('a');
        readmore.innerHTML = section.innerHTML;
        section.textContent = '';
        section.append(readmore);
      }
    }
  })
  decorateIcons(block);
  const refmore = block.children[2];
  refmore.querySelector('a').classList = 'read-more';
  if (block.querySelector('a')) {
    block.querySelectorAll('a').forEach((a) => {
      a.setAttribute('sc:linkname', `${window.metaTitle}|navigation|${a.innerText}`);
    });
  }
  const readMoreButton = block.querySelector('.read-more');
  function expandReferences() {
    const referencesContent = block.querySelector('.references-content');
    const readMoreButton = block.querySelector('.read-more');
    referencesContent.classList.add('view-all');
    readMoreButton.style.display = 'none';
  }
  readMoreButton.addEventListener('click', () => {
    expandReferences();
  }
  )
}
