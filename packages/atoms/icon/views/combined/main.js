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
import "./sources/demo/atoms_icon_demo-main.js";
import "./sources/variations/atoms_icon_variations-main.js";
import "./sources/interactive/atoms_icon_interactive-main.js";
import "./sources/doc/atoms_icon_doc-main.js";