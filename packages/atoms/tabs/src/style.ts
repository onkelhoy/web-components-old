export const style = `:host {
  display: grid;
  grid-template-rows: var(--tabs-height, 3rem) 1fr; }
  :host header {
    display: flex;
    overflow-x: auto;
    position: relative; }
    :host header span.indicator {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 100%;
      transform: translateY(-100%);
      height: var(--tabs-indicator-height, 0.3rem);
      background-color: var(--tabs-indicator-color, black);
      transition: all ease 300ms; }

:host([scrolling="true"]) main {
  max-height: var(--tabs-maxheight, 15rem);
  overflow-y: auto; }

:host([scrolling="true"]) ::slotted(o-tab-content) {
  display: block; }`;
