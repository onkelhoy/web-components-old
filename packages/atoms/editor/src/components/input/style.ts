export const style = `:host {
  --color: var(--editor-input-light-text-color, var(--colors-netural-black, black));
  display: block; }

@media (prefers-color-scheme: dark) {
  :host {
    --color: var(--editor-input-dark-text-color, var(--colors-netural-white, white)); } }

.controls {
  display: flex;
  gap: 0.5rem; }
  .controls o-button {
    gap: 0;
    padding: 0; }
    .controls o-button o-icon {
      color: var(--color); }

div#editor {
  padding: 2px; }`;
