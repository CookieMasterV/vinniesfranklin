import { decorateIcons , isSvg, setSvg} from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  decorateIcons(block);
  const cols = [...block.children];
  block.classList.add(`cards-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    row.className = 'cards-row';
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        col.className = 'cards-img';
      } else {
        const fileName = col.innerText;
        if (block.classList.contains('cards-with-svg') && isSvg(fileName)) {
          col.innerHTML = setSvg(fileName);
          col.className = 'cards-img';
        } else {
          col.className = 'cards-text';
        }
      }
    });
  });
}
