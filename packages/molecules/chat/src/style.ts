export const style = `:host {
  display: block;
  padding: 1rem;
  --background: var(--chat-light-background-color, var(--colors-netural-white, white));
  --color: var(--chat-light-text-color, var(--colors-netural-black, black));
  background-color: var(--background);
  color: var(--color); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--chat-dark-background-color, var(--colors-netural-black, black));
    --color: var(--chat-dark-text-color, var(--colors-netural-white, white)); } }`;