// tools
import '@pap-it/system-doc';

// component
import '@pap-it/table';

window.onload = () => {
  document.querySelectorAll('pap-table-header').forEach(elm => {
    elm.addEventListener('save', () => console.log('save'));
    elm.addEventListener('action', (e) => console.log('action', e));
    elm.addEventListener('search', (e) => console.log('search', e));
  })

}
