export const style = `:host {
  display: block;
  max-width: 30rem;
  min-width: 10rem; }
  :host o-box-template {
    background-color: var(--o-color-canvas-50);
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: var(--gap-medium);
    overflow: hidden;
    height: 97px;
    position: relative; }
    :host o-box-template div {
      display: flex;
      align-items: center; }
      :host o-box-template div.left {
        justify-content: center; }
      :host o-box-template div o-icon {
        color: var(--o-color-white);
        display: none; }
    :host o-box-template o-button {
      position: absolute;
      right: 0;
      top: 0;
      gap: 0;
      padding: 0;
      width: var(--field-size-medium);
      height: var(--field-size-medium); }

:host([variant="error"]) o-box-template div.left {
  background-color: var(--o-color-danger-500); }
  :host([variant="error"]) o-box-template div.left o-icon[name="form.error"] {
    display: initial; }

:host([variant="warning"]) o-box-template div.left {
  background-color: var(--o-color-warning-500); }
  :host([variant="warning"]) o-box-template div.left o-icon[name="form.warning"] {
    display: initial; }

:host([variant="success"]) o-box-template div.left {
  background-color: var(--o-color-success-500); }
  :host([variant="success"]) o-box-template div.left o-icon[name="form.success"] {
    display: initial; }`;
