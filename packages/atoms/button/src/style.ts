export const style = `:host {
  cursor: var(--o-button-cursor, pointer);
  align-items: center;
  justify-content: space-evenly;
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
  border-style: solid;
  border-width: 2px;
  border-color: transparent;
  transition: background-color ease-in 80ms; }

span.content {
  padding-inline: var(--gap-small);
  display: flex;
  align-items: center;
  justify-content: center; }

:host([variant="outlined"]:is(:active)),
:host([variant="outlined"]:is(:hover)) {
  border-color: transparent !important; }

:host([mode="hug"]) {
  display: inline-flex; }

:host([mode="fill"]) {
  display: flex; }

:host([textvariant="B1"]),
:host([textvariant="button1"]) {
  font-family: var(--typography-b1-fontfamily);
  font-size: var(--typography-b1-fontsize);
  font-weight: var(--typography-b1-fontweight);
  line-height: var(--typography-b1-lineheight);
  letter-spacing: var(--typography-b1-letterspacing); }

:host([color="secondary"][variant="clear"]),
:host([color="inverse"][variant="clear"]),
:host([textvariant="B2"]),
:host([textvariant="button2"]) {
  font-family: var(--typography-b2-fontfamily);
  font-size: var(--typography-b2-fontsize);
  font-weight: var(--typography-b2-fontweight);
  line-height: var(--typography-b2-lineheight);
  letter-spacing: var(--typography-b2-letterspacing);
  text-decoration: underline; }

:host([variant="filled"][color="primary"]:not([disabled]).default),
:host([variant="filled"][color="primary"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-primary-filled-default-background, var(--o-color-bg-brand));
  color: var(--o-button-primary-filled-default-text, var(--o-color-text-onbrand)); }

:host([variant="filled"][color="primary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="primary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-primary-filled-default-icon, var(--o-color-icon-onbrand)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-primary-filled-default-icon, var(--o-color-icon-onbrand)); }

:host([variant="filled"][color="primary"]:not([disabled]).hover),
:host([variant="filled"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-primary-filled-hover-background, var(--o-color-bg-brand-hover));
  color: var(--o-button-primary-filled-hover-text, var(--o-color-text-onbrand-hover)); }

:host([variant="filled"][color="primary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="primary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-primary-filled-hover-icon, var(--o-color-icon-onbrand-hover)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-primary-filled-hover-icon, var(--o-color-icon-onbrand-hover)); }

:host([variant="filled"][color="primary"]:not([disabled]).pressed),
:host([variant="filled"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-primary-filled-pressed-background, var(--o-color-bg-brand-pressed));
  color: var(--o-button-primary-filled-pressed-text, var(--o-color-text-onbrand-pressed)); }

:host([variant="filled"][color="primary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="primary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-primary-filled-pressed-icon, var(--o-color-icon-onbrand-pressed)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-primary-filled-pressed-icon, var(--o-color-icon-onbrand-pressed)); }

:host([variant="outlined"][color="primary"]:not([disabled]).default),
:host([variant="outlined"][color="primary"]:not([disabled])) {
  border-color: var(--o-button-primary-outlined-default-border, var(--o-color-border-brand));
  color: var(--o-button-primary-outlined-default-text, var(--o-color-text-brand)); }

:host([variant="outlined"][color="primary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="primary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-primary-outlined-default-icon, var(--o-color-icon-brand)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-primary-outlined-default-icon, var(--o-color-icon-brand)); }

:host([variant="outlined"][color="primary"]:not([disabled]).hover),
:host([variant="outlined"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-primary-outlined-hover-background, var(--o-color-bg-brand-hover));
  color: var(--o-button-primary-outlined-hover-text, var(--o-color-text-onbrand-hover)); }

:host([variant="outlined"][color="primary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="primary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-primary-outlined-hover-icon, var(--o-color-icon-onbrand-hover)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-primary-outlined-hover-icon, var(--o-color-icon-onbrand-hover)); }

:host([variant="outlined"][color="primary"]:not([disabled]).pressed),
:host([variant="outlined"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-primary-outlined-pressed-background, var(--o-color-bg-brand-pressed));
  color: var(--o-button-primary-outlined-pressed-text, var(--o-color-text-onbrand-pressed)); }

:host([variant="outlined"][color="primary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="primary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-primary-outlined-pressed-icon, var(--o-color-icon-onbrand-pressed)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-primary-outlined-pressed-icon, var(--o-color-icon-onbrand-pressed)); }

:host([variant="clear"][color="primary"]:not([disabled]).default),
:host([variant="clear"][color="primary"]:not([disabled])) {
  color: var(--o-button-primary-clear-default-text, var(--o-color-text-brand)); }

:host([variant="clear"][color="primary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="primary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-primary-clear-default-icon, var(--o-color-icon-brand)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-primary-clear-default-icon, var(--o-color-icon-brand)); }

:host([variant="clear"][color="primary"]:not([disabled]).hover),
:host([variant="clear"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-primary-clear-hover-background, var(--o-color-bg-hover));
  color: var(--o-button-primary-clear-hover-text, var(--o-color-text-brand-hover)); }

:host([variant="clear"][color="primary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="primary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-primary-clear-hover-icon, var(--o-color-icon-brand-hover)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-primary-clear-hover-icon, var(--o-color-icon-brand-hover)); }

:host([variant="clear"][color="primary"]:not([disabled]).pressed),
:host([variant="clear"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-primary-clear-pressed-background, var(--o-color-bg-pressed));
  color: var(--o-button-primary-clear-pressed-text, var(--o-color-text-brand-pressed)); }

:host([variant="clear"][color="primary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="primary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-primary-clear-pressed-icon, var(--o-color-icon-brand-pressed)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-primary-clear-pressed-icon, var(--o-color-icon-brand-pressed)); }

:host([variant="filled"][color="secondary"]:not([disabled]).default),
:host([variant="filled"][color="secondary"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-secondary-filled-default-background, var(--o-color-bg-inverse));
  color: var(--o-button-secondary-filled-default-text, var(--o-color-text-oninverse)); }

:host([variant="filled"][color="secondary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="secondary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-secondary-filled-default-icon, var(--o-color-icon-oninverse)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-secondary-filled-default-icon, var(--o-color-icon-oninverse)); }

:host([variant="filled"][color="secondary"]:not([disabled]).hover),
:host([variant="filled"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-secondary-filled-hover-background, var(--o-color-bg-inverse-hover));
  color: var(--o-button-secondary-filled-hover-text, var(--o-color-text-oninverse-hover)); }

:host([variant="filled"][color="secondary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="secondary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-secondary-filled-hover-icon, var(--o-color-icon-oninverse-hover)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-secondary-filled-hover-icon, var(--o-color-icon-oninverse-hover)); }

:host([variant="filled"][color="secondary"]:not([disabled]).pressed),
:host([variant="filled"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-secondary-filled-pressed-background, var(--o-color-bg-inverse-pressed));
  color: var(--o-button-secondary-filled-pressed-text, var(--o-color-text-oninverse-pressed)); }

:host([variant="filled"][color="secondary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="secondary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-secondary-filled-pressed-icon, var(--o-color-icon-oninverse-pressed)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-secondary-filled-pressed-icon, var(--o-color-icon-oninverse-pressed)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).default),
:host([variant="outlined"][color="secondary"]:not([disabled])) {
  border-color: var(--o-button-secondary-outlined-default-border, var(--o-color-border-inverse));
  color: var(--o-button-secondary-outlined-default-text, var(--o-color-text)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="secondary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-secondary-outlined-default-icon, var(--o-color-icon)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-secondary-outlined-default-icon, var(--o-color-icon)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).hover),
:host([variant="outlined"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-secondary-outlined-hover-background, var(--o-color-bg-inverse-hover));
  color: var(--o-button-secondary-outlined-hover-text, var(--o-color-text-oninverse-hover)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="secondary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-secondary-outlined-hover-icon, var(--o-color-icon-oninverse-hover)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-secondary-outlined-hover-icon, var(--o-color-icon-oninverse-hover)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).pressed),
:host([variant="outlined"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-secondary-outlined-pressed-background, var(--o-color-bg-inverse-pressed));
  color: var(--o-button-secondary-outlined-pressed-text, var(--o-color-text-oninverse-pressed)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="secondary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-secondary-outlined-pressed-icon, var(--o-color-icon-oninverse-pressed)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-secondary-outlined-pressed-icon, var(--o-color-icon-oninverse-pressed)); }

:host([variant="clear"][color="secondary"]:not([disabled]).default),
:host([variant="clear"][color="secondary"]:not([disabled])) {
  color: var(--o-button-secondary-clear-default-text, var(--o-color-text)); }

:host([variant="clear"][color="secondary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="secondary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-secondary-clear-default-icon, var(--o-color-icon)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-secondary-clear-default-icon, var(--o-color-icon)); }

:host([variant="clear"][color="secondary"]:not([disabled]).hover),
:host([variant="clear"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-secondary-clear-hover-background, var(--o-color-bg-hover));
  color: var(--o-button-secondary-clear-hover-text, var(--o-color-text)); }

:host([variant="clear"][color="secondary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="secondary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-secondary-clear-hover-icon, var(--o-color-icon)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-secondary-clear-hover-icon, var(--o-color-icon)); }

:host([variant="clear"][color="secondary"]:not([disabled]).pressed),
:host([variant="clear"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-secondary-clear-pressed-background, var(--o-color-bg-pressed));
  color: var(--o-button-secondary-clear-pressed-text, var(--o-color-text)); }

:host([variant="clear"][color="secondary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="secondary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-secondary-clear-pressed-icon, var(--o-color-icon)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-secondary-clear-pressed-icon, var(--o-color-icon)); }

:host([variant="filled"][color="inverse"]:not([disabled]).default),
:host([variant="filled"][color="inverse"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-inverse-filled-default-background, var(--o-color-bg));
  color: var(--o-button-inverse-filled-default-text, var(--o-color-text)); }

:host([variant="filled"][color="inverse"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="inverse"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-inverse-filled-default-icon, var(--o-color-icon)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-inverse-filled-default-icon, var(--o-color-icon)); }

:host([variant="filled"][color="inverse"]:not([disabled]).hover),
:host([variant="filled"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-inverse-filled-hover-background, var(--o-color-bg-hover));
  color: var(--o-button-inverse-filled-hover-text, var(--o-color-text)); }

:host([variant="filled"][color="inverse"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="inverse"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-inverse-filled-hover-icon, var(--o-color-icon)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-inverse-filled-hover-icon, var(--o-color-icon)); }

:host([variant="filled"][color="inverse"]:not([disabled]).pressed),
:host([variant="filled"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-inverse-filled-pressed-background, var(--o-color-bg-pressed));
  color: var(--o-button-inverse-filled-pressed-text, var(--o-color-text)); }

:host([variant="filled"][color="inverse"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="inverse"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-inverse-filled-pressed-icon, var(--o-color-icon)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-inverse-filled-pressed-icon, var(--o-color-icon)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).default),
:host([variant="outlined"][color="inverse"]:not([disabled])) {
  border-color: var(--o-button-inverse-outlined-default-border, var(--o-color-border-inverse-strong));
  color: var(--o-button-inverse-outlined-default-text, var(--o-color-text-inverse)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="inverse"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-inverse-outlined-default-icon, var(--o-color-icon-inverse)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-inverse-outlined-default-icon, var(--o-color-icon-inverse)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).hover),
:host([variant="outlined"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-inverse-outlined-hover-background, var(--o-color-bg-hover));
  color: var(--o-button-inverse-outlined-hover-text, var(--o-color-text)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="inverse"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-inverse-outlined-hover-icon, var(--o-color-icon)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-inverse-outlined-hover-icon, var(--o-color-icon)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).pressed),
:host([variant="outlined"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-inverse-outlined-pressed-background, var(--o-color-bg-pressed));
  color: var(--o-button-inverse-outlined-pressed-text, var(--o-color-text)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="inverse"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-inverse-outlined-pressed-icon, var(--o-color-icon)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-inverse-outlined-pressed-icon, var(--o-color-icon)); }

:host([variant="clear"][color="inverse"]:not([disabled]).default),
:host([variant="clear"][color="inverse"]:not([disabled])) {
  color: var(--o-button-inverse-clear-default-text, var(--o-color-text-inverse)); }

:host([variant="clear"][color="inverse"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="inverse"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-inverse-clear-default-icon, var(--o-color-icon-inverse)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-inverse-clear-default-icon, var(--o-color-icon-inverse)); }

:host([variant="clear"][color="inverse"]:not([disabled]).hover),
:host([variant="clear"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-inverse-clear-hover-background, var(--o-color-bg-inverse-hover));
  color: var(--o-button-inverse-clear-hover-text, var(--o-color-text-oninverse-hover)); }

:host([variant="clear"][color="inverse"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="inverse"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-inverse-clear-hover-icon, var(--o-color-icon-oninverse-hover)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-inverse-clear-hover-icon, var(--o-color-icon-oninverse-hover)); }

:host([variant="clear"][color="inverse"]:not([disabled]).pressed),
:host([variant="clear"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-inverse-clear-pressed-background, var(--o-color-bg-inverse-pressed));
  color: var(--o-button-inverse-clear-pressed-text, var(--o-color-text-oninverse-pressed)); }

:host([variant="clear"][color="inverse"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="inverse"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-inverse-clear-pressed-icon, var(--o-color-icon-oninverse-pressed)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-inverse-clear-pressed-icon, var(--o-color-icon-oninverse-pressed)); }

:host([variant="filled"][color="danger"]:not([disabled]).default),
:host([variant="filled"][color="danger"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-danger-filled-default-background, var(--o-color-bg-danger));
  color: var(--o-button-danger-filled-default-text, var(--o-color-text-ondanger)); }

:host([variant="filled"][color="danger"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="danger"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-danger-filled-default-icon, var(--o-color-icon-ondanger)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-danger-filled-default-icon, var(--o-color-icon-ondanger)); }

:host([variant="filled"][color="danger"]:not([disabled]).hover),
:host([variant="filled"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-danger-filled-hover-background, var(--o-color-bg-danger-hover));
  color: var(--o-button-danger-filled-hover-text, var(--o-color-text-ondanger-hover)); }

:host([variant="filled"][color="danger"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="danger"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-danger-filled-hover-icon, var(--o-color-icon-ondanger-hover)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-danger-filled-hover-icon, var(--o-color-icon-ondanger-hover)); }

:host([variant="filled"][color="danger"]:not([disabled]).pressed),
:host([variant="filled"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-danger-filled-pressed-background, var(--o-color-bg-danger-pressed));
  color: var(--o-button-danger-filled-pressed-text, var(--o-color-text-ondanger-pressed)); }

:host([variant="filled"][color="danger"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="danger"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-danger-filled-pressed-icon, var(--o-color-icon-ondanger-pressed)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-danger-filled-pressed-icon, var(--o-color-icon-ondanger-pressed)); }

:host([variant="outlined"][color="danger"]:not([disabled]).default),
:host([variant="outlined"][color="danger"]:not([disabled])) {
  border-color: var(--o-button-danger-outlined-default-border, var(--o-color-border-danger));
  color: var(--o-button-danger-outlined-default-text, var(--o-color-text-danger)); }

:host([variant="outlined"][color="danger"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="danger"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-danger-outlined-default-icon, var(--o-color-icon-danger)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-danger-outlined-default-icon, var(--o-color-icon-danger)); }

:host([variant="outlined"][color="danger"]:not([disabled]).hover),
:host([variant="outlined"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-danger-outlined-hover-background, var(--o-color-bg-danger-hover));
  color: var(--o-button-danger-outlined-hover-text, var(--o-color-text-ondanger-hover)); }

:host([variant="outlined"][color="danger"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="danger"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-danger-outlined-hover-icon, var(--o-color-icon-ondanger-hover)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-danger-outlined-hover-icon, var(--o-color-icon-ondanger-hover)); }

:host([variant="outlined"][color="danger"]:not([disabled]).pressed),
:host([variant="outlined"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-danger-outlined-pressed-background, var(--o-color-bg-danger-pressed));
  color: var(--o-button-danger-outlined-pressed-text, var(--o-color-text-ondanger-pressed)); }

:host([variant="outlined"][color="danger"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="danger"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-danger-outlined-pressed-icon, var(--o-color-icon-ondanger-pressed)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-danger-outlined-pressed-icon, var(--o-color-icon-ondanger-pressed)); }

:host([variant="clear"][color="danger"]:not([disabled]).default),
:host([variant="clear"][color="danger"]:not([disabled])) {
  color: var(--o-button-danger-clear-default-text, var(--o-color-text-danger)); }

:host([variant="clear"][color="danger"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="danger"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-danger-clear-default-icon, var(--o-color-icon-danger)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-danger-clear-default-icon, var(--o-color-icon-danger)); }

:host([variant="clear"][color="danger"]:not([disabled]).hover),
:host([variant="clear"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-danger-clear-hover-background, var(--o-color-bg-danger-hover));
  color: var(--o-button-danger-clear-hover-text, var(--o-color-text-ondanger-hover)); }

:host([variant="clear"][color="danger"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="danger"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-danger-clear-hover-icon, var(--o-color-icon-ondanger-hover)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-danger-clear-hover-icon, var(--o-color-icon-ondanger-hover)); }

:host([variant="clear"][color="danger"]:not([disabled]).pressed),
:host([variant="clear"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-danger-clear-pressed-background, var(--o-color-bg-danger-pressed));
  color: var(--o-button-danger-clear-pressed-text, var(--o-color-text-ondanger-pressed)); }

:host([variant="clear"][color="danger"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="danger"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-danger-clear-pressed-icon, var(--o-color-icon-ondanger-pressed)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-danger-clear-pressed-icon, var(--o-color-icon-ondanger-pressed)); }

:host([variant="filled"][color="success"]:not([disabled]).default),
:host([variant="filled"][color="success"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-success-filled-default-background, var(--o-color-bg-success));
  color: var(--o-button-success-filled-default-text, var(--o-color-text-onsuccess)); }

:host([variant="filled"][color="success"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="success"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-success-filled-default-icon, var(--o-color-icon-onsuccess)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-success-filled-default-icon, var(--o-color-icon-onsuccess)); }

:host([variant="filled"][color="success"]:not([disabled]).hover),
:host([variant="filled"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-success-filled-hover-background, var(--o-color-bg-success-hover));
  color: var(--o-button-success-filled-hover-text, var(--o-color-text-onsuccess-hover)); }

:host([variant="filled"][color="success"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="success"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-success-filled-hover-icon, var(--o-color-icon-onsuccess-hover)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-success-filled-hover-icon, var(--o-color-icon-onsuccess-hover)); }

:host([variant="filled"][color="success"]:not([disabled]).pressed),
:host([variant="filled"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-success-filled-pressed-background, var(--o-color-bg-success-pressed));
  color: var(--o-button-success-filled-pressed-text, var(--o-color-text-onsuccess-pressed)); }

:host([variant="filled"][color="success"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="success"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-success-filled-pressed-icon, var(--o-color-icon-onsuccess-pressed)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-success-filled-pressed-icon, var(--o-color-icon-onsuccess-pressed)); }

:host([variant="outlined"][color="success"]:not([disabled]).default),
:host([variant="outlined"][color="success"]:not([disabled])) {
  border-color: var(--o-button-success-outlined-default-border, var(--o-color-border-success));
  color: var(--o-button-success-outlined-default-text, var(--o-color-text-success)); }

:host([variant="outlined"][color="success"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="success"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-success-outlined-default-icon, var(--o-color-icon-success)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-success-outlined-default-icon, var(--o-color-icon-success)); }

:host([variant="outlined"][color="success"]:not([disabled]).hover),
:host([variant="outlined"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-success-outlined-hover-background, var(--o-color-bg-success-hover));
  color: var(--o-button-success-outlined-hover-text, var(--o-color-text-onsuccess-hover)); }

:host([variant="outlined"][color="success"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="success"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-success-outlined-hover-icon, var(--o-color-icon-onsuccess-hover)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-success-outlined-hover-icon, var(--o-color-icon-onsuccess-hover)); }

:host([variant="outlined"][color="success"]:not([disabled]).pressed),
:host([variant="outlined"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-success-outlined-pressed-background, var(--o-color-bg-success-pressed));
  color: var(--o-button-success-outlined-pressed-text, var(--o-color-text-onsuccess-pressed)); }

:host([variant="outlined"][color="success"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="success"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-success-outlined-pressed-icon, var(--o-color-icon-onsuccess-pressed)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-success-outlined-pressed-icon, var(--o-color-icon-onsuccess-pressed)); }

:host([variant="clear"][color="success"]:not([disabled]).default),
:host([variant="clear"][color="success"]:not([disabled])) {
  color: var(--o-button-success-clear-default-text, var(--o-color-text-success)); }

:host([variant="clear"][color="success"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="success"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-success-clear-default-icon, var(--o-color-icon-success)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-success-clear-default-icon, var(--o-color-icon-success)); }

:host([variant="clear"][color="success"]:not([disabled]).hover),
:host([variant="clear"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-success-clear-hover-background, var(--o-color-bg-success-hover));
  color: var(--o-button-success-clear-hover-text, var(--o-color-text-onsuccess-hover)); }

:host([variant="clear"][color="success"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="success"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-success-clear-hover-icon, var(--o-color-icon-onsuccess-hover)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-success-clear-hover-icon, var(--o-color-icon-onsuccess-hover)); }

:host([variant="clear"][color="success"]:not([disabled]).pressed),
:host([variant="clear"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-success-clear-pressed-background, var(--o-color-bg-success-pressed));
  color: var(--o-button-success-clear-pressed-text, var(--o-color-text-onsuccess-pressed)); }

:host([variant="clear"][color="success"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="success"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-success-clear-pressed-icon, var(--o-color-icon-onsuccess-pressed)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-success-clear-pressed-icon, var(--o-color-icon-onsuccess-pressed)); }

:host([variant="filled"][color="warning"]:not([disabled]).default),
:host([variant="filled"][color="warning"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-warning-filled-default-background, var(--o-color-bg-warning));
  color: var(--o-button-warning-filled-default-text, var(--o-color-text-onwarning)); }

:host([variant="filled"][color="warning"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="warning"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-warning-filled-default-icon, var(--o-color-icon-onwarning)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-warning-filled-default-icon, var(--o-color-icon-onwarning)); }

:host([variant="filled"][color="warning"]:not([disabled]).hover),
:host([variant="filled"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-warning-filled-hover-background, var(--o-color-bg-warning-hover));
  color: var(--o-button-warning-filled-hover-text, var(--o-color-text-onwarning-hover)); }

:host([variant="filled"][color="warning"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="warning"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-warning-filled-hover-icon, var(--o-color-icon-onwarning-hover)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-warning-filled-hover-icon, var(--o-color-icon-onwarning-hover)); }

:host([variant="filled"][color="warning"]:not([disabled]).pressed),
:host([variant="filled"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-warning-filled-pressed-background, var(--o-color-bg-warning-pressed));
  color: var(--o-button-warning-filled-pressed-text, var(--o-color-text-onwarning-pressed)); }

:host([variant="filled"][color="warning"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="warning"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-warning-filled-pressed-icon, var(--o-color-icon-onwarning-pressed)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-warning-filled-pressed-icon, var(--o-color-icon-onwarning-pressed)); }

:host([variant="outlined"][color="warning"]:not([disabled]).default),
:host([variant="outlined"][color="warning"]:not([disabled])) {
  border-color: var(--o-button-warning-outlined-default-border, var(--o-color-border-warning));
  color: var(--o-button-warning-outlined-default-text, var(--o-color-text-warning)); }

:host([variant="outlined"][color="warning"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="warning"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-warning-outlined-default-icon, var(--o-color-icon-warning)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-warning-outlined-default-icon, var(--o-color-icon-warning)); }

:host([variant="outlined"][color="warning"]:not([disabled]).hover),
:host([variant="outlined"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-warning-outlined-hover-background, var(--o-color-bg-warning-hover));
  color: var(--o-button-warning-outlined-hover-text, var(--o-color-text-onwarning-hover)); }

:host([variant="outlined"][color="warning"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="warning"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-warning-outlined-hover-icon, var(--o-color-icon-onwarning-hover)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-warning-outlined-hover-icon, var(--o-color-icon-onwarning-hover)); }

:host([variant="outlined"][color="warning"]:not([disabled]).pressed),
:host([variant="outlined"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-warning-outlined-pressed-background, var(--o-color-bg-warning-pressed));
  color: var(--o-button-warning-outlined-pressed-text, var(--o-color-text-onwarning-pressed)); }

:host([variant="outlined"][color="warning"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="warning"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-warning-outlined-pressed-icon, var(--o-color-icon-onwarning-pressed)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-warning-outlined-pressed-icon, var(--o-color-icon-onwarning-pressed)); }

:host([variant="clear"][color="warning"]:not([disabled]).default),
:host([variant="clear"][color="warning"]:not([disabled])) {
  color: var(--o-button-warning-clear-default-text, var(--o-color-text-warning)); }

:host([variant="clear"][color="warning"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="warning"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-warning-clear-default-icon, var(--o-color-icon-warning)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-warning-clear-default-icon, var(--o-color-icon-warning)); }

:host([variant="clear"][color="warning"]:not([disabled]).hover),
:host([variant="clear"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-warning-clear-hover-background, var(--o-color-bg-warning-hover));
  color: var(--o-button-warning-clear-hover-text, var(--o-color-text-onwarning-hover)); }

:host([variant="clear"][color="warning"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="warning"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-warning-clear-hover-icon, var(--o-color-icon-onwarning-hover)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-warning-clear-hover-icon, var(--o-color-icon-onwarning-hover)); }

:host([variant="clear"][color="warning"]:not([disabled]).pressed),
:host([variant="clear"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-warning-clear-pressed-background, var(--o-color-bg-warning-pressed));
  color: var(--o-button-warning-clear-pressed-text, var(--o-color-text-onwarning-pressed)); }

:host([variant="clear"][color="warning"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="warning"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-warning-clear-pressed-icon, var(--o-color-icon-onwarning-pressed)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-warning-clear-pressed-icon, var(--o-color-icon-onwarning-pressed)); }

:host([disabled]) {
  cursor: var(--o-button-cursor-disabled, not-allowed);
  color: var(--o-button-disabled-text, var(--o-color-text-disabled)); }

:host([disabled]) ::slotted(o-icon) {
  color: var(--o-button-icon-disabled, var(--o-color-icon-disabled)); }

:host([variant="filled"][disabled]) {
  background-color: var(--o-button-disabled-filled-background, var(--o-color-bg-disabled)); }

:host([variant="outlined"][disabled]) {
  border-color: var(--o-button-disabled-outlined-border, var(--o-color-border-disabled)) !important; }

:host(.focus),
:host(:focus-visible) {
  outline-offset: 2px;
  outline: 2px solid var(--o-color-border-strong) !important; }

:host([disabled]:focus),
:host([disabled].focus),
:host([disabled]:focus-visible),
:host([disabled]:focus-within) {
  outline: none !important; }

:host([loading="true"])::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--field-size-smaller);
  height: var(--field-size-smaller);
  border-radius: 50%;
  display: inline-block;
  border-right: 2px solid transparent;
  box-sizing: border-box;
  animation: spin 1s linear infinite;
  /* This line sets up the animation */ }

:host([loading="true"]) span.content,
:host([loading="true"]) ::slotted(*) {
  display: none !important; }

:host([loading="true"][mode="hug"]) {
  width: 110px; }

:host([size="small"]) {
  min-height: var(--o-button-height-small, 2rem);
  height: fit-content;
  padding: var(--o-button-padding-small, var(--padding-smaller)); }

:host([circle="true"][size="small"]) {
  padding: 0;
  justify-content: center;
  width: var(--o-button-height-small, 2rem); }

:host([size="medium"]) {
  min-height: var(--o-button-height-medium, 2.5rem);
  height: fit-content;
  padding: var(--o-button-padding-medium, var(--padding-smaller) var(--padding-medium)); }

:host([circle="true"][size="medium"]) {
  padding: 0;
  justify-content: center;
  width: var(--o-button-height-medium, 2.5rem); }

:host([size="large"]) {
  min-height: var(--o-button-height-large, 3rem);
  height: fit-content;
  padding: var(--o-button-padding-large, var(--padding-smaller) var(--padding-small)); }

:host([circle="true"][size="large"]) {
  padding: 0;
  justify-content: center;
  width: var(--o-button-height-large, 3rem); }

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg); }
  100% {
    transform: translate(-50%, -50%) rotate(360deg); } }`;
