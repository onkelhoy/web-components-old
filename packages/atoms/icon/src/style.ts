export const style = `:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--icon-custom-size);
  height: var(--icon-custom-size); }

:host([size="small"]) {
  --icon-custom-size: var(--icon-size-small, 16px); }

:host([size="medium"]) {
  --icon-custom-size: var(--icon-size-medium, 20px); }

:host([size="large"]) {
  --icon-custom-size: var(--icon-size-large, 40px); }

:host(:not([container])) svg {
  width: inherit;
  height: inherit; }

:host([container]) {
  display: flex; }
  :host([container]) svg {
    width: var(--icon-custom-size);
    height: var(--icon-custom-size); }

:host([container="small"]) {
  width: var(--field-size-small);
  height: var(--field-size-small); }

:host([container="medium"]) {
  width: var(--field-size-medium);
  height: var(--field-size-medium); }

:host([container="large"]) {
  width: var(--field-size-large);
  height: var(--field-size-large); }

svg {
  fill: currentColor; }

:host([data-hide-slot="true"])::part(fallback) {
  display: none; }

:host([data-hide-slot="false"]) {
  width: fit-content; }
  :host([data-hide-slot="false"]) svg {
    display: none; }`;
