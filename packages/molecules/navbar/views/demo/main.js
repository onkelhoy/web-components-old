// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/navbar/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    document.querySelectorAll('o-navbar').forEach(navbar => {
        navbar.addEventListener('select', e => console.log(e.detail));
    })
}
