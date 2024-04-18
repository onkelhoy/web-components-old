// tools
import '@pap-it/system-doc';

// component
import '@pap-it/table';

window.onload = () => {
  console.log('[table-form-menu]: window loaded');

  window['btn-global'].onclick = () => {
    window.global.open = !window.global.open;
  }
  window['btn-inline'].onclick = () => {
    window.inline.open = !window.inline.open;
  }
}
