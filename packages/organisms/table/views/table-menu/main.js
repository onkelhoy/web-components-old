// tools
import '@pap-it/system-doc/wc';
import '@pap-it/input/wc';
import '@pap-it/button/wc';
import '@pap-it/tabs/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  window['btn-default'].onclick = () => {
    window.default.open = !window.default.open;
  }
  window['btn-inline'].onclick = () => {
    window.inline.open = !window.inline.open;
  }
}
