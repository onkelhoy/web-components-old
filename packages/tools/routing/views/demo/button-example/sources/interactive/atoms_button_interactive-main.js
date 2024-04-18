import '@pap-it/system-doc';

let TARGET_ELEMENT = null;
const windowFuncatoms_button_interactive_load = () => {
  TARGET_ELEMENT = document.querySelector('pap-tab-content[id="interactive"] doc-controller > div > *');

  document.querySelectorAll('pap-tab-content[id="interactive"] section.control *[name]').forEach(element => {
    const name = element.name;
    const defaultvalue = element.value;

    if (defaultvalue !== "" && !element.hasAttribute('data-css-input')) {
      update(name, defaultvalue, element);
    }

    element.addEventListener('change', event => {
      update(name, event.detail.value, element);
    })
  });
}

function update(name, value, element) {
  if (element.hasAttribute('data-css-input')) {
    if (element.hasAttribute('data-init')) {
      TARGET_ELEMENT.style.setProperty(name, value);
    }
    else {
      element.setAttribute('data-init', 'true');
    }
  }
  else if (/slot-/i.test(name)) {
    const targetslot = TARGET_ELEMENT.querySelector(`pap-tab-content[id="interactive"] div[data-slotname="${element.getAttribute("data-slotname")}"]`);
    if (targetslot) {
      targetslot.innerHTML = value;
    }
  }
  else {
    TARGET_ELEMENT.setAttribute(name, value);
  }
}
import "@pap-it/button";


window.addEventListener("load", windowFuncatoms_button_interactive_load)