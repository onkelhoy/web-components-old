// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/aside/wc';

window.onload = () => 
{
  console.log('[demo]: window loaded');
  const asides = document.querySelectorAll('pap-aside');
  document.querySelector('#aside-show').onclick = () => 
  {
    asides.forEach(aside => 
    {
      aside.show();
    })
  }
}
