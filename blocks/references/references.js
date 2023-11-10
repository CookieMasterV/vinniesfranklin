import { decorateIcons } from '../../scripts/lib-franklin.js';

function expandReferences() {
  const referencesContent = document.querySelector('.references-content');
  const readMoreButton = document.querySelector('.read-more');
  console.log(referencesContent,readMoreButton);
  referencesContent.classList.add('view-all');
  readMoreButton.style.display = 'none';
}
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
  if (block.querySelector('a')) {
    block.querySelectorAll('a').forEach((a) => {
      a.setAttribute('sc:linkname', `${window.metaTitle}|navigation|${a.innerText}`);
      a.classList = "read-more";
    });
  }
  // expandReferences();
  const readMoreButton = block.querySelector('.read-more');
  readMoreButton.addEventListener('click', () => {
    expandReferences();
  }
  )
}


