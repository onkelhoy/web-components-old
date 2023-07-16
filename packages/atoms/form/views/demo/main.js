// tools
import '@circular-tools/doc/wc';
import '@circular/input/wc';
import '@circular/checkbox/wc';
import '@circular/textarea/wc';
import '@circular/toggle/wc';
import '@circular/dropdown/wc';

// component
import '@circular/form/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    window.show_error.onclick = () => {
        window.form_error.showMessage("Im the error now!", "error");
    }
    window.show_success.onclick = () => {
        window.form_success.showMessage("Im the success now!", "success");
    }
    window.show_warning.onclick = () => {
        window.form_warning.showMessage("Im the warning now!", "warning");
    }
}
