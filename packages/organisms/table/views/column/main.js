// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/table/wc';

window.onload = () => {
  document.querySelectorAll('pap-codeblock').forEach(codeblock => {
    codeblock.config = {
      sort: true,
    }
    codeblock.dispatchEvent(new Event('context-manual-change-banana')); // yay banana !
  })
  console.log('[table-column]: window loaded');
}
