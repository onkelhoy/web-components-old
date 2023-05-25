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
import "./sources/Radio/tools_doc_Radio-main.js";
import "./sources/card/tools_doc_card-main.js";
import "./sources/CodeBlock/tools_doc_CodeBlock-main.js";
import "./sources/input/tools_doc_input-main.js";
import "./sources/markdown/tools_doc_markdown-main.js";
import "./sources/ColorPickerInput/tools_doc_ColorPickerInput-main.js";
import "./sources/AtomicChip/tools_doc_AtomicChip-main.js";
import "./sources/controller/tools_doc_controller-main.js";
import "./sources/ColorPicker/tools_doc_ColorPicker-main.js";