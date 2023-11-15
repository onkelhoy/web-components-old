// tools
import '@papit/tools-doc/wc';

// component
import '@papit/sidebar/wc';

window.onload = () => {
    console.log('[sidebar-item]: window loaded');

    document.getElementById('click-target').addEventListener('click', () => {
        console.log('event-listener item clicked');
    })

    document.querySelectorAll('pap-sidebar-item').forEach(element => {
        element.onselect = (e) => {
            console.log('im selected chum!', e.target)
        }
    })
}
