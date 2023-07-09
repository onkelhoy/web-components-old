export const style = `:host {
  --selected-background-color: var(--o-tab-selected-background-color-light, white);
  --selected-text-color: var(--o-tab-selected-text-color-light, black);
  --background-color: var(--o-tab-background-color-light, rgb(236, 236, 236));
  --text-color: var(--o-tab-text-color-light, black);
  --hover-background-color: var(--o-tab-hover-background-color-light,rgb(227, 227, 227));
  --hover-text-color: var(--o-tab-hover-text-color-light, black);
  --active-background-color: var(--o-tab-active-background-color-light,rgb(162, 162, 162));
  --active-text-color: var(--o-tab-active-text-color-light, black);
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  height: var(--o-tab-height, 3rem);
  cursor: var(--o-tab-cursor, var(--select-pointer, pointer));
  display: flex;
  padding: var(--o-tab-padding, 1rem 2rem);
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
    --selected-background-color: var(--o-tab-selected-background-color-dark, black);
    --selected-text-color: var(--o-tab-selected-text-color-dark, white);
    --background-color: var(--o-tab-background-color-dark, rgb(19, 19, 19));
    --text-color: var(--o-tab-text-color-dark, white);
    --hover-background-color: var(--o-tab-hover-background-colo-darkr,rgb(28, 28, 28));
    --hover-text-color: var(--o-tab-hover-text-color-dark, white);
    --active-background-color: var(--o-tab-active-background-colo-darkr,rgb(93, 93, 93));
    --active-text-color: var(--o-tab-active-text-color-dark, white); } }

:host(.selected) {
  background-color: var(--selected-background-color) !important;
  color: var(--selected-text-color) !important; }

::slotted(*) {
  pointer-events: none; }`;
