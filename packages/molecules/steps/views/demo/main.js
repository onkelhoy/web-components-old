// tools
import '@onkelhoy/tools-doc/wc';

// component
import '@onkelhoy/steps/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    const steps = document.querySelector('o-steps');
    steps.steps = ["Terms & conditions", "Save password", "General information"];
    steps.current = 1;
}
