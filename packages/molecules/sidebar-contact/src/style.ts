export const style = `:host {
  display: flex;
  justify-content: center;
  container-type: inline-size; }
  :host o-box-template[part="collapsed"] {
    background-color: var(--o-color-bg-secondary);
    padding: var(--padding-small);
    align-items: center;
    justify-content: center;
    display: none; }
  :host o-box-template[part="base"] {
    background-color: var(--o-color-bg-secondary);
    display: block;
    padding-inline: var(--padding-medium);
    flex-grow: 1; }
    :host o-box-template[part="base"] header {
      display: flex;
      justify-content: space-between;
      padding-block: var(--padding-medium);
      align-items: center;
      cursor: pointer;
      color: var(--o-color-text-secondary); }
      :host o-box-template[part="base"] header o-icon {
        rotate: -90deg;
        transition: rotate ease 30ms; }
    :host o-box-template[part="base"] o-accordion[open="true"] {
      padding-bottom: var(--padding-small); }
      :host o-box-template[part="base"] o-accordion[open="true"] div {
        display: flex;
        gap: var(--gap-small);
        flex-direction: column; }
      :host o-box-template[part="base"] o-accordion[open="true"] div:has(a) {
        color: var(--o-color-text-secondary);
        flex-direction: row;
        height: var(--field-size-medium);
        align-items: center; }
        :host o-box-template[part="base"] o-accordion[open="true"] div:has(a) a {
          color: currentColor;
          text-decoration: none; }
      :host o-box-template[part="base"] o-accordion[open="true"] div:has(o-button) {
        flex-direction: row; }

:host([open="true"]) o-box-template header o-icon {
  rotate: 0deg; }

@container (max-width: 150px) {
  :host {
    background-color: red; }
    :host o-box-template[part="base"] {
      display: none; }
    :host o-box-template[part="collapsed"] {
      display: inline-flex; } }`;
