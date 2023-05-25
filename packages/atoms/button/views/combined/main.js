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
import "./sources/demo/atoms_button_demo-main.js";
import "./sources/variations/atoms_button_variations-main.js";
import "./sources/interactive/atoms_button_interactive-main.js";
import "./sources/doc/atoms_button_doc-main.js";