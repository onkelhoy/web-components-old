export const style = `:host pap-input {
  --pap-prefix-suffix-content-padding: 0; }
  :host pap-input pap-button pap-icon {
    color: var(--pap-color-icon-secondary, #6E7087); }

:host([toggled="true"]) > pap-button {
  display: none; }

:host([toggled="true"]) > pap-input {
  display: block; }

:host([toggled="false"]) > pap-button {
  display: inline-block; }

:host([toggled="false"]) > pap-input {
  display: none; }`;