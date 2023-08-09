// tools
import '@onkelhoy/tools-doc/wc';

// component
import '@onkelhoy/navbar/wc';

window.onload = () => {
    console.log('[navbar-item]: window loaded');

    document.querySelectorAll('o-navbar-item').forEach(element => {
        element.onselect = (e) => {
            console.log('im selected chum!', e.target)
        }
    })
}
