import "@henry2/icon/wc";
import "@henry2/tools-doc/wc";
import "@henry2/templates-sidebar-header/wc";

window.onload = () => {
  window.oTheme.add({ name: "KTV", href: "ktv", representColor: "cornflowerblue" });
  window.oTheme.add({ name: "PMP", href: "pmp", representColor: "coral" });

  document.querySelector('o-navbar').addEventListener('select', e => {
    const id = e.detail.id;

    // disable the others first 
    document.querySelector('main.designsystem div[data-target].selected')?.classList.remove('selected');

    // add the curent 
    document.querySelector(`main.designsystem div[data-target="${id}"]`)?.classList.add('selected')
  })
  
//   document.querySelectorAll('side-menu menu-item[data-target]').forEach(elm => {
//     elm.onclick = () => {
//       // disable the others first 
//       document.querySelector('side-menu menu-item[data-target].selected')?.classList.remove('selected');
//       document.querySelector('main.designsystem div[data-target].selected')?.classList.remove('selected');
  
//       // add the curent 
//       elm.classList.add('selected');
//       document.querySelector(`main.designsystem div[data-target="${elm.getAttribute('data-target')}"]`)?.classList.add('selected')
//     }
//   })
}