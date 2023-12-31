import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';
import messages from '../../scripts/messages.js';

// media query match that indicates mobile/tablet width
// const isDesktop = window.matchMedia('(min-width: 99999999px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector(
      "[aria-expanded='true']"
    );
    if (navSectionExpanded) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    }
    toggleMenu(nav, navSections);
    nav.querySelector('button').focus();
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections) {
  const expanded = nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = expanded ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded ? 'false' : 'true');
  button.setAttribute(
    'aria-label',
    expanded ? 'Open navigation' : 'Close navigation'
  );
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');

  navDrops.forEach((drop) => {
    if (!drop.hasAttribute('tabindex')) {
      drop.setAttribute('role', 'button');
      drop.setAttribute('tabindex', 0);
      drop.addEventListener('focus', focusNavSection);
    }
  });

  // enable menu collapse on escape keypress
  if (expanded) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    const replacedText = html.replace(/<li>(.*?)\((.*?)\)<\/li>/, (match, content, value) =>
      `<li class="${value}">${content}</li>`
    );
    nav.innerHTML = replacedText;;

    const classes = ['sections', 'tools'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) {
        section.classList.add(`nav-${c}`);
      }
    });
    const toolLogo = nav.querySelector('.nav-tools');
    const headlogo = document.createElement('a');
    const logoImg = document.createElement('img');
    headlogo.append(logoImg);
    const languageRegex = /\/(en)\//;  // 假设语言代码在 URL 中，例如 "/en/"
    const match = window.location.href.match(languageRegex);
    const currentPath = window.location.pathname;
    function updateLogo() {
      let logoSrc = '../../imgs/logo-blue.svg';
      if (window.innerWidth > 768) {
        if (currentPath === '/') {
          logoSrc = '../../imgs/white-logo.svg';
          headlogo.href = match ? '/en/' : '/';
        }
      }
      logoImg.src = logoSrc;
      if (window.innerWidth <= 768) {
        headlogo.href = match ? '/en/' : '/';
      }
    }
    updateLogo();
    window.addEventListener('resize', updateLogo);
    window.addEventListener('scroll', updateLogo);
    headlogo.setAttribute('sc:linkname', `global header|navigation|${messages.home}`);
    toolLogo.append(headlogo);
    const navSections = nav.querySelector('.nav-sections');
    navSections.children[0].classList.add('nav-anchor');
    navSections.children[1].classList.add('nav-pathlink');

    if (navSections) {
      navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
        if (navSection.querySelector('ul'))
          navSection.classList.add('nav-drop');
        navSection.addEventListener('click', () => {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      });
    }

    // hamburger for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('nav-hamburger');
    hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
          <span class="nav-hamburger-icon"></span>
        </button>`;
    hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
    nav.append(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    nav.addEventListener('change', () => toggleMenu(nav, navSections));
    decorateIcons(nav);
    const navWrapper = document.createElement('div');
    navWrapper.classList.add('nav-wrapper');
    navWrapper.append(nav);
    block.textContent = '';
    block.append(navWrapper);
  }
}
