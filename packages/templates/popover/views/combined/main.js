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
import "./sources/demo/templates_popover_demo-main.js";
import "./sources/variations/templates_popover_variations-main.js";
import "./sources/interactive/templates_popover_interactive-main.js";
import "./sources/doc/templates_popover_doc-main.js";