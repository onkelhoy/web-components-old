export const style = `:host {
  display: flex;
  align-items: center;
  gap: var(--gap-small, 8px); }
  :host pap-box-template {
    display: flex;
    align-items: center;
    flex: 1;
    padding: var(--padding-small, 8px);
    box-sizing: border-box;
    height: var(--unit-size7, 48px);
    background-color: var(--pap-color-bg-secondary, #F6F7F8); }
  :host pap-button {
    width: 16px; }

:host([dragged="true"]) {
  opacity: 0.4; }`;
