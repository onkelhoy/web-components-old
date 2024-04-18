// tools
import '@pap-it/system-doc';

// component
import '@pap-it/steps';

window.onload = () => {
  console.log('[demo]: window loaded');

  const steps = document.querySelector('pap-steps');
  steps.steps = ["Terms & conditions", "Save password", "General information"];
  steps.current = 1;
}
