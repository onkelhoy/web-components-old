// tools
import '@papit/tools-doc/wc';

// component
import '@papit/steps/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    const steps = document.querySelector('pap-steps');
    steps.steps = ["Terms & conditions", "Save password", "General information"];
    steps.current = 1;
}
