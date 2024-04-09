// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  console.log('[table-filter]: window loaded');

  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  document.querySelectorAll('doc-card').forEach(card => {
    card.columns = new Array(ALPHA.length).fill(0).map((_v, i) => ({ id: i, title: `column ${ALPHA[i]}` }))

  })

  document.querySelectorAll('pap-table-filter').forEach(el => {
    el.addEventListener('apply', console.log);
  })
}
