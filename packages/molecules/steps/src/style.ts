export const style = `:host {
  display: inline-block;
  --border-color-unselected: var(--pap-steps-border-color-unselected, var(--pap-color-bg-canvas, #EAEBEF));
  --border-color-selected: var(--pap-steps-border-color-selected, var(--pap-color-clear-blue-800, #0059E6));
  --pap-steps-circle-selected-color: var(--border-color-selected);
  --pap-steps-circle-stale-color: var(--border-color-unselected); }
  :host pap-typography {
    padding-block: var(--padding-small, 8px); }
  :host pap-box-template {
    display: inline-flex;
    align-items: center;
    gap: var(--unit-size5, 32px);
    justify-content: space-between;
    background-color: var(--pap-color-bg, #FFFFFF);
    padding: var(--padding-medium, 16px) var(--padding-large, 24px); }
    :host pap-box-template div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative; }
      :host pap-box-template div pap-typography {
        white-space: nowrap; }
      :host pap-box-template div span {
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        content: '';
        width: calc(100% + var(--unit-size5, 32px));
        height: 2px; }
        :host pap-box-template div span::before, :host pap-box-template div span::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: var(--border-color-unselected);
          transform: translateY(-50%); }
        :host pap-box-template div span::before {
          width: calc(50% - var(--unit-size4, 24px)); }
        :host pap-box-template div span::after {
          left: calc(50% - var(--unit-size2, 8px));
          width: calc(50% + var(--unit-size4, 24px)); }
    :host pap-box-template div.step.selected > div > span::before,
    :host pap-box-template div.step.selected > div > span::after,
    :host pap-box-template div.step.selected + div.step > div > span::before {
      background-color: var(--border-color-selected); }
    :host pap-box-template div.step:first-child > div > span::before {
      display: none; }
    :host pap-box-template div.step:last-child > div > span::after {
      display: none; }`;
