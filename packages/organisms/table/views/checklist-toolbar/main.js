// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  console.log('[checklist-toolbar]: window loaded');

  document.querySelectorAll('pap-table-checklist-toolbar').forEach(element => {
    element.addEventListener('action', console.log);
  })
}
