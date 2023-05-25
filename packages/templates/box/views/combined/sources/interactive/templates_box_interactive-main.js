import '@circular-tools/doc/wc';

let TARGET_ELEMENT = null;
const windowFunctemplates_box_interactive_load = () => {
  TARGET_ELEMENT = document.querySelector('section[data-tab="interactive"] doc-card > *');

  document.querySelectorAll('section[data-tab="interactive"] section.control *[name]').forEach(element => {
    const name = element.name;
    
    const defaultvalue = element.value;
    if (defaultvalue !== "")
    {
      update(name, defaultvalue);
    }

    element.addEventListener('change', event => {
      update(name, event.detail.value);
    })
  });
}

function update(name, value) {
  if (/html/i.test(name))
  {
    TARGET_ELEMENT.innerHTML = value;
  }
  else 
  {
    TARGET_ELEMENT.setAttribute(name, value);
  }
}
import "@circular-templates/box/wc";


window.addEventListener("load", windowFunctemplates_box_interactive_load)