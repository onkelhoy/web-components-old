// tools
import '@onkelhoy/tools-doc/wc';

// component
import '@onkelhoy/checkbox/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    window.checked_btn.onclick = () => {
        window.checkbox_readonly.checked = true;
    }
    window.unchecked_btn.onclick = () => {
        window.checkbox_readonly.checked = false;
    }
}
