export const style = `:host {
  --background: var(--o-textinput-background-light, var(--o-color-white)); }
  :host o-box-template.wrapper {
    background-color: var(--background); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--o-textinput-background-dark, var(--o-color-white)); } }`;