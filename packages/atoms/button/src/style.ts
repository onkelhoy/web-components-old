export const style = `:host {
  cursor: var(--button-cursor, pointer);
  align-items: center;
  font-family: var(--button-font-family, var(--font-family, inherit));
  justify-content: space-between;
  gap: 0.5rem;
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */ }

:host([mode="hug"]) {
  display: inline-flex; }

:host([mode="fill"]) {
  display: flex; }

:host([size="small"]) {
  font-size: var(--button-font-size-small, var(--font-size-small, 0.8rem));
  height: var(--button-height-small, var(--height-small, 20px));
  padding: var(--button-padding, var(--padding-small, 0.5rem));
  border-width: var(--button-border-width, var(--border-width-small, 2px)); }

:host([size="medium"]) {
  font-size: var(--button-font-size-medium, var(--font-size-medium, 1rem));
  height: var(--button-height-medium, var(--height-medium, 32px));
  padding: var(--button-padding, var(--padding-medium, 1rem));
  border-width: var(--button-border-width, var(--border-width-medium, 3px)); }

:host([size="large"]) {
  font-size: var(--button-font-size-large, var(--font-size-large, 1.2rem));
  height: var(--button-height-large, var(--height-large, 48px));
  padding: var(--button-padding, var(--padding-large, 1rem));
  border-width: var(--button-border-width, var(--border-width-large, 4px)); }

:host([variant="clear"]) {
  background-color: var(--button-background-color-clear, transparent);
  color: var(--button-text-color-clear, var(--color500)); }

:host([variant="clear"]:hover) {
  background-color: var(--button-background-color-clear-hover, transparent);
  color: var(--button-text-color-clear-hover, var(--color600)); }

:host([variant="clear"]:active) {
  background-color: var(--button-background-color-clear-active, var(--color3000));
  color: var(--button-background-text-color-clear-active, var(--color700)); }

:host([variant="clear"][disabled]) {
  background-color: var(--button-background-color-clear-disabled, transparent);
  color: var(--button-text-color-clear-disabled, var(--disabled-text-color, var(--color3100))); }

:host([variant="underlined"]) {
  background-color: var(--button-background-color-underlined, transparent);
  color: var(--button-text-color-underlined, var(--color500)); }

:host([variant="underlined"]:hover) {
  background-color: var(--button-background-color-underlined-hover, transparent);
  color: var(--button-text-color-underlined-hover, var(--color600)); }

:host([variant="underlined"]:active) {
  background-color: var(--button-background-color-underlined-active, var(--color3000));
  color: var(--button-background-text-color-underlined-active, var(--color700)); }

:host([variant="underlined"][disabled]) {
  background-color: var(--button-background-color-underlined-disabled, transparent);
  color: var(--button-text-color-underlined-disabled, var(--disabled-text-color, var(--color3100))); }

:host([variant="outlined"]) {
  background-color: var(--button-background-color-outlined, transparent);
  color: var(--button-text-color-outlined, var(--color500)); }

:host([variant="outlined"]:hover) {
  background-color: var(--button-background-color-outlined-hover, transparent);
  color: var(--button-text-color-outlined-hover, var(--color600)); }

:host([variant="outlined"]:active) {
  background-color: var(--button-background-color-outlined-active, var(--color3000));
  color: var(--button-background-text-color-outlined-active, var(--color700)); }

:host([variant="outlined"][disabled]) {
  background-color: var(--button-background-color-outlined-disabled, transparent);
  color: var(--button-text-color-outlined-disabled, var(--disabled-text-color, var(--color3100))); }

:host([disabled]) {
  cursor: var(--button-cursor-disabled, not-allowed); }

:host([variant="filled"]) {
  background-color: var(--button-background-color-filled, var(--color500));
  color: var(--button-text-color-filled, var(--text-color500)); }

:host([variant="filled"]:hover) {
  background-color: var(--button-background-color-filled-hover, var(--color600));
  color: var(--button-text-color-filled-hover, var(--text-color600)); }

:host([variant="filled"]:active) {
  background-color: var(--button-background-color-filled-active, var(--color700));
  color: var(--button-text-color-filled-active, var(--text-color700)); }

:host([variant="filled"][disabled]) {
  background-color: var(--button-background-color-filled-disabled, var(--color1400));
  color: var(--button-text-color-filled-disabled, var(--disabled-text-color, var(--color3000))); }

:host([variant="outlined"]) {
  border-color: var(--button-border-color-outlined, var(--color500));
  border-style: var(--button-border-style, solid); }

:host([variant="outlined"]:hover) {
  border-color: var(--button-border-color-outlined-hover, var(--color600)); }

:host([variant="outlined"]:active) {
  border-color: var(--button-border-color-outlined-active, var(--color700)); }

:host([variant="outlined"][disabled]) {
  border-color: var(--button-border-color-outlined-disabled, var(--color1400)); }

:host([variant="underlined"]) {
  text-decoration: underline;
  text-decoration-thickness: var(--button-underlined-thickness, 1px); }

:host([variant="underlined"]:hover) {
  text-decoration-thickness: var(--button-underlined-hover-thickness, 2px); }

:host([variant="underlined"]:active) {
  text-decoration-thickness: var(--button-underlined-active-thickness, 2px); }

:host([variant="underlined"][disabled]) {
  text-decoration-thickness: var(--button-underlined-disabled-thickness, 1px); }`;
