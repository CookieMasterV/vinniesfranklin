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
  const currentURL = window.location.href;
  const languageRegex = /\/(en)\//;
  const regex = /^\/$/;
  const isMatch = regex.test(window.location.pathname);
  console.log(isMatch);
  const match = currentURL.match(languageRegex);
  console.log(window.location.pathname);
  [...classes].forEach((c, i) => {
    const section = block.children[i];
    if (section) {
      section.classList.add(`hero-${c}`);
      if (i === 0) {
        const logo = document.createElement('a');
        const pic = section.querySelector('picture');
        if (match) {
          logo.href = '/en/';
        } else {
          logo.href = '/';
        }
        if (pic) {
          logo.innerHTML = section.innerHTML
        } else {
          if(isMatch) {
            logo.innerHTML = '<img loading="lazy" alt="Logo" width="128" height="54" src="/imgs/white-logo.svg">';
          } else {
          logo.innerHTML = '<img loading="lazy" alt="Logo" width="128" height="54" src="/imgs/logo-blue.svg">';
          }
        }
        logo.setAttribute('sc:linkname', `global header|navigation|${messages.home}`);
        section.textContent = '';
        section.append(logo);
      }
    }
  });
}
