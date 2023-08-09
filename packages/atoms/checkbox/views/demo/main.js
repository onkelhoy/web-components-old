// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/checkbox/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    window.checked_btn.onclick = () => {
        window.checkbox_readonly.checked = true;
    }
    window.unchecked_btn.onclick = () => {
        window.checkbox_readonly.checked = false;
    }
}
