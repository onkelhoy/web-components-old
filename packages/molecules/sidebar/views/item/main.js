// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/sidebar/wc';

window.onload = () => {
    console.log('[sidebar-item]: window loaded');

    document.getElementById('click-target').addEventListener('click', () => {
        console.log('event-listener item clicked');
    })

    document.querySelectorAll('o-sidebar-item').forEach(element => {
        element.onselect = (e) => {
            console.log('im selected chum!', e.target)
        }
    })
}
