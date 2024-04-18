// tools
import '@pap-it/system-doc';

// component
import '@pap-it/header';

window.onload = () => {
  console.log('[demo]: window loaded');

  document.querySelector('pap-header.with').user = {
    firstname: 'Oskar'
  }
}
