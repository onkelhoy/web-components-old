// tools
import '@pap-it/system-doc';

// component
import '@pap-it/checkbox';

window.onload = () => {
  console.log('[demo]: window loaded');
  window.checked_btn.onclick = () => {
    window.checkbox_readonly.checked = true;
  }
  window.unchecked_btn.onclick = () => {
    window.checkbox_readonly.checked = false;
  }
}
