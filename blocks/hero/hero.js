import { createResponsivePicture } from '../../scripts/lib-franklin.js';
import messages from '../../scripts/messages.js';

function setHeight() {
  const banner = document.querySelector('.multiple-cta');
  if (banner) {
    const textHeight = document.querySelector('.hero-container > .default-content-wrapper').offsetHeight;
    const img = banner.querySelector('.image-wrapper');
    if (window.innerWidth < 768) img.style.height = '';
    else img.style.height = `calc(100vh - ${textHeight + 77}px)`;
  }
}

window.addEventListener('resize', () => setHeight());

export default function decorate(block) {
  const classes = ['logo', 'bannerbg', 'info', 'ref'];
  [...classes].forEach((c, i) => {
    const section = block.children[i];
    if (section) {
      section.classList.add(`hero-${c}`);
      if (i === 0) {
        const logo = document.createElement('a');
        logo.href = '/';
        if (section.querySelector('picture')) logo.innerHTML = section.innerHTML;
        else logo.innerHTML = '<img loading="lazy" alt="Logo" width="128" height="54" src="/imgs/white-logo.svg">';
        logo.setAttribute('sc:linkname', `global header|navigation|${messages.home}`);
        section.textContent = '';
        section.append(logo);
      }
    }
  });
}
