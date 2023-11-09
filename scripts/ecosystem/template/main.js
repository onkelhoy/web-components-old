import "@henry2/icon/wc";
import "@henry2/tools-doc/wc";
import "@henry2/sidebar/wc";

window.onload = () => {
  document.querySelector('o-navbar').addEventListener('select', e => {
    const id = e.detail.id;

    // disable the others first 
    document.querySelector('main.designsystem div[data-target].selected')?.classList.remove('selected');

    // add the curent 
    document.querySelector(`main.designsystem div[data-target="${id}"]`)?.classList.add('selected')
  })
}