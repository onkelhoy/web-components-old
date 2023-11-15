export const style = `:host {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: var(--pap-color-icon, #29292F); }
  :host input {
    display: none !important; }
  :host::part(wrapper) {
    border: none;
    padding: 0;
    gap: 0;
    height: auto;
    border-radius: var(--radius-max, 1000px);
    margin-left: var(--margin-small, 8px); }
  :host pap-box-template.toggle {
    content: '';
    display: inline-block;
    padding: var(--padding-smaller, 4px);
    border: 1px solid var(--pap-color-border, #C7CBD4); }
    :host pap-box-template.toggle div {
      position: relative; }
      :host pap-box-template.toggle div span[part="indicator"] {
        position: absolute;
        transition: left ease var(--timing-fast, 80ms);
        content: '';
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: var(--pap-color-bg-inverse, #29292F); }

:host([hasfocus="true"]),
:host(:focus) {
  outline: none; }
  :host([hasfocus="true"]) pap-box-template.wrapper,
  :host(:focus) pap-box-template.wrapper {
    outline: none !important; }
  :host([hasfocus="true"]) pap-box-template.toggle,
  :host(:focus) pap-box-template.toggle {
    outline: 1px solid var(--pap-color-border-strong, #29292F); }

:host([checked="false"]) span[part="indicator"] {
  left: 0; }

:host([size="small"]) pap-box-template.toggle {
  height: var(--unit-size3, 16px);
  width: var(--field-size-medium, 40px); }
  :host([size="small"]) pap-box-template.toggle div span[part="indicator"] {
    width: var(--unit-size3, 16px);
    height: var(--unit-size3, 16px); }

:host([size="small"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--unit-size3, 16px)); }

:host([size="medium"]) pap-box-template.toggle {
  height: var(--field-size-smaller, 24px);
  width: var(--field-size-large, 56px); }
  :host([size="medium"]) pap-box-template.toggle div span[part="indicator"] {
    width: var(--field-size-smaller, 24px);
    height: var(--field-size-smaller, 24px); }

:host([size="medium"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--field-size-smaller, 24px)); }

:host([size="large"]) pap-box-template.toggle {
  height: var(--field-size-small, 32px);
  width: calc(1.3 * var(--field-size-large, 56px)); }
  :host([size="large"]) pap-box-template.toggle div span[part="indicator"] {
    width: var(--field-size-small, 32px);
    height: var(--field-size-small, 32px); }

:host([size="large"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--field-size-small, 32px)); }`;
