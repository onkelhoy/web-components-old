// tools
import '@pap-it/system-doc';

// component
import '@pap-it/templates-field';

window.onload = () => {
  console.log('[demo]: window loaded');
  const field = document.querySelector('pap-field-template');

  document.querySelector('pap-button#error').onclick = () => {
    console.log(field.querySelector('input'))
    field.setValidity({
      valueMissing: true
    }, 'Excuse me but value is missing!', field.querySelector('input'))
  }

  document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    console.log(Array.from(formdata))
  }
}
