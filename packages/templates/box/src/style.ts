export const style = `:host {
  --shadow-color: var(--box-shadow-light-color, rgba(0, 0, 0, 0.1)); }

@media (prefers-color-scheme: dark) {
  :host {
    --shadow-color: var(--box-shadow-dark-color, rgb(0, 0, 0)); } }

:host([radius="none"]) {
  border-radius: var(--box-radius-none, var(--radius-none, 0px)); }

:host([radius="small"]) {
  border-radius: var(--box-radius-small, var(--radius-small, 4px)); }

:host([radius="medium"]) {
  border-radius: var(--box-radius-medium, var(--radius-medium, 8px)); }

:host([radius="large"]) {
  border-radius: var(--box-radius-large, var(--radius-large, 16px)); }

:host([radius="circular"]) {
  border-radius: var(--box-radius-circular, var(--radius-circular, 1000px)); }

:host([elevation="none"]) {
  box-shadow: var(--box-shadow-none, var(--shadow-none, none)); }

:host([elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-small, 0 2px 4px var(--shadow-color))); }

:host([elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-medium, 0 2px 8px 2px var(--shadow-color))); }

:host([elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-large, 0 2px 15px 5px var(--shadow-color))); }`;
