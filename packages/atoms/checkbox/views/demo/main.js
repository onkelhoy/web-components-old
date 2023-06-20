// tools
import '@circular-tools/doc/wc';

// component
import '@circular/checkbox/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    window.checked_btn.onclick = () => {
        window.checkbox_readonly.Value = true;
    }
    window.unchecked_btn.onclick = () => {
        window.checkbox_readonly.Value = false;
    }
}
