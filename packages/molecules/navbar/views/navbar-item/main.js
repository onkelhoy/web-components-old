// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/navbar/wc';

window.onload = () => {
    console.log('[navbar-item]: window loaded');

    document.querySelectorAll('o-navbar-item').forEach(element => {
        element.onselect = (e) => {
            console.log('im selected chum!', e.target)
        }
    })
}
