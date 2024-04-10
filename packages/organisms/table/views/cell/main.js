// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  document.querySelectorAll('pap-table-cell').forEach(elm => {
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
  });

  document.querySelectorAll('pap-codeblock').forEach(element => {
    if (!element.columns) {
      element.columns = [{
        id: "column 1",
      }]
    }
    if (!element.data) {
      element.data = [
        [
          {
            id: 'column 1',
            value: 'ok'
          }
        ]
      ]
    }
    element.dispatchEvent(new Event('context-manual-change-banana')); // yay banana !
  })
}