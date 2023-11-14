export const style = `:host {
  --menu-background: var(--o-color-bg, #FFFFFF);
  --menu-color: var(--o-color-text, #29292F);
  display: inline-block; }
  :host o-button span.caret-wrapper {
    display: flex;
    justify-content: center;
    align-items: center; }
  :host o-popover-template {
    display: inline-block; }
  :host o-box-template {
    display: block;
    padding-block: var(--padding-small, 8px);
    min-width: 180px;
    background-color: var(--menu-background);
    max-height: 20rem;
    overflow-y: auto; }

:host([open="true"]) o-button o-icon[name="caret"] {
  transform: rotate(180deg); }

:host([open="false"]) o-button o-icon[name="caret"] {
  transform: rotate(0); }`;
