// tools
import '@pap-it/system-doc';

// component
import '@pap-it/templates-menu';

window.onload = () => {
  console.log('[demo]: window loaded');
  if (!window.papLocalization) window.papLocalization = {};

  console.log('segtting to false')
  window.papLocalization.setURL = false;
}
