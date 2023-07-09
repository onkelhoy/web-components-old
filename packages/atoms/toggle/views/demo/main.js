// tools
import '@circular-tools/doc/wc';

// component
import '@circular/toggle/wc';

window.onload = () => {
    console.log('[demo]: window loaded');
    const toggle = document.querySelector('o-toggle');

    toggle.addEventListener('change', () => console.log('change'));
}
