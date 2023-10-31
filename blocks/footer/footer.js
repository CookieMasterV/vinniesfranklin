import { readBlockConfig } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const footer = document.createElement('div');
    const html = await resp.text();

    block.innerHTML = html;
    const footerMainContent = document.createElement('div');
    footerMainContent.className = 'footer-main-content';

    block.append(footer);
    const footerblock = document.querySelector('.footer-info');
    const classes = ['head', 'list-logo', 'text', 'gcma'];
    [...classes].forEach((c, i) => {
      const section = footerblock.children[i];
      if (section) {
        section.className = 'footers-row';
        section.classList.add(`footer-${c}`);
      }
    });
    
    [...footerblock.children].forEach((row) => {
      [...row.children].forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) col.className = 'footer-logo';
      });
    })

    const listLogo = footerblock.querySelector('.footer-list-logo');
    const text = footerblock.querySelector('.footer-text');
    const gcma = footerblock.querySelector('.footer-gcma');
    footerblock.removeChild(listLogo);
    footerblock.removeChild(text);
    footerblock.removeChild(gcma);
    footerMainContent.appendChild(listLogo);
    footerMainContent.appendChild(text);
    footerMainContent.appendChild(gcma);
    footerblock.appendChild(footerMainContent);

    block.querySelectorAll('a').forEach((a) => {
      a.target = '_self';
      if (!a.getAttribute('sc:linkname')) a.setAttribute('sc:linkname', `global footer|navigation|${a.innerText}`);
    });
  }
}


