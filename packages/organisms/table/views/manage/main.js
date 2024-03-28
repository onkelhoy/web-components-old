// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => 
{
  document.querySelectorAll('pap-table-manage').forEach(elm => 
  {

    elm.parentElement.config = {
      edit: true,
      actions: {
        manage: {
          name: 'manage',
          setting: {
            readonly: false
          }
        }
      }
    }
    elm.parentElement.columns = [
      {
        id: '0',
        title: 'Title',
        subtitle: 'Sub-Title',
      },
      {
        id: '1',
        title: 'Title',
        subtitle: 'Sub-Title',
      },
      {
        id: '2',
        title: 'Title',
        subtitle: 'Sub-Title',
      }
    ]
    console.log('change dispatch');
    elm.parentElement.dispatchEvent(new Event('context-manual-change-banana')); // yay banana !
  })

}
