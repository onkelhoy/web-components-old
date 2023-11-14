export const style = `:host {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas: "label input" "message message";
  align-items: center;
  column-gap: var(--gap-small, 8px);
  cursor: pointer; }
  :host::part(label) {
    grid-area: label; }
  :host::part(wrapper) {
    padding-inline: 0;
    display: block;
    border: none;
    height: auto;
    grid-area: input; }
  :host::part(message) {
    grid-area: message; }

:host([size="small"]) input[type="checkbox"] {
  height: var(--checkbox-size-small, var(--size-small, 15px));
  width: var(--checkbox-size-small, var(--size-small, 15px)); }

:host([size="medium"]) input[type="checkbox"] {
  height: var(--checkbox-size-medium, var(--size-medium, 20px));
  width: var(--checkbox-size-medium, var(--size-medium, 20px)); }

:host([size="large"]) input[type="checkbox"] {
  height: var(--checkbox-size-large, var(--size-large, 28px));
  width: var(--checkbox-size-large, var(--size-large, 28px)); }

:host(:focus)::part(wrapper),
:host([hasfocus="true"])::part(wrapper) {
  outline: none; }

:host(:focus) input[type="checkbox"]:focus-visible,
:host([hasfocus="true"]) input[type="checkbox"]:focus-visible {
  outline-offset: 2px;
  outline: 1px solid blue !important; }`;
