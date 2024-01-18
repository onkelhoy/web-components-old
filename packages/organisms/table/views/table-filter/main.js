// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  console.log('[table-filter]: window loaded');

  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  document.querySelectorAll('pap-table-filter').forEach(el => {
    el.addEventListener('apply', console.log);
    el.columns = new Array(ALPHA.length).fill(0).map((_v, i) => `column ${ALPHA[i]}`)
  })
}
