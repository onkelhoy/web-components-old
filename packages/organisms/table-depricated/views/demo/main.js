// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => 
{
  console.log('[demo]: window loaded');
  document.querySelectorAll('pap-table').forEach(table => 
  {
    table.rows = [
      [{value: "standards", header: true, sorting: true}, { value: "svenska", header: true, sorting: true }, { value: "deutch", header: true, sorting: true}],
      ["hello", "hejsan", "wunderbar"],
      ["world", {value:"brorsan", canEdit: true}, "inordnung"],
      ["foo", "vad", "hausmeister"],
      ["bar", "händer", "hilfe"]
    ];
  })
}