// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/switch/wc';

window.onload = () => {
  console.log('[demo]: window loaded');
  const Switch = document.querySelector('pap-switch');

  Switch.addEventListener('change', () => console.log('change'));
}
