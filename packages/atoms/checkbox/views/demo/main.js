// tools
import '@circular-tools/doc/wc';

// component
import '@circular/checkbox/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    window.checked_btn.onclick = () => {
        window.checkbox_readonly.value = true;
    }
    window.unchecked_btn.onclick = () => {
        window.checkbox_readonly.value = false;
    }
}
