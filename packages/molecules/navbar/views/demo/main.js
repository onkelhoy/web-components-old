// tools
import '@circular-tools/doc/wc';

// component
import '@circular/navbar/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    document.querySelectorAll('o-navbar').forEach(navbar => {
        navbar.addEventListener('select', e => console.log(e.detail));
    })
}
