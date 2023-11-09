export default function decorate(block) {
  [...block.children].forEach((div) => {
    const hasOtherSiblings = div.nextElementSibling || div.previousElementSibling;
    if (div.children.length === 1
      && (div.querySelector('h1')
        || div.querySelector('h2')
        || div.querySelector('h3')
        || div.querySelector('h4')
        || div.querySelector('h5')
        || div.querySelector('h6'))) {
      div.className = 'title';
      if (hasOtherSiblings) {
        div.classList.add('highlight');
      }
    } else {
      div.className = 'body';
    }
  });

}

