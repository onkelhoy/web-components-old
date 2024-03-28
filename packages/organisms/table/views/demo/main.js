// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  console.log('[demo]: window loaded');
  document.querySelectorAll('pap-table.basic-config').forEach(element => {
    element.config = {
      edit: true,
      pagination: true,
      search: true,
      sort: true,
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

    element.columns = ['column A', 'column B', 'column C']

    element.data = [
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      ['hej', 'bajs', 'kråkan'],
      [{ id: 'ehh', value: 'snosk' }, 'håkan', 'bråkan']
    ]
  });
}
