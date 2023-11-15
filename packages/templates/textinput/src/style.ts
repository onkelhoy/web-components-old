export const style = `:host {
  --background: var(--pap-textinput-background-light, var(--pap-color-neutral-50)); }
  :host pap-box-template.wrapper {
    background-color: var(--background); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--pap-textinput-background-dark, var(--pap-color-neutral-50)); } }`;
