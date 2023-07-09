export const style = `:host {
  --color: var(--o-editor-input-text-color-light, var(--o-color-black, black));
  display: block; }

@media (prefers-color-scheme: dark) {
  :host {
    --color: var(--o-editor-input-text-color-dark, var(--o-color-black, white)); } }

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
