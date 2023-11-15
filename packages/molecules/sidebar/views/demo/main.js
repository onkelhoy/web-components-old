// tools
import '@papit/tools-doc/wc';

// component
import '@papit/sidebar/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    document.querySelectorAll('pap-sidebar').forEach(sidebar => {
        sidebar.addEventListener('select', e => console.log(e.detail));
    })
}
