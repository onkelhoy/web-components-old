// tools
import '@pap-it/system-doc';

// component
import '@pap-it/switch';

window.onload = () => {
  console.log('[demo]: window loaded');
  const Switch = document.querySelector('pap-switch');

  Switch.addEventListener('change', () => console.log('change'));
}
