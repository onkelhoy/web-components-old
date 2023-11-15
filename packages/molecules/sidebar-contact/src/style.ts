export const style = `:host {
  display: flex;
  justify-content: center;
  container-type: inline-size; }
  :host pap-box-template[part="collapsed"] {
    background-color: var(--pap-color-bg-secondary, #F6F7F8);
    padding: var(--padding-small, 8px);
    align-items: center;
    justify-content: center;
    display: none; }
  :host pap-box-template[part="base"] {
    background-color: var(--pap-color-bg-secondary, #F6F7F8);
    display: block;
    padding-inline: var(--padding-medium, 16px);
    flex-grow: 1; }
    :host pap-box-template[part="base"] header {
      display: flex;
      justify-content: space-between;
      padding-block: var(--padding-medium, 16px);
      align-items: center;
      cursor: pointer;
      color: var(--pap-color-text-secondary, #6E7087); }
      :host pap-box-template[part="base"] header pap-icon {
        rotate: -90deg;
        transition: rotate ease 30ms; }
    :host pap-box-template[part="base"] pap-accordion[open="true"] {
      padding-bottom: var(--padding-small, 8px); }
      :host pap-box-template[part="base"] pap-accordion[open="true"] div {
        display: flex;
        gap: var(--gap-small, 8px);
        flex-direction: column; }
      :host pap-box-template[part="base"] pap-accordion[open="true"] div:has(a) {
        color: var(--pap-color-text-secondary, #6E7087);
        flex-direction: row;
        height: var(--field-size-medium, 40px);
        align-items: center; }
        :host pap-box-template[part="base"] pap-accordion[open="true"] div:has(a) a {
          color: currentColor;
          text-decoration: none; }
      :host pap-box-template[part="base"] pap-accordion[open="true"] div:has(pap-button) {
        flex-direction: row; }

:host([open="true"]) pap-box-template header pap-icon {
  rotate: 0deg; }

@container (max-width: 150px) {
  :host pap-box-template[part="base"] {
    display: none; }
  :host pap-box-template[part="collapsed"] {
    display: inline-flex; } }`;
