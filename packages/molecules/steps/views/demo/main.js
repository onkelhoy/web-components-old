// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/steps/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    const steps = document.querySelector('pap-steps');
    steps.steps = ["Terms & conditions", "Save password", "General information"];
    steps.current = 1;
}
