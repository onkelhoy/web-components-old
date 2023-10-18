// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/sidebar/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    document.querySelectorAll('pap-sidebar').forEach(sidebar => {
        sidebar.addEventListener('select', e => console.log(e.detail));
    })
}
