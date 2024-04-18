// tools
import '@pap-it/system-doc';

// component
import '@pap-it/input';

window.onload = () => {
  console.log('[demo]: window loaded');
  document.querySelectorAll('form').forEach(form => {
    form.onsubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      console.log('submit', Array.from(data), data.get('aaa'));
    }
  })

  let toggle = false;
  document.querySelector('#custom-danger pap-button').addEventListener('click', () => {
    const input = document.querySelector('#custom-danger pap-input');
    toggle = !toggle;

    if (toggle) {
      input.setAttribute("message", "what");
      input.setAttribute("state", 'danger');
    }
    else {
      input.removeAttribute("message");
      input.setAttribute("state", 'default');
    }
  })
}
