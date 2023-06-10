export const style = `:host {
  display: block; }
  :host div.input {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.2rem;
    padding-inline: 0.5rem;
    border: 1px solid black; }
    :host div.input input, :host div.input select, :host div.input textarea {
      display: block;
      padding-block: 0.5rem;
      border: none;
      background-color: transparent; }
      :host div.input input:focus, :host div.input select:focus, :host div.input textarea:focus {
        outline: none; }
  :host:focus {
    outline: none; }

:host([hasfocus="true"]),
:host(:focus) {
  outline: none; }
  :host([hasfocus="true"]) div.input,
  :host(:focus) div.input {
    outline: 1px solid blue; }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--field-dark-background-color, var(--colors-netural-black, black));
    --color: var(--field-dark-text-color, var(--colors-netural-white, white)); } }`;
