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
    height: var(--field-size-smaller);
    width: calc(var(--field-size-large));
    background-color: var(--o-color-white);
    padding: var(--padding-smaller); }
    :host o-box-template.toggle div {
      position: relative; }
      :host o-box-template.toggle div span[part="indicator"] {
        position: absolute;
        transition: left ease var(--timing-fast);
        content: '';
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--field-size-smaller);
        height: var(--field-size-smaller);
        border-radius: 50%;
        background-color: var(--o-color-neutral-500); }

:host([checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--field-size-smaller)); }

:host([checked="false"]) span[part="indicator"] {
  left: 0; }`;
