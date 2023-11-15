// tools
import '@papit/tools-doc/wc';

// component
import '@papit/checkbox/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    window.checked_btn.onclick = () => {
        window.checkbox_readonly.checked = true;
    }
    window.unchecked_btn.onclick = () => {
        window.checkbox_readonly.checked = false;
    }
}
