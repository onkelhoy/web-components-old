// tools
import '@pap-it/system-doc/wc';
import '@pap-it/input/wc';
import '@pap-it/checkbox/wc';
import '@pap-it/textarea/wc';
import '@pap-it/switch/wc';
import '@pap-it/button/wc';
// import '@pap-it/dropdown/wc';

// component
import '@pap-it/form/wc';

window.onload = () => {
  console.log('[demo]: window loaded');

  window.show_error.onclick = () => {
    window.form_error.showMessage("Im the error now!", "error");
  }
  window.show_success.onclick = () => {
    window.form_success.showMessage("Im the success now!", "success");
  }
  window.show_warning.onclick = () => {
    window.form_warning.showMessage("Im the warning now!", "warning");
  }

  document.querySelector('pap-input[name="a.a"]').setAttribute('customWarning', JSON.stringify({
    valueMissing: 'Hey fool im missing!'
  }))

  document.querySelectorAll('pap-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      console.log('submitted', e)
    })
  })

  // document.querySelector('form#test-form').addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const data = Array.from(new FormData(e.target));
  //     console.log('form submitted', data);
  // })
}
