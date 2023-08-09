// tools
import '@onkelhoy/tools-doc/wc';
import '@onkelhoy/input/wc';
import '@onkelhoy/checkbox/wc';
import '@onkelhoy/textarea/wc';
import '@onkelhoy/toggle/wc';
import '@onkelhoy/button/wc';
import '@onkelhoy/dropdown/wc';

// component
import '@onkelhoy/form/wc';

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

    // document.querySelector('form#test-form').addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const data = Array.from(new FormData(e.target));
    //     console.log('form submitted', data);
    // })
}
