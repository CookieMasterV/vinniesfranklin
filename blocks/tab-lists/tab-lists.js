export default function decorate(block) {
  const firstUl = block.querySelector('.tab-lists ul:first-child');
  const secondUl = block.querySelector('.tab-lists ul:nth-child(2)');

  if (firstUl && secondUl) {
    const firstUlItems = firstUl.querySelectorAll('li');
    firstUl.appendChild(secondUl);
    firstUlItems.forEach((li, i) => {
      li.addEventListener('click', () => {
        block.classList.toggle('active');
      });
    });
  }

}
