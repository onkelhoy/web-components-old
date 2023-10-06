export const style = `:host {
  display: grid;
  grid-template-columns: 4fr 4fr 2fr 3fr;
  align-items: center;
  gap: var(--gap-small, 8px); }
  :host o-button {
    gap: 0; }
  :host o-typography {
    white-space: nowrap;
    margin-inline: 1rem;
    text-align: center; }
  :host span.button-group {
    display: flex;
    justify-content: flex-end; }`;
