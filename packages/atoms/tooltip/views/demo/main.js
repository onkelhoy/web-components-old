// tools
import '@pap-it/system-doc/wc';
import '@pap-it/dropdown/wc';

// component
import '@pap-it/tooltip/wc';

window.onload = () => {
  console.log('[demo]: window loaded');

  document.querySelector('pap-dropdown').addEventListener('change', (e) => {
    const target = e.target.parentElement.querySelector('pap-tooltip');
    target.placement = e.target.value;
  })
}
