export const style = `:host {
  display: inline-block;
  --border-color-unselected: var(--o-steps-border-color-unselected, var(--o-color-canvas-400));
  --border-color-selected: var(--o-steps-border-color-selected, var(--o-color-CB-800));
  --o-steps-circle-selected-color: var(--border-color-selected);
  --o-steps-circle-stale-color: var(--border-color-unselected); }
  :host o-typography {
    padding-block: var(--padding-small); }
  :host o-box-template {
    display: inline-flex;
    align-items: center;
    gap: var(--unit-size5);
    justify-content: space-between;
    background-color: var(--o-color-neutral-50);
    padding: var(--padding-medium) var(--padding-large); }
    :host o-box-template div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative; }
      :host o-box-template div o-typography {
        white-space: nowrap; }
      :host o-box-template div span {
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        content: '';
        width: calc(100% + var(--unit-size5));
        height: 2px; }
        :host o-box-template div span::before, :host o-box-template div span::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: var(--border-color-unselected);
          transform: translateY(-50%); }
        :host o-box-template div span::before {
          width: calc(50% - var(--unit-size4)); }
        :host o-box-template div span::after {
          left: calc(50% - var(--unit-size2));
          width: calc(50% + var(--unit-size4)); }
    :host o-box-template div.step.selected > div > span::before,
    :host o-box-template div.step.selected > div > span::after,
    :host o-box-template div.step.selected + div.step > div > span::before {
      background-color: var(--border-color-selected); }
    :host o-box-template div.step:first-child > div > span::before {
      display: none; }
    :host o-box-template div.step:last-child > div > span::after {
      display: none; }`;
