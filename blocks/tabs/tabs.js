export default function decorate(block) {
  const classes = ['head', 'baby', 'child', 'adult'];
  [...classes].forEach((c, i) => {
    const section = block.children[i];
    if (section) {
      section.className = "tabs-info";
      section.classList.add(`tabs-${c}`);
      if (c !== 'head') {
        const children = section.children;
        if (children.length > 0) {
          children[0].classList.add(`tabs-trigger`);
        }
        if (children.length > 1) {
          const tabContent = children[1];
          children[1].classList.add(`tabs-content`);
          // Wrap the tab content in a div with class "content-wrap"
          const contentWrap = document.createElement('div');
          contentWrap.className = 'content-wrap';
          contentWrap.innerHTML = tabContent.innerHTML;
          tabContent.innerHTML = '';
          tabContent.appendChild(contentWrap);

          const ulElements = children[1].querySelectorAll('ul');
          ulElements.forEach((ul, index) => {
            ul.classList.add(`content-list-${index + 1}`);
          });
          const h6Elements = children[1].querySelectorAll('h6');
          h6Elements.forEach((h6, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<h6>${h6.textContent}</h6>`;
            const ul = ulElements[index];
            ul.insertBefore(listItem, ul.firstChild);
            h6.remove();
          });
        }

      }
    }
  });
  const tabsParent = block;
  const ulElement = document.createElement('ul');
  ulElement.className = 'tabs-triggers';
  const contentContainer = document.createElement('div');
  const contentwrap = document.createElement('div');
  contentwrap.className= 'content-wrap';
  contentContainer.className = 'tabs-contents';
  const tabInfoElements = tabsParent.querySelectorAll('.tabs-info');
  Array.from(tabInfoElements).slice(1).forEach((tabInfoElement, index) => {
    const liElement = document.createElement('li');
    liElement.className = 'tabs-trigger';
    liElement.innerHTML = tabInfoElement.querySelector('.tabs-trigger').innerHTML;
    ulElement.appendChild(liElement);
    const tabContent = tabInfoElement.querySelector('.tabs-content');
    contentContainer.appendChild(tabContent);
    if (index === 0) {
      liElement.classList.add('active');
      tabContent.style.display = 'block';
    }
  });
  tabsParent.appendChild(ulElement);
  tabsParent.appendChild(contentContainer);
  Array.from(tabInfoElements).slice(1).forEach((tabInfoElement) => {
    tabInfoElement.remove();
  });
  const triggers = document.querySelectorAll('.tabs-trigger');
  const contents = document.querySelectorAll('.tabs-content');

  triggers.forEach((trigger, index) => {
    const triggerId = `tab-trigger-${index + 1}`;
    trigger.setAttribute('id', triggerId);
    const contentId = `content-${index + 1}`;
    const content = contents[index];
    content.setAttribute('id', contentId);
    trigger.addEventListener('click', () => {
      contents.forEach((c) => {
        c.style.display = 'none';
      });
      content.style.display = 'block';
      triggers.forEach((otherTrigger) => {
        otherTrigger.classList.remove('active');
      });
      trigger.classList.add('active');
    });
  });
}
