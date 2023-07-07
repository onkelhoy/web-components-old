// tools
import '@circular-tools/doc/wc';

// component
import '@circular/table/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    document.querySelectorAll('o-table').forEach(table => {
        table.rows = [
            [{value: "standards", header: true, sorting: true}, { value: "svenska", header: true, sorting: true }, { value: "deutch", header: true, sorting: true}],
            ["hello", "hejsan", "wunderbar"],
            ["world", {value:"brorsan", canEdit: true}, "inordnung"],
            ["foo", "vad", "hausmeister"],
            ["bar", "händer", "hilfe"]
        ];
    })
}
