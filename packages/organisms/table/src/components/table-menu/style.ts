export const style = `:host {
  display: inline-flex;
  flex-direction: column;
  top: 0;
  z-index: 1002;
  overflow: hidden;
  border-top-left-radius: var(--radius-medium, 8px);
  border-bottom-left-radius: var(--radius-medium, 8px);
  background-color: var(--pap-color-bg, #FFF);
  box-shadow: var(--shadow-l, 0 8px 12px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)));
  transition: width 100ms ease-in, opacity 10ms ease-in 10ms; }
  :host header {
    box-sizing: border-box;
    min-width: 365px;
    white-space: nowrap;
    background-color: var(--pap-color-bg-secondary, #F6F7F8);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-medium, 16px);
    padding: var(--padding-large, 24px); }

:host([inline="true"]) {
  position: sticky;
  height: 100%;
  left: 100%; }

:host([inline="false"]) {
  position: fixed;
  right: 0;
  height: 100vh; }

:host([open="true"]) {
  width: 365px;
  opacity: 1; }

:host([open="false"]) {
  width: 0;
  opacity: 0;
  transition: width 500ms ease, opacity 250ms ease; }

@media screen and (max-width: 320px) {
  :host header {
    padding: var(--padding-medium, 16px);
    padding-top: var(--unit-size7, 48px); }
  :host([open="true"]) {
    width: 100%; } }`;