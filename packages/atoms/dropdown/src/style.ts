export const style = `:host {
  --background: var(--dropdown-background, var(--pap-color-neutral-50)); }
  :host pap-popover-template {
    --popover-gap: var(--gap-small, 8px);
    flex-grow: 1;
    width: 100%; }
    :host pap-popover-template input {
      width: 100%; }
    :host pap-popover-template::part(wrapper) {
      width: 100%; }
    :host pap-popover-template pap-box-template.options {
      box-sizing: border-box;
      padding: var(--padding-small, 8px);
      width: 100%;
      display: block;
      background-color: var(--background);
      border: 1px solid grey;
      max-height: 15rem;
      overflow-y: auto; }

:host([popoveropen="true"]) pap-icon[name="caret"] {
  transform: rotate(180deg); }`;
