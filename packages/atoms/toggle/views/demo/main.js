// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/toggle/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    const toggle = document.querySelector('o-toggle');

    toggle.addEventListener('change', () => console.log('change'));
}
