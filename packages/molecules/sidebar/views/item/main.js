// tools
import '@pap-it/system-doc';

// component
import '@pap-it/sidebar';

window.onload = () => {
  console.log('[sidebar-item]: window loaded');

  document.getElementById('click-target')?.addEventListener('click', () => {
    console.log('event-listener item clicked');
  })

  document.querySelectorAll('pap-sidebar-item').forEach(element => {
    element.onselect = (e) => {
      console.log('im selected chum!', e.target)
    }
  })
}
