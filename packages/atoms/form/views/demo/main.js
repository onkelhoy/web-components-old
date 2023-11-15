// tools
import '@papit/tools-doc/wc';
import '@papit/input/wc';
import '@papit/checkbox/wc';
import '@papit/textarea/wc';
import '@papit/toggle/wc';
import '@papit/button/wc';
import '@papit/dropdown/wc';

// component
import '@papit/form/wc';

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

    document.querySelector('pap-input[name="a.a"]').setAttribute('customWarning', JSON.stringify({
        valueMissing: 'Hey fool im missing!'
    }))

    document.querySelectorAll('pap-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            console.log('submitted', e)
        })
    })

    // document.querySelector('form#test-form').addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const data = Array.from(new FormData(e.target));
    //     console.log('form submitted', data);
    // })
}
