// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/sidebar/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    document.querySelectorAll('o-sidebar').forEach(sidebar => {
        sidebar.addEventListener('select', e => console.log(e.detail));
    })
}
