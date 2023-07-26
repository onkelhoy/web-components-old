export const style = `:host {
  cursor: var(--button-cursor, pointer);
  align-items: center;
  font-family: var(--button-font-family, var(--font-family, inherit));
  font-weight: var(--o-font-weight-semibold);
  justify-content: space-between;
  gap: 0.5rem;
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
  background-color: var(--background);
  color: var(--color); }

:host([mode="hug"]) {
  display: inline-flex; }

:host([mode="fill"]) {
  display: flex; }

:host([size="small"]) {
  font-size: var(--button-font-size-small, var(--font-size-small, 0.8rem));
  height: var(--button-height-small, var(--height-small, 20px));
  padding: var(--button-padding-small, var(--padding-small, 0.5rem));
  border-width: var(--button-border-width-small, var(--border-width-small, 1px)); }

:host([size="medium"]) {
  font-size: var(--button-font-size-medium, var(--font-size-medium, 1rem));
  height: var(--button-height-medium, var(--height-medium, 32px));
  padding: var(--button-padding-medium, var(--padding-medium, 1rem));
  border-width: var(--button-border-width-medium, var(--border-width-medium, 1px)); }

:host([size="large"]) {
  font-size: var(--button-font-size-large, var(--font-size-large, 1.2rem));
  height: var(--button-height-large, var(--height-large, 56px));
  padding: var(--button-padding-large, var(--padding-large, 1rem));
  border-width: var(--button-border-width-large, var(--border-width-large, 1px)); }

:host([color="primary"]) {
  --button-background: var(--o-color-primary-500);
  --button-color: var(--o-color-white);
  --button-background-hover: var(--o-color-primary-700);
  --button-color-hover: var(--o-color-white);
  --button-background-active: var(--o-color-primary-600);
  --button-color-active: var(--o-color-white);
  --button-background-disabled: var(--o-color-neutral-300);
  --button-color-disabled: var(--o-color-neutral-700); }

:host([color="danger"]) {
  --button-background: var(--o-color-danger-500);
  --button-color: var(--o-color-white);
  --button-background-hover: var(--o-color-danger-700);
  --button-color-hover: var(--o-color-white);
  --button-background-active: var(--o-color-danger-600);
  --button-color-active: var(--o-color-white);
  --button-background-disabled: var(--o-color-neutral-300);
  --button-color-disabled: var(--o-color-neutral-700); }

:host([color="success"]) {
  --button-background: var(--o-color-success-500);
  --button-color: var(--o-color-white);
  --button-background-hover: var(--o-color-success-700);
  --button-color-hover: var(--o-color-white);
  --button-background-active: var(--o-color-success-600);
  --button-color-active: var(--o-color-white);
  --button-background-disabled: var(--o-color-neutral-300);
  --button-color-disabled: var(--o-color-neutral-700); }

:host([color="warning"]) {
  --button-background: var(--o-color-warning-500);
  --button-color: var(--o-color-white);
  --button-background-hover: var(--o-color-warning-700);
  --button-color-hover: var(--o-color-white);
  --button-background-active: var(--o-color-warning-600);
  --button-color-active: var(--o-color-white);
  --button-background-disabled: var(--o-color-neutral-300);
  --button-color-disabled: var(--o-color-neutral-700); }

:host([color="secondary"]) {
  --button-background: var(--o-color-neutral-500);
  --button-color: var(--o-color-black);
  --button-background-hover: var(--o-color-neutral-700);
  --button-color-hover: var(--o-color-black);
  --button-background-active: var(--o-color-neutral-600);
  --button-color-active: var(--o-color-black);
  --button-background-disabled: var(--o-color-neutral-300);
  --button-color-disabled: var(--o-color-neutral-700); }

:host([color="brand"]) {
  --button-background: var(--o-color-neutral-500);
  --button-color: var(--o-color-black);
  --button-background-hover: var(--o-color-neutral-700);
  --button-color-hover: var(--o-color-black);
  --button-background-active: var(--o-color-neutral-600);
  --button-color-active: var(--o-color-black);
  --button-background-disabled: var(--o-color-neutral-300);
  --button-color-disabled: var(--o-color-neutral-700); }

:host([color="secondary"]) {
  --button-background: var(--o-color-neutral-100);
  --button-color: var(--o-color-black);
  --button-background-hover: var(--o-color-neutral-300);
  --button-color-hover: var(--o-color-black);
  --button-background-active: var(--o-color-neutral-200);
  --button-color-active: var(--o-color-black); }

:host([disabled]) {
  cursor: var(--button-cursor-disabled, not-allowed); }

:host([variant="filled"]) {
  --background: var(--button-background-color-filled, var(--button-background));
  --color: var(--button-text-color-filled, var(--button-color)); }

:host([variant="filled"]:hover) {
  --background: var(--button-background-color-filled-hover, var(--button-background-hover));
  --color: var(--button-text-color-filled-hover, var(--button-color-hover)); }

:host([variant="filled"]:active) {
  --background: var(--button-background-color-filled-active, var(--button-background-active));
  --color: var(--button-text-color-filled-active, var(--button-color-active)); }

:host([variant="filled"][disabled]) {
  --background: var(--button-background-color-filled-disabled, var(--button-background-disabled));
  --color: var(--button-text-color-filled-disabled, var(--button-color-disabled)); }

:host([variant="outlined"]) {
  border-color: var(--button-border-color-outlined, var(--button-background));
  border-style: var(--button-border-style, solid);
  --background: transparent; }

:host([variant="outlined"]:hover) {
  border-color: var(--button-border-color-outlined-hover, var(--button-background-hover));
  --background: var(--o-button-outlined-hover-background, var(--o-color-hover-200)); }

:host([variant="outlined"]:active) {
  border-color: var(--button-border-color-outlined-active, var(--button-background-active));
  --background: var(--o-button-outlined-active-background, var(--o-color-hover-400)); }

:host([variant="outlined"][disabled]) {
  border-color: var(--button-border-color-outlined-disabled, var(--button-background-disabled));
  --color: var(--o-button-outlined-disabled-text-color, var(--button-color-disabled));
  --background: transparent; }

:host([variant="clear"]) {
  --background: transparent; }

:host([variant="clear"]:hover) {
  --background: var(--o-button-clear-hover-background, var(--o-color-hover-200)); }

:host([variant="clear"]:active) {
  --background: var(--o-button-clear-active-background, var(--o-color-hover-400)); }

:host([variant="clear"][disabled]) {
  --color: var(--o-button-clear-disabled-text-color, var(--button-color-disabled));
  --background: transparent; }

:host([variant="underlined"]) {
  --background: transparent;
  text-decoration: underline;
  text-underline-offset: var(--gap-smaller);
  text-decoration-thickness: var(--button-underlined-thickness, 1px); }

:host([variant="underlined"]:hover) {
  text-decoration-thickness: var(--button-underlined-hover-thickness, 2px); }

:host([variant="underlined"]:active) {
  text-decoration-thickness: var(--button-underlined-active-thickness, 3px); }

:host([variant="underlined"][disabled]) {
  text-decoration-thickness: var(--button-underlined-disabled-thickness, 1px);
  --color: var(--o-button-underlined-disabled-text-color, var(--button-color-disabled));
  --background: transparent; }`;
