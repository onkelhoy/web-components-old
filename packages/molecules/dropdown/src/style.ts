export const style = `:host {
  --background: var(--dropdown-background-light, white); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--dropdown-background-dark, black); } }

:host o-popover-template {
  --popover-gap: 0.5rem;
  flex-grow: 1;
  width: 100%; }
  :host o-popover-template input {
    width: 100%; }
  :host o-popover-template::part(wrapper) {
    width: 100%; }
  :host o-popover-template o-box-template.options {
    box-sizing: border-box;
    padding: 0.5rem;
    width: 100%;
    display: block;
    background-color: var(--background);
    border: 1px solid grey;
    max-height: 15rem;
    overflow-y: auto; }

:host([popoveropen="true"]) o-icon[name="caret"] {
  transform: rotate(180deg); }`;
