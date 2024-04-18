// tools
import '@pap-it/system-doc';
// import '@pap-it/dropdown';

// component
import '@pap-it/tooltip';

window.onload = () => {
  console.log('[demo]: window loaded');

  document.querySelector('pap-dropdown').addEventListener('change', (e) => {
    const target = e.target.parentElement.querySelector('pap-tooltip');
    target.placement = e.target.value;
  })
}
