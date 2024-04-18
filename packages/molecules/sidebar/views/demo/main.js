// tools
import '@pap-it/system-doc';

// component
import '@pap-it/sidebar';

window.onload = () => {
  console.log('[demo]: window loaded');
  document.querySelectorAll('pap-sidebar').forEach(sidebar => {
    sidebar.addEventListener('select', e => console.log(e.detail));
  })
}
