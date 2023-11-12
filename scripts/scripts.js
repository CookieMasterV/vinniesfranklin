import {
  sampleRUM,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  toClassName,
  loadPopup,
} from './lib-franklin.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here
window.metaTitle = document.title.replace(' | RSV Uncovered', '');

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  if (window.location.pathname === '/') {
    document.body.classList.add('path-home');
  } else {
    document.body.classList.add(`path-${toClassName(window.location.pathname)}`);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  const popupDiv = document.createElement('div');
  document.body.appendChild(popupDiv);
  popupDiv.id = 'popup-wrapper';
  loadPopup(doc.querySelector('#popup-wrapper'));

  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;

  if (hash && element) {
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
  const goTop = doc.createElement('span');
  goTop.className = 'go-top icon iconfont icon-up';
  const footer = document.querySelector('.footer');
  window.addEventListener('scroll', () => {
    const footerRect = footer.getBoundingClientRect();
    const isAboveFooter = footerRect.top > window.innerHeight;
    const topMargin = isAboveFooter
      ? '10%'
      : `calc(${footer.offsetHeight + 34}px)`;
      console.log(footer.offsetHeight);
    goTop.style.bottom = topMargin;
  });

  goTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  doc.body.append(goTop);

  if (document.querySelector('a[href$=".pdf"]')) document.querySelector('a[href$=".pdf"]').setAttribute('target', '_blank');

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/imgs/favicon.png`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));

  // Load reviews logic
  if (window.location.hostname.endsWith('.hlx.page')
    || window.location.hostname.endsWith('.hlx.reviews')
    || window.location.hostname.endsWith('.hlx.live')
    || window.location.hostname.endsWith('.web.pfizer')) {
    await import(`${window.hlx.cmsBasePath}/tools/sidekick/sidekick.js`);
  }
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

export async function loadPage() {
  // handle 404 from document
  if (window.errorCode === '404') {
    const resp = await fetch('/global/404.plain.html');
    if (resp.status === 200) {
      const html = await resp.text();
      const main = document.querySelector('main');
      main.innerHTML = html;
      const btn = main.querySelector('a');
      btn.setAttribute('sc:linkname', `${window.metaTitle}|navigation|${btn.innerText}`);
    }
    document.querySelector('body').classList.add('path-error');
  }

  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
