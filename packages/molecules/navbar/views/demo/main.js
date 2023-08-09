// tools
import '@onkelhoy/tools-doc/wc';

// component
import '@onkelhoy/navbar/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    document.querySelectorAll('o-navbar').forEach(navbar => {
        navbar.addEventListener('select', e => console.log(e.detail));
    })
}
