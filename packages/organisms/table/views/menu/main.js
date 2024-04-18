// tools
import '@pap-it/system-doc';
import '@pap-it/input';
import '@pap-it/button';
import '@pap-it/tabs';

// component
import '@pap-it/table';

window.onload = () => {
  window['btn-default'].onclick = () => {
    window.default.open = !window.default.open;
  }
  window['btn-fixed'].onclick = () => {
    window.fixed.open = !window.fixed.open;
  }
}
