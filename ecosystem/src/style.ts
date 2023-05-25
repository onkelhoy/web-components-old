export const style = `:host {
  display: block;
  padding: 1rem;
  background-color: var(--ecosystem-background-color, var(--colors-netural-white, white));
  color: var(--ecosystem-text-color, var(--colors-netural-black, black)); }

@media (prefers-color-scheme: dark) {
  :host {
    --ecosystem-background-color: black;
    --ecosystem-text-color: white; } }`;
