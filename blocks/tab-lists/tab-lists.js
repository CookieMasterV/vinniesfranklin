import { decorateIcons } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  decorateIcons(block);
  const firstUl = block.querySelector('.tab-lists ul:first-child');
  const secondUl = block.querySelector('.tab-lists ul:nth-child(2)');
  const tabLinks = document.querySelectorAll('.tab-lists li a');
  const firstUlItems = firstUl.querySelectorAll('li');
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
        // block.classList.toggle('active');
        console.log(block.classList);
        const clickedLink = link.parentElement;
        const firstli = firstUl.querySelector('li');
        const tempInnerHTML = firstli.innerHTML;
        firstli.innerHTML = clickedLink.innerHTML;
        clickedLink.innerHTML = tempInnerHTML;
        const targetAnchor = link.getAttribute('href').substring(1);
        console.log(targetAnchor);
        setTimeout(() => {
          const target = document.querySelector(link.getAttribute('href'));
          const offsetTop = target.offsetTop;
          console.log(offsetTop);
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }, 0);
      }

    });
  });

  const heroBanner = document.querySelector('.hero.banner-text');
  const tabLists = document.querySelector('.tab-lists');
  const handleScroll = () => {
    const heroBannerBottom = heroBanner.getBoundingClientRect().bottom;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const headerHeight = 73;
      if (heroBannerBottom <= headerHeight) {
        tabLists.classList.add('fixed');
      } else {
        tabLists.classList.remove('fixed');
      }
    } else {
      const heroBannerBottom = heroBanner.getBoundingClientRect().bottom;
      if (heroBannerBottom <= 0) {
        tabLists.classList.add('fixed');
      } else {
        tabLists.classList.remove('fixed');
      }
    }
  }
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
}
