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
import "./sources/demo/templates_box_demo-main.js";
import "./sources/variations/templates_box_variations-main.js";
import "./sources/interactive/templates_box_interactive-main.js";
import "./sources/doc/templates_box_doc-main.js";