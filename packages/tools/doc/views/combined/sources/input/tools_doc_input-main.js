import '@circular-tools/doc/wc';

const windowFunctools_doc_input_load = () => {
  document.querySelectorAll('section[data-tab="input"] doc-input').forEach(element => element.addEventListener('change', (e) => console.log('changed', e.target.name, e.detail.value)))
}

window.addEventListener("load", windowFunctools_doc_input_load)