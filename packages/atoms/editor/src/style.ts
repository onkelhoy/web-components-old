export const style = `:host {
  display: block;
  padding: 1rem;
  --background: var(--o-editor-background-color-light, var(--o-color-white, white));
  --color: var(--o-editor-text-color-light, var(--o-color-black, black));
  background-color: var(--background);
  color: var(--color); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--o-editor-background-color-dark, var(--o-color-white, black));
    --color: var(--o-editor-text-color-dark, var(--o-color-black, white)); } }`;
