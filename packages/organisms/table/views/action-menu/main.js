// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  console.log('[table-action-menu]: window loaded');

  window['btn-global'].onclick = () => {
    window['global'].open = !window['global'].open;
  }

  window['btn-inline'].onclick = () => {
    window['inline'].open = !window['inline'].open;
  }
}
