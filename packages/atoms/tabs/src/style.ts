export const style = `:host header {
  margin-bottom: var(--margin-small, 8px);
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden; }
  :host header div {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--gap-small, 8px);
    overflow-x: auto;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */ }
    :host header div::-webkit-scrollbar {
      display: none; }
    :host header div span[part=indicator] {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 100%;
      translate: 0 -100%;
      height: var(--tabs-indicator-height, var(--unit-size-1, 4px));
      background-color: var(--tabs-indicator-color, var(--o-color-border-brand, #009DD3));
      transition: all var(--tabs-indicator-animation-easing, ease) var(--tabs-indicator-animation-duration, 200ms);
      border-top-left-radius: var(--radius-small, 4px);
      border-top-right-radius: var(--radius-small, 4px); }

::slotted(*[slot="header-prefix"]) {
  margin-right: auto; }

::slotted(*[slot="header-suffix"]) {
  margin-left: auto; }

:host([scrolling="true"]) main {
  max-height: var(--tabs-maxheight, 15rem);
  overflow-y: auto;
  scroll-snap-type: y proximity; }

:host([scrolling="true"]) ::slotted(o-tab-content) {
  display: block; }`;
