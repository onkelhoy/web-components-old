// tools
import '@papit/tools-doc/wc';

// component
import '@papit/toggle/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    const toggle = document.querySelector('pap-toggle');

    toggle.addEventListener('change', () => console.log('change'));
}
