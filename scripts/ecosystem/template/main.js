import "@pap-it/system-doc/wc";

window.onload = () => 
{
  document.querySelector('pap-sidebar.designsystem').addEventListener('select', e => 
  {
    const id = e.detail.id;

    // disable the others first 
    document.querySelector('main.designsystem div[data-target].selected')?.classList.remove('selected');

    // add the curent 
    document.querySelector(`main.designsystem div[data-target="${id}"]`)?.classList.add('selected')
  })
}