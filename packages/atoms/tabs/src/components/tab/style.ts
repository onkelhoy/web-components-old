export const style = `:host {
  --selected-background-color: var(--tab-light-selected-background-color, white);
  --selected-text-color: var(--tab-light-selected-text-color, black);
  --background-color: var(--tab-light-background-color, rgb(236, 236, 236));
  --text-color: var(--tab-light-text-color, black);
  --hover-background-color: var(--tab-light-hover-background-color,rgb(227, 227, 227));
  --hover-text-color: var(--tab-light-hover-text-color, black);
  --active-background-color: var(--tab-light-active-background-color,rgb(162, 162, 162));
  --active-text-color: var(--tab-light-active-text-color, black);
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  height: var(--tab-height, 3rem);
  cursor: var(--tab-cursor, var(--select-pointer, pointer));
  display: flex;
  padding: var(--tab-padding, 1rem 2rem);
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  white-space: nowrap; }

:host(:hover) {
  background-color: var(--hover-background-color);
  color: var(--hover-text-color); }

:host(:active) {
  background-color: var(--active-background-color);
  color: var(--active-text-color); }

@media (prefers-color-scheme: dark) {
  :host {
    --selected-background-color: var(--tab-light-selected-background-color, black);
    --selected-text-color: var(--tab-light-selected-text-color, white);
    --background-color: var(--tab-light-background-color, rgb(19, 19, 19));
    --text-color: var(--tab-light-text-color, white);
    --hover-background-color: var(--tab-light-hover-background-color,rgb(28, 28, 28));
    --hover-text-color: var(--tab-light-hover-text-color, white);
    --active-background-color: var(--tab-light-active-background-color,rgb(93, 93, 93));
    --active-text-color: var(--tab-light-active-text-color, white); } }

:host(.selected) {
  background-color: var(--selected-background-color) !important;
  color: var(--selected-text-color) !important; }

::slotted(*) {
  pointer-events: none; }`;
