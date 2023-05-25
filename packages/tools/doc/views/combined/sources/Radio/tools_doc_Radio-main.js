import '@circular-tools/doc/wc';

const windowFunctools_doc_Radio_load = () => {
  document.querySelectorAll('section[data-tab="Radio"] doc-radio').forEach(element => element.addEventListener('change', (e) => console.log('changed', e.target.name, e.detail.value)))
}

window.addEventListener("load", windowFunctools_doc_Radio_load)