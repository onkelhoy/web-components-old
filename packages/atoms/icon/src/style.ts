export const style = `:host {
  display: inline-block;
  width: var(--icon-custom-size);
  height: var(--icon-custom-size); }

:host([size="small"]) {
  --icon-custom-size: var(--icon-size-small, 30); }

:host([size="medium"]) {
  --icon-custom-size: var(--icon-size-medium, 48); }

:host([size="large"]) {
  --icon-custom-size: var(--icon-size-large, 60); }

svg {
  width: inherit;
  height: inherit;
  fill: currentColor;
  stroke: currentColor; }`;
