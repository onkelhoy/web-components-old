export const style = `:host([size="small"]) o-box-template.wrapper {
  height: var(--field-height-small, var(--height-small, 20px)); }

:host([size="medium"]) o-box-template.wrapper {
  height: var(--field-height-medium, var(--height-medium, 32px)); }

:host([size="large"]) o-box-template.wrapper {
  height: var(--field-height-large, var(--height-large, 56px)); }

:host {
  --border: var(--field-light-background-color, var(--colors-netural-black, rgb(0, 0, 0)));
  --outline: var(--field-light-background-color, rgb(90, 46, 250));
  --color: var(--field-light-text-color, var(--colors-netural-white, rgb(0, 0, 0)));
  --default-fontfamily: 'Poppins', sans-serif;
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
      font-family: var(--input-fontfamily, var(--typography-c3-fontfamily, var(--default-fontfamily)));
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
    --border: var(--field-dark-background-color, var(--colors-netural-white, rgb(255, 255, 255)));
    --outline: var(--field-dark-background-color, rgb(195, 211, 255));
    --color: var(--field-dark-text-color, var(--colors-netural-white, white)); } }`;
