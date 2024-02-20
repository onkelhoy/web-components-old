// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/input/wc';

window.onload = () => {
  console.log('[demo]: window loaded');
  document.querySelectorAll('form').forEach(form => {
    form.onsubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      console.log('submit', Array.from(data), data.get('aaa'));
    }
  })
}
