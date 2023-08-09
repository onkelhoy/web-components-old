// tools
import '@henry2/tools-doc/wc';
import '@henry2/input/wc';
import '@henry2/checkbox/wc';
import '@henry2/textarea/wc';
import '@henry2/toggle/wc';
import '@henry2/button/wc';
import '@henry2/dropdown/wc';

// component
import '@henry2/form/wc';

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

    document.querySelector('o-input[name="a.a"]').setAttribute('customWarning', JSON.stringify({
        valueMissing: 'Hey fool im missing!'
    }))

    document.querySelectorAll('o-form').forEach(form => {
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
