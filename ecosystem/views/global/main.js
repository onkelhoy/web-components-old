import "@henry2/icon/wc";
import "@henry2/tools-doc/wc";
import "@henry2/ecosystem/wc";

window.onload = () => {
  document.querySelectorAll('side-menu menu-item[data-target]').forEach(elm => {
    elm.onclick = () => {
      // disable the others first 
      document.querySelector('side-menu menu-item[data-target].selected')?.classList.remove('selected');
      document.querySelector('main.designsystem div[data-target].selected')?.classList.remove('selected');
  
      // add the curent 
      elm.classList.add('selected');
      document.querySelector(`main.designsystem div[data-target="${elm.getAttribute('data-target')}"]`)?.classList.add('selected')
    }
  })
}