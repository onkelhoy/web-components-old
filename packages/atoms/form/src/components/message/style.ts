export const style = `:host {
  display: block;
  max-width: 30rem;
  min-width: 10rem; }
  :host pap-box-template {
    background-color: var(--pap-color-bg-canvas, #EAEBEF);
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: var(--gap-medium, 16px);
    overflow: hidden;
    height: 97px;
    position: relative; }
    :host pap-box-template div {
      display: flex;
      align-items: center; }
      :host pap-box-template div.left {
        justify-content: center; }
      :host pap-box-template div pap-icon {
        color: var(--pap-color-icon-inverse, #FFFFFF);
        display: none; }
    :host pap-box-template pap-button {
      position: absolute;
      right: 0;
      top: 0;
      gap: 0;
      padding: 0;
      width: var(--field-size-medium, 40px);
      height: var(--field-size-medium, 40px); }

:host([variant="error"]) pap-box-template div.left {
  background-color: var(--pap-color-danger-500, #FD3649); }
  :host([variant="error"]) pap-box-template div.left pap-icon[name="form.error"] {
    display: initial; }

:host([variant="warning"]) pap-box-template div.left {
  background-color: var(--pap-color-warning-500, #FFA800); }
  :host([variant="warning"]) pap-box-template div.left pap-icon[name="form.warning"] {
    display: initial; }

:host([variant="success"]) pap-box-template div.left {
  background-color: var(--pap-color-success-500, #4FB82A); }
  :host([variant="success"]) pap-box-template div.left pap-icon[name="form.success"] {
    display: initial; }`;
