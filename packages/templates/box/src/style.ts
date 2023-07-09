export const style = `:host {
  --shadow-color: var(--o-box-shadow-color-light, var(--o-color-shadow-500)); }

@media (prefers-color-scheme: dark) {
  :host {
    --shadow-color: var(--o-box-shadow-color-dark, var(--o-color-shadow-500)); } }

:host([radius="none"]) {
  border-radius: var(--box-radius-none, var(--radius-none, 0px)); }

:host([radius="small"]) {
  border-radius: var(--box-radius-small, var(--radius-small, var(--radius-small))); }

:host([radius="medium"]) {
  border-radius: var(--box-radius-medium, var(--radius-medium, var(--radius-medium))); }

:host([radius="large"]) {
  border-radius: var(--box-radius-large, var(--radius-large, var(--radius-large))); }

:host([radius="circular"]) {
  border-radius: var(--box-radius-circular, var(--radius-circular, var(--radius-max))); }

:host([elevation="none"]) {
  box-shadow: var(--box-shadow-none, var(--shadow-none, none)); }

:host([elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-small, 0 2px 4px var(--shadow-color))); }

:host([elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-medium, 4px 0px 32px 0px var(--shadow-color))); }

:host([elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-large, 0 2px 15px 5px var(--shadow-color))); }`;
