export const style = `:host {
  --menu-background: var(--o-color-neutral-50);
  --menu-color: var(--o-color-text); }
  :host o-button {
    background-color: var(--menu-background);
    color: var(--menu-color);
    padding: var(--padding-small, 8px);
    gap: var(--padding-small, 8px); }
    :host o-button span.caret-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px; }
  :host o-popover-template {
    display: inline-block; }
  :host o-box-template {
    display: block;
    padding-block: var(--padding-small);
    min-width: 180px;
    background-color: var(--menu-background);
    max-height: 20rem;
    overflow-y: auto; }

:host([open="true"]) o-button o-icon[name="caret"] {
  transform: rotate(180deg); }

:host([open="false"]) o-button o-icon[name="caret"] {
  transform: rotate(0); }`;
