export const style = `:host {
  display: block;
  padding: 1rem;
  --background: var(--table-light-background-color, var(--colors-netural-white, white));
  --color: var(--table-light-text-color, var(--colors-netural-black, black));
  background-color: var(--background);
  color: var(--color); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--table-dark-background-color, var(--colors-netural-black, black));
    --color: var(--table-dark-text-color, var(--colors-netural-white, white)); } }`;