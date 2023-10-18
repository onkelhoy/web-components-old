export const style = `:host header div {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--gap-small, 8px); }
  :host header div[part="header-tabs"] {
    overflow-x: auto;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */ }
    :host header div[part="header-tabs"]::-webkit-scrollbar {
      display: none; }
    :host header div[part="header-tabs"] span[part=indicator] {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 100%;
      translate: 0 -100%;
      height: var(--tabs-indicator-height, var(--unit-size-1, 4px));
      background-color: var(--tabs-indicator-color, var(--pap-color-border-brand, #009DD3));
      transition: all var(--tabs-indicator-animation-easing, ease) var(--tabs-indicator-animation-duration, 200ms);
      border-top-left-radius: var(--radius-small, 4px);
      border-top-right-radius: var(--radius-small, 4px); }

:host header ::slotted(*[slot="header"]) {
  flex-grow: 1;
  z-index: 20; }

::slotted(*[slot="header-prefix"]) {
  margin-right: auto; }

::slotted(*[slot="header-suffix"]) {
  margin-left: auto; }

:host([scrolling="true"]) main {
  max-height: var(--tabs-maxheight, 15rem);
  overflow-y: auto;
  scroll-snap-type: y proximity; }

:host([scrolling="true"]) ::slotted(pap-tab-content) {
  display: block; }`;
