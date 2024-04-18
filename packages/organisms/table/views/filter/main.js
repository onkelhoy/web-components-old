// tools
import '@pap-it/system-doc';

// component
import '@pap-it/table';

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
