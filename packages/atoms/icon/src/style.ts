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
  width: var(--container-size-small);
  height: var(--container-size-small); }

:host([container="medium"]) {
  width: var(--container-size-medium);
  height: var(--container-size-medium); }

:host([container="large"]) {
  width: var(--container-size-large);
  height: var(--container-size-large); }

svg {
  fill: currentColor; }

:host([data-hide-slot="true"])::part(fallback) {
  display: none; }

:host([data-hide-slot="false"]) {
  width: fit-content; }
  :host([data-hide-slot="false"]) svg {
    display: none; }`;
