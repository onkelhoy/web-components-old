export const style = `:host {
  cursor: pointer;
  display: inline-flex;
  align-items: center; }
  :host input {
    display: none !important; }
  :host::part(wrapper) {
    border: none;
    padding: 0;
    gap: 0;
    height: auto;
    border-radius: var(--radius-max);
    margin-left: var(--margin-small); }
  :host o-box-template.toggle {
    content: '';
    display: inline-block;
    padding: var(--padding-smaller);
    border: 1px solid var(--o-color-border); }
    :host o-box-template.toggle div {
      position: relative; }
      :host o-box-template.toggle div span[part="indicator"] {
        position: absolute;
        transition: left ease var(--timing-fast);
        content: '';
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: var(--o-color-bg-inverse); }

:host([hasfocus="true"]),
:host(:focus) {
  outline: none; }
  :host([hasfocus="true"]) o-box-template.wrapper,
  :host(:focus) o-box-template.wrapper {
    outline: none !important; }
  :host([hasfocus="true"]) o-box-template.toggle,
  :host(:focus) o-box-template.toggle {
    outline: 1px solid var(--o-color-border-strong); }

:host([checked="false"]) span[part="indicator"] {
  left: 0; }

:host([size="small"]) o-box-template.toggle {
  height: var(--unit-size3);
  width: var(--field-size-medium); }
  :host([size="small"]) o-box-template.toggle div span[part="indicator"] {
    width: var(--unit-size3);
    height: var(--unit-size3); }

:host([size="small"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--unit-size3)); }

:host([size="medium"]) o-box-template.toggle {
  height: var(--field-size-smaller);
  width: var(--field-size-large); }
  :host([size="medium"]) o-box-template.toggle div span[part="indicator"] {
    width: var(--field-size-smaller);
    height: var(--field-size-smaller); }

:host([size="medium"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--field-size-smaller)); }

:host([size="large"]) o-box-template.toggle {
  height: var(--field-size-small);
  width: calc(1.3 * var(--field-size-large)); }
  :host([size="large"]) o-box-template.toggle div span[part="indicator"] {
    width: var(--field-size-small);
    height: var(--field-size-small); }

:host([size="large"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--field-size-small)); }`;
