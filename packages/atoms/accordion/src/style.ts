export const style = `:host {
  display: grid;
  overflow: hidden; }
  :host div[part="group"] {
    overflow: hidden; }

:host([mode="vertical"]) {
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--accordion-easing, cubic-bezier(1, 0, 0, 1)) var(--accordion-duration, 200ms); }

:host([mode="horizontal"]) {
  grid-template-columns: 0fr;
  transition: grid-template-columns var(--accordion-easing, cubic-bezier(1, 0, 0, 1)) var(--accordion-duration, 200ms); }
  :host([mode="horizontal"]) > * {
    white-space: nowrap; }

:host([mode="vertical"][open="true"]) {
  grid-template-rows: 1fr; }

:host([mode="horizontal"][open="true"]) {
  grid-template-columns: 1fr; }`;
