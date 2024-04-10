// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  console.log('[demo]: window loaded');

  document.querySelectorAll('pap-table').forEach(table => {
    table.addEventListener('pagination', (e) => {
      console.log('PAGINATION:', e.target.pagination?.page);
    });
    table.addEventListener('search', (e) => {
      console.log('SEARCH:', e.detail.value);
    });
    table.addEventListener('export', (e) => {
      console.log('EXPORT:', e.detail.value);
    });
    table.addEventListener('select', (e) => {
      console.log('SELECT:', e.detail.value);
    });
    table.addEventListener('sort', (e) => {
      console.log('SORT:', e.detail.value);
    });
    table.addEventListener('checklist-action', (e) => {
      console.log('CHECKLIST-ACTION:', e.detail);
    });
    table.addEventListener('filter-apply', (e) => {
      console.log('FILTER:', e.detail);
    });
  })

  document.querySelectorAll('pap-table:not(.empty)').forEach(table => {

    table.columns = [{
      title: 'column A',
      id: 'ddd',
      width: 120,
    }, 'column B', 'column C']

    LoadData(table);
  });

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

  });
}

function LoadData(table) {
  table.data = [
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
    ['snosk', 'håkan', 'bråkan']
  ]
}