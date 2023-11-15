export const style = `:host {
  display: inline-block;
  padding: var(--padding-smaller, 4px);
  --color-selected: var(--pap-steps-circle-selected-color, var(--pap-color-CB-800));
  --color-stale: var(--pap-steps-circle-stale-color, var(--pap-color-canvas-400)); }
  :host span {
    border-radius: 50%;
    display: block;
    content: '';
    width: var(--unit-size3, 16px);
    height: var(--unit-size3, 16px);
    box-sizing: border-box; }

:host([status="incomplete"]) > span {
  border: 2px solid var(--color-stale); }

:host([status="complete"]) > span {
  background-color: var(--color-selected); }

:host([status="active"]) > span {
  border: 2px solid var(--color-selected); }`;
