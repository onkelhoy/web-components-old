export const style = `:host([size="small"]) o-box-template.wrapper {
  height: var(--field-height-small, var(--height-small, 20px)); }

:host([size="medium"]) o-box-template.wrapper {
  height: var(--field-height-medium, var(--height-medium, 32px)); }

:host([size="large"]) o-box-template.wrapper {
  height: var(--field-height-large, var(--height-large, 56px)); }

:host {
  --border: var(--o-field-background-color-light, var(--o-color-black, black));
  --outline: var(--o-field-background-color-light, rgb(90, 46, 250));
  --color: var(--o-field-text-color-light, var(--o-color-black, black));
  display: block;
  color: var(--color); }
  :host o-box-template.wrapper {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding-inline: 0.5rem;
    border: 1px solid var(--border); }
    :host o-box-template.wrapper ::slotted(*:not([slot])),
    :host o-box-template.wrapper input, :host o-box-template.wrapper select, :host o-box-template.wrapper textarea {
      color: inherit;
      font-family: var(--input-fontfamily, var(--typography-c3-fontfamily));
      font-size: var(--input-fontsize, var(--typography-c3-fontsize, 16px));
      font-weight: var(--input-fontweight, var(--typography-c3-fontweight, 400));
      line-height: var(--input-lineheight, var(--typography-c3-lineheight, 24px));
      letter-spacing: var(--input-letterspacing, var(--typography-c3-letterspacing, 0.01em));
      flex-grow: 1;
      display: block;
      border: none;
      background-color: transparent;
      outline: none !important; }
  :host:focus {
    outline: none; }

:host([hasfocus="true"]),
:host(:focus) {
  outline: none; }
  :host([hasfocus="true"]) o-box-template.wrapper,
  :host(:focus) o-box-template.wrapper {
    outline: 1px solid var(--outline); }

@media (prefers-color-scheme: dark) {
  :host {
    --border: var(--o-field-background-color-dark, var(--o-color-black, white));
    --outline: var(--o-field-background-color-dark, rgb(195, 211, 255));
    --color: var(--o-field-text-color-dark, var(--o-color-black, white)); } }`;
