export const style = `:host(:not([resize="vertical"])) textarea {
  resize: none; }

:host([resize="vertical"]) textarea {
  resize: vertical; }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--textarea-dark-background-color, var(--colors-netural-black, black));
    --color: var(--textarea-dark-text-color, var(--colors-netural-white, white)); } }`;
