// tools
import '@pap-it/system-doc';

// component
import '@pap-it/menu';

window.onload = () => {
  console.log('[demo]: window loaded');

  document.querySelectorAll('pap-menu').forEach(menu => {
    menu.addEventListener('change', (e) => {
      console.log('value', e.target.value);
    })
  })
}
