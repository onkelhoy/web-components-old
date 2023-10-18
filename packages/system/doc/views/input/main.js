import '@pap-it/system-doc/wc';

window.onload = () => 
{
  document.querySelectorAll('doc-input').forEach(element => element.addEventListener('change', (e) => console.log('changed', e.target.name, e.detail.value)))
}