// tools
import '@circular-tools/doc/wc';

// component
import '@circular/navbar/wc';

window.onload = () => {
    console.log('[navbar-item]: window loaded');

    document.querySelectorAll('o-navbar-item').forEach(element => {
        element.onselect = (e) => {
            console.log('im selected chum!', e.target)
        }
    })
}
