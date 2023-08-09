// tools
import '@onkelhoy/tools-doc/wc';

// component
import '@onkelhoy/toggle/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    const toggle = document.querySelector('o-toggle');

    toggle.addEventListener('change', () => console.log('change'));
}
