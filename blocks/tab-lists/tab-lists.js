import { decorateIcons } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  decorateIcons(block);
  const firstUl = block.querySelector('.tab-lists ul:first-child');
  const secondUl = block.querySelector('.tab-lists ul:nth-child(2)');
  const tabLinks = document.querySelectorAll('.tab-lists li a');
  // const firstUlItems = firstUl.querySelectorAll('li');
  if (firstUl && secondUl) {
    const firstUlItems = firstUl.querySelectorAll('li');
    firstUl.appendChild(secondUl);
    firstUlItems.forEach((li) => {
      li.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          block.classList.toggle('active');
        }
      });
    });
  }
  tabLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (window.innerWidth < 992) {
        event.preventDefault();
        block.classList.toggle('active');
        const clickedLink = link.parentElement;
        const firstListItem = firstUl.querySelector('li');
        const firstli = firstUl.querySelector('li');
        const tempInnerHTML = firstli.innerHTML;
        firstli.innerHTML = clickedLink.innerHTML;
        clickedLink.innerHTML = tempInnerHTML;
        const targetAnchor = link.getAttribute('href').substring(1);
        console.log(targetAnchor);
        const targetElement = document.getElementById(targetAnchor);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  window.addEventListener("scroll", fun);
  function fun() {
    let dom = document.querySelector(".path-symptoms")
    if (dom) {
      let rect = dom.getBoundingClientRect();
      let topclassBox = document.querySelector(".tab-lists")
      if (rect.top < -900) {
        topclassBox.classList.add('fixed');
        topclassBox.style.top = 85;
      }
      if (rect.top > -900) {
        topclassBox.classList.remove('fixed');
        topclassBox.style.top = 85;
      }
    }
  }
}
