// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/header/wc';

window.onload = () => {
  console.log('[demo]: window loaded');

  document.querySelector('pap-header.with').user = {
    firstname: 'Oskar'
  }
}
