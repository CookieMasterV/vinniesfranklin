export default function decorate(block) {
  const firstUl = block.querySelector('.tab-lists ul:first-child');
  const secondUl = block.querySelector('.tab-lists ul:nth-child(2)');
  const tabLinks = document.querySelectorAll('.tab-lists li a');
  const firstUlItems = firstUl.querySelectorAll('li');
  if (firstUl && secondUl) {
    const firstUlItems = firstUl.querySelectorAll('li');
    firstUl.appendChild(secondUl);
    firstUlItems.forEach((li) => {
      li.addEventListener('click', () => {
        block.classList.toggle('active');
      });
    });
  }
  const originalFirstUlContent = Array.from(firstUlItems).map(li => li.children[0]);
  console.log(originalFirstUlContent[0].getAttribute('title'));
  tabLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const clickedText = link.textContent;
      const clickedLink = link;
      const oricon = originalFirstUlContent[0].innerHTML;
      firstUlItems[0].querySelector('a').innerHTML = clickedText;
      originalFirstUlContent[0].innerHTML = link.innerHTML;
      originalFirstUlContent[0].innerHTML = firstUlItems[0].querySelector('a').innerHTML;
      clickedLink.innerHTML = oricon;
    });
  });

  window.addEventListener("scroll", fun);
  function fun() {
    let dom = document.querySelector(".path-symptoms")
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
