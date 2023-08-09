// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/steps/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    const steps = document.querySelector('o-steps');
    steps.steps = ["Terms & conditions", "Save password", "General information"];
    steps.current = 1;
}
