import '@circular-tools/doc/wc';

let TARGET_ELEMENT = null;
window.onload = () => {
  TARGET_ELEMENT = document.querySelector('doc-controller > div > *');

  document.querySelectorAll('section.control *[name]').forEach(element => {
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