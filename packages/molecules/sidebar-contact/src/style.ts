export const style = `:host {
  display: flex;
  justify-content: center;
  container-type: inline-size; }
  :host o-box-template[part="collapsed"] {
    background-color: var(--o-color-bg-secondary, #F6F7F8);
    padding: var(--padding-small, 8px);
    align-items: center;
    justify-content: center;
    display: none; }
  :host o-box-template[part="base"] {
    background-color: var(--o-color-bg-secondary, #F6F7F8);
    display: block;
    padding-inline: var(--padding-medium, 16px);
    flex-grow: 1; }
    :host o-box-template[part="base"] header {
      display: flex;
      justify-content: space-between;
      padding-block: var(--padding-medium, 16px);
      align-items: center;
      cursor: pointer;
      color: var(--o-color-text-secondary, #6E7087); }
      :host o-box-template[part="base"] header o-icon {
        rotate: -90deg;
        transition: rotate ease 30ms; }
    :host o-box-template[part="base"] o-accordion[open="true"] {
      padding-bottom: var(--padding-small, 8px); }
      :host o-box-template[part="base"] o-accordion[open="true"] div {
        display: flex;
        gap: var(--gap-small, 8px);
        flex-direction: column; }
      :host o-box-template[part="base"] o-accordion[open="true"] div:has(a) {
        color: var(--o-color-text-secondary, #6E7087);
        flex-direction: row;
        height: var(--field-size-medium, 40px);
        align-items: center; }
        :host o-box-template[part="base"] o-accordion[open="true"] div:has(a) a {
          color: currentColor;
          text-decoration: none; }
      :host o-box-template[part="base"] o-accordion[open="true"] div:has(o-button) {
        flex-direction: row; }

:host([open="true"]) o-box-template header o-icon {
  rotate: 0deg; }

@container (max-width: 150px) {
  :host o-box-template[part="base"] {
    display: none; }
  :host o-box-template[part="collapsed"] {
    display: inline-flex; } }`;
