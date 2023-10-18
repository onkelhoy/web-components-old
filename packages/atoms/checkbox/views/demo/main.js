// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/checkbox/wc';

window.onload = () => 
{
  console.log('[demo]: window loaded');
  window.checked_btn.onclick = () => 
  {
    window.checkbox_readonly.checked = true;
  }
  window.unchecked_btn.onclick = () => 
  {
    window.checkbox_readonly.checked = false;
  }
}
