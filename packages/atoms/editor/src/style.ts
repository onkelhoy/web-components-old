export const style = `:host {
  display: block;
  padding: 1rem;
  --background: var(--editor-light-background-color, var(--colors-netural-white, white));
  --color: var(--editor-light-text-color, var(--colors-netural-black, black));
  background-color: var(--background);
  color: var(--color); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--editor-dark-background-color, var(--colors-netural-black, black));
    --color: var(--editor-dark-text-color, var(--colors-netural-white, white)); } }`;
