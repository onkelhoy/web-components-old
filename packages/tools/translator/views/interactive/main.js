import '@circular-tools/doc/wc';

let TARGET_ELEMENT = null;
window.onload = () => {
  TARGET_ELEMENT = document.querySelector('doc-controller > div > *');

  document.querySelectorAll('section.control *[name]').forEach(element => {
    const name = element.name;
    
    const defaultvalue = element.value;

    if (defaultvalue !== "")
    {
      update(name, defaultvalue, element);
    }

    element.addEventListener('change', event => {
      update(name, event.detail.value, element);
    })
  });
}

function update(name, value, element) {

  if (/slot-/i.test(name))
  {
    const targetslot = TARGET_ELEMENT.querySelector(`div[data-slotname="${element.getAttribute("data-slotname")}"]`);
    if (targetslot)
    {
      targetslot.innerHTML = value;
    }
  }
  else 
  {
    TARGET_ELEMENT.setAttribute(name, value);
  }
}
import "@circular-tools/translator/wc";
