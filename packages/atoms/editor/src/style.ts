export const style = `:host {
  display: block;
  padding: 1rem;
  --background: var(--pap-editor-background-color-light, var(--pap-color-neutral-50, white));
  --color: var(--pap-editor-text-color-light, var(--pap-color-black, black));
  background-color: var(--background);
  color: var(--color); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--pap-editor-background-color-dark, var(--pap-color-neutral-50, black));
    --color: var(--pap-editor-text-color-dark, var(--pap-color-black, white)); } }`;
