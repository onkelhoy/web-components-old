// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  document.querySelectorAll('pap-table-header').forEach(elm => {
    elm.addEventListener('save', () => console.log('save'));
    elm.addEventListener('action', (e) => console.log('action', e));
    elm.addEventListener('search', (e) => console.log('search', e));

    elm.parentElement.config = {
      edit: true,
      pagination: true,
      search: true,
      actions: {
        filter: true,
        manage: true,
        export: true,
        setting: true,
        custom1: true,
        custom2: true,
        custom3: {
          name: 'custom-3',
          icon: 'custom3',
          callback: () => console.log('custom 3 was clicked')
        }
      }
    }
    console.log('change dispatch');
    elm.parentElement.dispatchEvent(new Event('context-manual-change-banana')); // yay banana !
  })

}
