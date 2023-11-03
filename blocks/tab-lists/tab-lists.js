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
  window.addEventListener("scroll",fun);
  function fun() {
    let dom = document.querySelector(".path-symptoms")
    let rect = dom.getBoundingClientRect();

    let topclassBox = document.querySelector(".tab-lists")
    if(rect.top<-900){
      topclassBox.classList.add('fixed');
      topclassBox.style.top = 85;
    }
    if(rect.top>-900){
      topclassBox.classList.remove('fixed');
      topclassBox.style.top = 85;
    }
  }
}
