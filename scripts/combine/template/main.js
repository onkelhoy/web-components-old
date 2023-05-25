import "@circular-tools/doc";


window.onload = () => {
  document.querySelectorAll('header li').forEach(li => {

      li.onclick = () => {
          document.querySelector('li.selected').className = '';
          document.querySelector('section.selected').className = '';
          li.className = 'selected';
          document.querySelector(`section[data-tab="${li.getAttribute('data-tab')}"]`).className = 'selected';
      }
  })
}