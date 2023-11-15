import "@papit/icon/wc";
import "@papit/tools-doc/wc";
import "@papit/sidebar/wc";

window.onload = () => {
  document.querySelector('pap-navbar').addEventListener('select', e => {
    const id = e.detail.id;

    // disable the others first 
    document.querySelector('main.designsystem div[data-target].selected')?.classList.remove('selected');

    // add the curent 
    document.querySelector(`main.designsystem div[data-target="${id}"]`)?.classList.add('selected')
  })
}