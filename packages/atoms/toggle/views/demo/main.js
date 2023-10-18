// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/toggle/wc';

window.onload = () => 
{
  console.log('[demo]: window loaded');
  const toggle = document.querySelector('pap-toggle');

  toggle.addEventListener('change', () => console.log('change'));
}
