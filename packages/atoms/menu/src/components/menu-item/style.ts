export const style = `:host div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  padding: var(--o-menuitem-padding, var(--padding-small)); }
  :host div:hover {
    background-color: var(--o-menuitem-light-background-hover, var(--neutral-300, #F1F1F4)); }

:host([checked="false"]) o-icon[name="check"] {
  display: none; }`;