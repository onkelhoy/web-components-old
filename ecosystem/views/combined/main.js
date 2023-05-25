import "@circular/icon/wc";

window.onload = () => {
  document.querySelectorAll('section.sidebar li > label').forEach(label => {
    label.onclick = () => {
      label.parentElement.classList.toggle('collapsed')
    }
  })

  document.querySelectorAll('section.sidebar li[data-target]').forEach(elm => {
    elm.onclick = () => {
      // disable the others first 
      document.querySelector('section.sidebar li[data-target].selected')?.classList.remove('selected');
      document.querySelector('main.designsystem div[data-target].selected')?.classList.remove('selected');
  
      // add the curent 
      elm.classList.add('selected');
      document.querySelector(`main.designsystem div[data-target="${elm.getAttribute('data-target')}"]`)?.classList.add('selected')
    }
  })
}