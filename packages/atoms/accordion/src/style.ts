export const style = `:host {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--accordion-easing, cubic-bezier(1, 0, 0, 1)) var(--accordion-duration, 200ms);
  overflow: hidden; }
  :host div[part="group"] {
    overflow: hidden; }

:host([open="true"]) {
  grid-template-rows: 1fr; }`;
