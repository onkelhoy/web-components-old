// tools
import '@pap-it/system-doc';

// component
import '@pap-it/aside';

window.onload = () => {
  console.log('[demo]: window loaded');
  const asides = document.querySelectorAll('pap-aside');
  document.querySelector('#aside-show').onclick = () => {
    asides.forEach(aside => {
      aside.show();
    })
  }
}
