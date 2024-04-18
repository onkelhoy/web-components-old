// tools
import '@pap-it/system-doc';

// component
import '@pap-it/table';

window.onload = () => {
  console.log('[table-filter-individual]: window loaded');

  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  document.querySelectorAll('pap-table-filter-individual').forEach(el => {
    console.log('init', el);
    el.addEventListener('change', console.log);
    el.columns = new Array(ALPHA.length).fill(0).map((_v, i) => `column ${ALPHA[i]}`)
  })
}
