export const style = `:host([size="small"]) o-box-template.wrapper {
  height: var(--o-field-height-small, var(--field-size-small, 32px)); }

:host([size="small"]) footer,
:host([size="small"]) header {
  height: var(--o-field-block-height-small, var(--field-size-small, 32px)); }

:host([size="medium"]) o-box-template.wrapper {
  height: var(--o-field-height-medium, var(--field-size-medium, 40px)); }

:host([size="medium"]) footer,
:host([size="medium"]) header {
  height: var(--o-field-block-height-medium, var(--field-size-small, 32px)); }

:host([size="large"]) o-box-template.wrapper {
  height: var(--o-field-height-large, var(--field-size-large, 56px)); }

:host([size="large"]) footer,
:host([size="large"]) header {
  height: var(--o-field-block-height-large, var(--field-size-small, 32px)); }

:host {
  --border: var(--o-field-background-color-light, var(--o-color-black, black));
  --outline: var(--o-field-background-color-light, rgb(90, 46, 250));
  --color: var(--o-field-text-color-light, var(--o-color-black, black));
  display: block;
  color: var(--color); }
  :host footer,
  :host header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--padding-small, 8px); }
  :host footer div {
    display: none;
    align-items: center;
    gap: var(--gap-small, 8px); }
  :host o-box-template.wrapper {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    padding-inline: var(--padding-medium, 16px);
    border: 1px solid var(--border); }
    :host o-box-template.wrapper ::slotted(*:not([slot])),
    :host o-box-template.wrapper input, :host o-box-template.wrapper select, :host o-box-template.wrapper textarea {
      color: inherit;
      font-family: var(--input-fontfamily, var(--typography-c3-fontfamily, 'Libre Franklin', helvetica, sans-serif));
      font-size: var(--input-fontsize, var(--typography-c3-fontsize, 16px));
      font-weight: var(--input-fontweight, var(--typography-c3-fontweight, 400));
      line-height: var(--input-lineheight, var(--typography-c3-lineheight, 24px));
      letter-spacing: var(--input-letterspacing, var(--typography-c3-letterspacing, 0.01em));
      flex-grow: 1;
      display: block;
      border: none;
      background-color: transparent;
      outline: none !important; }
    :host o-box-template.wrapper ::slotted(*[slot="prefix"]) {
      margin-right: var(--gap-small, 8px); }
    :host o-box-template.wrapper ::slotted(*[slot="suffix"]) {
      margin-left: var(--gap-small, 8px); }
  :host:focus {
    outline: none; }

:host([isWarning="true"]) footer div:not(.warning) {
  display: none; }

:host([isWarning="true"]) footer div.warning {
  display: flex; }

:host([isError="true"]) footer div:not(.error) {
  display: none; }

:host([isError="true"]) footer div.error {
  display: flex; }

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
