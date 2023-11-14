export const style = `:host {
  cursor: var(--o-button-cursor, pointer);
  align-items: center;
  display: flex;
  gap: var(--gap-small);
  padding-inline: var(--padding-smaller, 4px);
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
  margin-inline: auto;
  gap: var(--gap-small);
  display: inline-flex;
  align-items: center;
  justify-content: center; }

:host([variant="outlined"]:is(:active)),
:host([variant="outlined"]:is(:hover)) {
  border-color: transparent !important; }

:host([mode="hug"]) {
  display: inline-flex; }

:host([mode="fill"]) {
  display: flex;
  width: 100%; }

:host([textvariant="B1"]),
:host([textvariant="button1"]) {
  font-family: var(--typography-b1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b1-fontsize, 1rem);
  font-weight: var(--typography-b1-fontweight, 600);
  line-height: var(--typography-b1-lineheight, 140%);
  letter-spacing: var(--typography-b1-letterspacing, 0.01rem); }

:host([color="secondary"][variant="clear"]:not([textvariant="B1"]):not([textvariant="button1"])),
:host([color="inverse"][variant="clear"]:not([textvariant="B1"]):not([textvariant="button1"])),
:host([textvariant="B2"]),
:host([textvariant="button2"]) {
  font-family: var(--typography-b2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b2-fontsize, 1rem);
  font-weight: var(--typography-b2-fontweight, 600);
  line-height: var(--typography-b2-lineheight, 140%);
  letter-spacing: var(--typography-b2-letterspacing, 0.01rem);
  text-decoration: underline; }

:host([variant="filled"][color="primary"]:not([disabled]).default),
:host([variant="filled"][color="primary"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-primary-filled-default-background, var(--o-color-bg-brand, #009DD3));
  color: var(--o-button-primary-filled-default-text, var(--o-color-text-onbrand, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="primary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-primary-filled-default-icon, var(--o-color-icon-onbrand, #FFFFFF)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-primary-filled-default-icon, var(--o-color-icon-onbrand, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).hover),
:host([variant="filled"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-primary-filled-hover-background, var(--o-color-bg-brand-hover, #0050B3));
  color: var(--o-button-primary-filled-hover-text, var(--o-color-text-onbrand-hover, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="primary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-primary-filled-hover-icon, var(--o-color-icon-onbrand-hover, #FFFFFF)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-primary-filled-hover-icon, var(--o-color-icon-onbrand-hover, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).pressed),
:host([variant="filled"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-primary-filled-pressed-background, var(--o-color-bg-brand-pressed, #002652));
  color: var(--o-button-primary-filled-pressed-text, var(--o-color-text-onbrand-pressed, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="primary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-primary-filled-pressed-icon, var(--o-color-icon-onbrand-pressed, #FFFFFF)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-primary-filled-pressed-icon, var(--o-color-icon-onbrand-pressed, #FFFFFF)); }

:host([variant="outlined"][color="primary"]:not([disabled]).default),
:host([variant="outlined"][color="primary"]:not([disabled])) {
  border-color: var(--o-button-primary-outlined-default-border, var(--o-color-border-brand, #009DD3));
  color: var(--o-button-primary-outlined-default-text, var(--o-color-text-brand, #0177A3)); }

:host([variant="outlined"][color="primary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="primary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-primary-outlined-default-icon, var(--o-color-icon-brand, #0177A3)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-primary-outlined-default-icon, var(--o-color-icon-brand, #0177A3)); }

:host([variant="outlined"][color="primary"]:not([disabled]).hover),
:host([variant="outlined"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-primary-outlined-hover-background, var(--o-color-bg-brand-hover, #0050B3));
  color: var(--o-button-primary-outlined-hover-text, var(--o-color-text-onbrand-hover, #FFFFFF)); }

:host([variant="outlined"][color="primary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="primary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-primary-outlined-hover-icon, var(--o-color-icon-onbrand-hover, #FFFFFF)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-primary-outlined-hover-icon, var(--o-color-icon-onbrand-hover, #FFFFFF)); }

:host([variant="outlined"][color="primary"]:not([disabled]).pressed),
:host([variant="outlined"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-primary-outlined-pressed-background, var(--o-color-bg-brand-pressed, #002652));
  color: var(--o-button-primary-outlined-pressed-text, var(--o-color-text-onbrand-pressed, #FFFFFF)); }

:host([variant="outlined"][color="primary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="primary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-primary-outlined-pressed-icon, var(--o-color-icon-onbrand-pressed, #FFFFFF)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-primary-outlined-pressed-icon, var(--o-color-icon-onbrand-pressed, #FFFFFF)); }

:host([variant="clear"][color="primary"]:not([disabled]).default),
:host([variant="clear"][color="primary"]:not([disabled])) {
  color: var(--o-button-primary-clear-default-text, var(--o-color-text-brand, #0177A3)); }

:host([variant="clear"][color="primary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="primary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-primary-clear-default-icon, var(--o-color-icon-brand, #0177A3)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-primary-clear-default-icon, var(--o-color-icon-brand, #0177A3)); }

:host([variant="clear"][color="primary"]:not([disabled]).hover),
:host([variant="clear"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-primary-clear-hover-background, var(--o-color-bg-hover, #DADDE3));
  color: var(--o-button-primary-clear-hover-text, var(--o-color-text-brand-hover, #0050B3)); }

:host([variant="clear"][color="primary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="primary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-primary-clear-hover-icon, var(--o-color-icon-brand-hover, #0050B3)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-primary-clear-hover-icon, var(--o-color-icon-brand-hover, #0050B3)); }

:host([variant="clear"][color="primary"]:not([disabled]).pressed),
:host([variant="clear"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-primary-clear-pressed-background, var(--o-color-bg-pressed, #C7CBD4));
  color: var(--o-button-primary-clear-pressed-text, var(--o-color-text-brand-pressed, #002652)); }

:host([variant="clear"][color="primary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="primary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-primary-clear-pressed-icon, var(--o-color-icon-brand-pressed, #002652)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-primary-clear-pressed-icon, var(--o-color-icon-brand-pressed, #002652)); }

:host([variant="filled"][color="secondary"]:not([disabled]).default),
:host([variant="filled"][color="secondary"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-secondary-filled-default-background, var(--o-color-bg-inverse, #29292F));
  color: var(--o-button-secondary-filled-default-text, var(--o-color-text-oninverse, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="secondary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-secondary-filled-default-icon, var(--o-color-icon-oninverse, #FFFFFF)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-secondary-filled-default-icon, var(--o-color-icon-oninverse, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).hover),
:host([variant="filled"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-secondary-filled-hover-background, var(--o-color-bg-inverse-hover, #4D4E58));
  color: var(--o-button-secondary-filled-hover-text, var(--o-color-text-oninverse-hover, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="secondary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-secondary-filled-hover-icon, var(--o-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-secondary-filled-hover-icon, var(--o-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).pressed),
:host([variant="filled"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-secondary-filled-pressed-background, var(--o-color-bg-inverse-pressed, #6E7087));
  color: var(--o-button-secondary-filled-pressed-text, var(--o-color-text-oninverse-pressed, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="secondary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-secondary-filled-pressed-icon, var(--o-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-secondary-filled-pressed-icon, var(--o-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).default),
:host([variant="outlined"][color="secondary"]:not([disabled])) {
  border-color: var(--o-button-secondary-outlined-default-border, var(--o-color-border, #C7CBD4));
  color: var(--o-button-secondary-outlined-default-text, var(--o-color-text, #29292F)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="secondary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-secondary-outlined-default-icon, var(--o-color-icon, #29292F)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-secondary-outlined-default-icon, var(--o-color-icon, #29292F)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).hover),
:host([variant="outlined"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-secondary-outlined-hover-background, var(--o-color-bg-inverse-hover, #4D4E58));
  color: var(--o-button-secondary-outlined-hover-text, var(--o-color-text-oninverse-hover, #FFFFFF)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="secondary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-secondary-outlined-hover-icon, var(--o-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-secondary-outlined-hover-icon, var(--o-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).pressed),
:host([variant="outlined"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-secondary-outlined-pressed-background, var(--o-color-bg-inverse-pressed, #6E7087));
  color: var(--o-button-secondary-outlined-pressed-text, var(--o-color-text-oninverse-pressed, #FFFFFF)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="secondary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-secondary-outlined-pressed-icon, var(--o-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-secondary-outlined-pressed-icon, var(--o-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="clear"][color="secondary"]:not([disabled]).default),
:host([variant="clear"][color="secondary"]:not([disabled])) {
  color: var(--o-button-secondary-clear-default-text, var(--o-color-text, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="secondary"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-secondary-clear-default-icon, var(--o-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-secondary-clear-default-icon, var(--o-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).hover),
:host([variant="clear"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-secondary-clear-hover-background, var(--o-color-bg-hover, #DADDE3));
  color: var(--o-button-secondary-clear-hover-text, var(--o-color-text, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="secondary"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-secondary-clear-hover-icon, var(--o-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-secondary-clear-hover-icon, var(--o-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).pressed),
:host([variant="clear"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-secondary-clear-pressed-background, var(--o-color-bg-pressed, #C7CBD4));
  color: var(--o-button-secondary-clear-pressed-text, var(--o-color-text, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="secondary"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-secondary-clear-pressed-icon, var(--o-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-secondary-clear-pressed-icon, var(--o-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).default),
:host([variant="filled"][color="inverse"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-inverse-filled-default-background, var(--o-color-bg, #FFFFFF));
  color: var(--o-button-inverse-filled-default-text, var(--o-color-text, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="inverse"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-inverse-filled-default-icon, var(--o-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-inverse-filled-default-icon, var(--o-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).hover),
:host([variant="filled"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-inverse-filled-hover-background, var(--o-color-bg-hover, #DADDE3));
  color: var(--o-button-inverse-filled-hover-text, var(--o-color-text, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="inverse"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-inverse-filled-hover-icon, var(--o-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-inverse-filled-hover-icon, var(--o-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).pressed),
:host([variant="filled"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-inverse-filled-pressed-background, var(--o-color-bg-pressed, #C7CBD4));
  color: var(--o-button-inverse-filled-pressed-text, var(--o-color-text, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="inverse"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-inverse-filled-pressed-icon, var(--o-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-inverse-filled-pressed-icon, var(--o-color-icon, #29292F)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).default),
:host([variant="outlined"][color="inverse"]:not([disabled])) {
  border-color: var(--o-button-inverse-outlined-default-border, var(--o-color-border-inverse-strong, #FFFFFF));
  color: var(--o-button-inverse-outlined-default-text, var(--o-color-text-oninverse, #FFFFFF)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="inverse"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-inverse-outlined-default-icon, var(--o-color-icon-oninverse, #FFFFFF)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-inverse-outlined-default-icon, var(--o-color-icon-oninverse, #FFFFFF)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).hover),
:host([variant="outlined"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-inverse-outlined-hover-background, var(--o-color-bg-hover, #DADDE3));
  color: var(--o-button-inverse-outlined-hover-text, var(--o-color-text, #29292F)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="inverse"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-inverse-outlined-hover-icon, var(--o-color-icon, #29292F)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-inverse-outlined-hover-icon, var(--o-color-icon, #29292F)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).pressed),
:host([variant="outlined"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-inverse-outlined-pressed-background, var(--o-color-bg-pressed, #C7CBD4));
  color: var(--o-button-inverse-outlined-pressed-text, var(--o-color-text, #29292F)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="inverse"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-inverse-outlined-pressed-icon, var(--o-color-icon, #29292F)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-inverse-outlined-pressed-icon, var(--o-color-icon, #29292F)); }

:host([variant="clear"][color="inverse"]:not([disabled]).default),
:host([variant="clear"][color="inverse"]:not([disabled])) {
  color: var(--o-button-inverse-clear-default-text, var(--o-color-text-oninverse, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="inverse"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-inverse-clear-default-icon, var(--o-color-icon-oninverse, #FFFFFF)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-inverse-clear-default-icon, var(--o-color-icon-oninverse, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).hover),
:host([variant="clear"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-inverse-clear-hover-background, var(--o-color-bg-inverse-hover, #4D4E58));
  color: var(--o-button-inverse-clear-hover-text, var(--o-color-text-oninverse-hover, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="inverse"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-inverse-clear-hover-icon, var(--o-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-inverse-clear-hover-icon, var(--o-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).pressed),
:host([variant="clear"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-inverse-clear-pressed-background, var(--o-color-bg-inverse-pressed, #6E7087));
  color: var(--o-button-inverse-clear-pressed-text, var(--o-color-text-oninverse-pressed, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="inverse"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-inverse-clear-pressed-icon, var(--o-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-inverse-clear-pressed-icon, var(--o-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).default),
:host([variant="filled"][color="danger"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-danger-filled-default-background, var(--o-color-bg-danger, #B70E1E));
  color: var(--o-button-danger-filled-default-text, var(--o-color-text-ondanger, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="danger"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-danger-filled-default-icon, var(--o-color-icon-ondanger, #FFFFFF)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-danger-filled-default-icon, var(--o-color-icon-ondanger, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).hover),
:host([variant="filled"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-danger-filled-hover-background, var(--o-color-bg-danger-hover, #A3111F));
  color: var(--o-button-danger-filled-hover-text, var(--o-color-text-ondanger-hover, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="danger"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-danger-filled-hover-icon, var(--o-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-danger-filled-hover-icon, var(--o-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).pressed),
:host([variant="filled"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-danger-filled-pressed-background, var(--o-color-bg-danger-pressed, #871520));
  color: var(--o-button-danger-filled-pressed-text, var(--o-color-text-ondanger-pressed, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="danger"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-danger-filled-pressed-icon, var(--o-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-danger-filled-pressed-icon, var(--o-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="outlined"][color="danger"]:not([disabled]).default),
:host([variant="outlined"][color="danger"]:not([disabled])) {
  border-color: var(--o-button-danger-outlined-default-border, var(--o-color-border-danger, #B70E1E));
  color: var(--o-button-danger-outlined-default-text, var(--o-color-text-danger, #A3111F)); }

:host([variant="outlined"][color="danger"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="danger"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-danger-outlined-default-icon, var(--o-color-icon-danger, #A3111F)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-danger-outlined-default-icon, var(--o-color-icon-danger, #A3111F)); }

:host([variant="outlined"][color="danger"]:not([disabled]).hover),
:host([variant="outlined"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-danger-outlined-hover-background, var(--o-color-bg-danger-hover, #A3111F));
  color: var(--o-button-danger-outlined-hover-text, var(--o-color-text-ondanger-hover, #FFFFFF)); }

:host([variant="outlined"][color="danger"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="danger"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-danger-outlined-hover-icon, var(--o-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-danger-outlined-hover-icon, var(--o-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="outlined"][color="danger"]:not([disabled]).pressed),
:host([variant="outlined"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-danger-outlined-pressed-background, var(--o-color-bg-danger-pressed, #871520));
  color: var(--o-button-danger-outlined-pressed-text, var(--o-color-text-ondanger-pressed, #FFFFFF)); }

:host([variant="outlined"][color="danger"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="danger"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-danger-outlined-pressed-icon, var(--o-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-danger-outlined-pressed-icon, var(--o-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="clear"][color="danger"]:not([disabled]).default),
:host([variant="clear"][color="danger"]:not([disabled])) {
  color: var(--o-button-danger-clear-default-text, var(--o-color-text-danger, #A3111F)); }

:host([variant="clear"][color="danger"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="danger"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-danger-clear-default-icon, var(--o-color-icon-danger, #A3111F)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-danger-clear-default-icon, var(--o-color-icon-danger, #A3111F)); }

:host([variant="clear"][color="danger"]:not([disabled]).hover),
:host([variant="clear"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-danger-clear-hover-background, var(--o-color-bg-danger-hover, #A3111F));
  color: var(--o-button-danger-clear-hover-text, var(--o-color-text-ondanger-hover, #FFFFFF)); }

:host([variant="clear"][color="danger"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="danger"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-danger-clear-hover-icon, var(--o-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-danger-clear-hover-icon, var(--o-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="clear"][color="danger"]:not([disabled]).pressed),
:host([variant="clear"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-danger-clear-pressed-background, var(--o-color-bg-danger-pressed, #871520));
  color: var(--o-button-danger-clear-pressed-text, var(--o-color-text-ondanger-pressed, #FFFFFF)); }

:host([variant="clear"][color="danger"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="danger"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-danger-clear-pressed-icon, var(--o-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-danger-clear-pressed-icon, var(--o-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).default),
:host([variant="filled"][color="success"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-success-filled-default-background, var(--o-color-bg-success, #2E701B));
  color: var(--o-button-success-filled-default-text, var(--o-color-text-onsuccess, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="success"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-success-filled-default-icon, var(--o-color-icon-onsuccess, #FFFFFF)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-success-filled-default-icon, var(--o-color-icon-onsuccess, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).hover),
:host([variant="filled"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-success-filled-hover-background, var(--o-color-bg-success-hover, #29591B));
  color: var(--o-button-success-filled-hover-text, var(--o-color-text-onsuccess-hover, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="success"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-success-filled-hover-icon, var(--o-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-success-filled-hover-icon, var(--o-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).pressed),
:host([variant="filled"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-success-filled-pressed-background, var(--o-color-bg-success-pressed, #244C1B));
  color: var(--o-button-success-filled-pressed-text, var(--o-color-text-onsuccess-pressed, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="success"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-success-filled-pressed-icon, var(--o-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-success-filled-pressed-icon, var(--o-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="outlined"][color="success"]:not([disabled]).default),
:host([variant="outlined"][color="success"]:not([disabled])) {
  border-color: var(--o-button-success-outlined-default-border, var(--o-color-border-success, #2E701B));
  color: var(--o-button-success-outlined-default-text, var(--o-color-text-success, #29591B)); }

:host([variant="outlined"][color="success"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="success"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-success-outlined-default-icon, var(--o-color-icon-success, #29591B)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-success-outlined-default-icon, var(--o-color-icon-success, #29591B)); }

:host([variant="outlined"][color="success"]:not([disabled]).hover),
:host([variant="outlined"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-success-outlined-hover-background, var(--o-color-bg-success-hover, #29591B));
  color: var(--o-button-success-outlined-hover-text, var(--o-color-text-onsuccess-hover, #FFFFFF)); }

:host([variant="outlined"][color="success"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="success"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-success-outlined-hover-icon, var(--o-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-success-outlined-hover-icon, var(--o-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="outlined"][color="success"]:not([disabled]).pressed),
:host([variant="outlined"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-success-outlined-pressed-background, var(--o-color-bg-success-pressed, #244C1B));
  color: var(--o-button-success-outlined-pressed-text, var(--o-color-text-onsuccess-pressed, #FFFFFF)); }

:host([variant="outlined"][color="success"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="success"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-success-outlined-pressed-icon, var(--o-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-success-outlined-pressed-icon, var(--o-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="clear"][color="success"]:not([disabled]).default),
:host([variant="clear"][color="success"]:not([disabled])) {
  color: var(--o-button-success-clear-default-text, var(--o-color-text-success, #29591B)); }

:host([variant="clear"][color="success"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="success"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-success-clear-default-icon, var(--o-color-icon-success, #29591B)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-success-clear-default-icon, var(--o-color-icon-success, #29591B)); }

:host([variant="clear"][color="success"]:not([disabled]).hover),
:host([variant="clear"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-success-clear-hover-background, var(--o-color-bg-success-hover, #29591B));
  color: var(--o-button-success-clear-hover-text, var(--o-color-text-onsuccess-hover, #FFFFFF)); }

:host([variant="clear"][color="success"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="success"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-success-clear-hover-icon, var(--o-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-success-clear-hover-icon, var(--o-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="clear"][color="success"]:not([disabled]).pressed),
:host([variant="clear"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-success-clear-pressed-background, var(--o-color-bg-success-pressed, #244C1B));
  color: var(--o-button-success-clear-pressed-text, var(--o-color-text-onsuccess-pressed, #FFFFFF)); }

:host([variant="clear"][color="success"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="success"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-success-clear-pressed-icon, var(--o-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-success-clear-pressed-icon, var(--o-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="filled"][color="warning"]:not([disabled]).default),
:host([variant="filled"][color="warning"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--o-button-warning-filled-default-background, var(--o-color-bg-warning, #FFA800));
  color: var(--o-button-warning-filled-default-text, var(--o-color-text-onwarning, #29292F)); }

:host([variant="filled"][color="warning"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="filled"][color="warning"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-warning-filled-default-icon, var(--o-color-icon-onwarning, #29292F)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-warning-filled-default-icon, var(--o-color-icon-onwarning, #29292F)); }

:host([variant="filled"][color="warning"]:not([disabled]).hover),
:host([variant="filled"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-warning-filled-hover-background, var(--o-color-bg-warning-hover, #E27F00));
  color: var(--o-button-warning-filled-hover-text, var(--o-color-text-onwarning-hover, #FFFFFF)); }

:host([variant="filled"][color="warning"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="filled"][color="warning"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-warning-filled-hover-icon, var(--o-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-warning-filled-hover-icon, var(--o-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="filled"][color="warning"]:not([disabled]).pressed),
:host([variant="filled"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-warning-filled-pressed-background, var(--o-color-bg-warning-pressed, #BB5802));
  color: var(--o-button-warning-filled-pressed-text, var(--o-color-text-onwarning-pressed, #FFFFFF)); }

:host([variant="filled"][color="warning"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="filled"][color="warning"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-warning-filled-pressed-icon, var(--o-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-warning-filled-pressed-icon, var(--o-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="outlined"][color="warning"]:not([disabled]).default),
:host([variant="outlined"][color="warning"]:not([disabled])) {
  border-color: var(--o-button-warning-outlined-default-border, var(--o-color-border-warning, #E27F00));
  color: var(--o-button-warning-outlined-default-text, var(--o-color-text-warning, #984308)); }

:host([variant="outlined"][color="warning"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="outlined"][color="warning"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-warning-outlined-default-icon, var(--o-color-icon-warning, #E27F00)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-warning-outlined-default-icon, var(--o-color-icon-warning, #E27F00)); }

:host([variant="outlined"][color="warning"]:not([disabled]).hover),
:host([variant="outlined"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-warning-outlined-hover-background, var(--o-color-bg-warning-hover, #E27F00));
  color: var(--o-button-warning-outlined-hover-text, var(--o-color-text-onwarning-hover, #FFFFFF)); }

:host([variant="outlined"][color="warning"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="outlined"][color="warning"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-warning-outlined-hover-icon, var(--o-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-warning-outlined-hover-icon, var(--o-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="outlined"][color="warning"]:not([disabled]).pressed),
:host([variant="outlined"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-warning-outlined-pressed-background, var(--o-color-bg-warning-pressed, #BB5802));
  color: var(--o-button-warning-outlined-pressed-text, var(--o-color-text-onwarning-pressed, #FFFFFF)); }

:host([variant="outlined"][color="warning"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="outlined"][color="warning"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-warning-outlined-pressed-icon, var(--o-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-warning-outlined-pressed-icon, var(--o-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="clear"][color="warning"]:not([disabled]).default),
:host([variant="clear"][color="warning"]:not([disabled])) {
  color: var(--o-button-warning-clear-default-text, var(--o-color-text-warning, #984308)); }

:host([variant="clear"][color="warning"]:not([disabled]).default) ::slotted(o-icon),
:host([variant="clear"][color="warning"]:not([disabled])) ::slotted(o-icon) {
  color: var(--o-button-warning-clear-default-icon, var(--o-color-icon-warning, #E27F00)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--o-button-warning-clear-default-icon, var(--o-color-icon-warning, #E27F00)); }

:host([variant="clear"][color="warning"]:not([disabled]).hover),
:host([variant="clear"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--o-button-warning-clear-hover-background, var(--o-color-bg-warning-hover, #E27F00));
  color: var(--o-button-warning-clear-hover-text, var(--o-color-text-onwarning-hover, #FFFFFF)); }

:host([variant="clear"][color="warning"]:not([disabled]).hover) ::slotted(o-icon),
:host([variant="clear"][color="warning"]:not([disabled]):hover) ::slotted(o-icon) {
  color: var(--o-button-warning-clear-hover-icon, var(--o-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--o-button-warning-clear-hover-icon, var(--o-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="clear"][color="warning"]:not([disabled]).pressed),
:host([variant="clear"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--o-button-warning-clear-pressed-background, var(--o-color-bg-warning-pressed, #BB5802));
  color: var(--o-button-warning-clear-pressed-text, var(--o-color-text-onwarning-pressed, #FFFFFF)); }

:host([variant="clear"][color="warning"]:not([disabled]).pressed) ::slotted(o-icon),
:host([variant="clear"][color="warning"]:not([disabled]):active) ::slotted(o-icon) {
  color: var(--o-button-warning-clear-pressed-icon, var(--o-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--o-button-warning-clear-pressed-icon, var(--o-color-icon-onwarning-pressed, #FFFFFF)); }

:host([disabled]) {
  cursor: var(--o-button-cursor-disabled, not-allowed);
  color: var(--o-button-disabled-text, var(--o-color-text-disabled, #A3A9B7)); }

:host([disabled]) ::slotted(o-icon) {
  color: var(--o-button-icon-disabled, var(--o-color-icon-disabled, #A3A9B7)); }

:host([variant="filled"][disabled]) {
  background-color: var(--o-button-disabled-filled-background, var(--o-color-bg-disabled, #DADDE3)); }

:host([variant="outlined"][disabled]) {
  border-color: var(--o-button-disabled-outlined-border, var(--o-color-border-disabled, #A3A9B7)) !important; }

:host(.focus),
:host(:focus-visible) {
  outline-offset: 2px;
  outline: 2px solid var(--o-color-border-strong, #29292F) !important; }

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
  width: var(--field-size-smaller, 24px);
  height: var(--field-size-smaller, 24px);
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
  height: fit-content; }

:host([size="small"]:not([circle="true"])) {
  min-width: var(--o-button-min-width-small, 4.5rem); }

::slotted(*[slot="prefix"]) {
  margin-left: var(--margin-smaller, 4px); }

::slotted(*[slot="suffix"]) {
  margin-right: var(--margin-smaller, 4px); }

:host([circle="true"][size="small"]) {
  padding: 0;
  min-width: auto !important;
  justify-content: center;
  width: var(--o-button-width-small, 2rem); }

:host([size="medium"]) {
  min-height: var(--o-button-height-medium, 2.5rem);
  height: fit-content; }

:host([size="medium"]:not([circle="true"])) {
  min-width: var(--o-button-min-width-medium, 5.625rem); }

::slotted(*[slot="prefix"]) {
  margin-left: var(--margin-smaller, 4px); }

::slotted(*[slot="suffix"]) {
  margin-right: var(--margin-smaller, 4px); }

:host([circle="true"][size="medium"]) {
  padding: 0;
  min-width: auto !important;
  justify-content: center;
  width: var(--o-button-width-medium, 2.5rem); }

:host([size="large"]) {
  min-height: var(--o-button-height-large, 3rem);
  height: fit-content; }

:host([size="large"]:not([circle="true"])) {
  min-width: var(--o-button-min-width-large, 6.75rem); }

::slotted(*[slot="prefix"]) {
  margin-left: var(--margin-smaller, 4px); }

::slotted(*[slot="suffix"]) {
  margin-right: var(--margin-smaller, 4px); }

:host([circle="true"][size="large"]) {
  padding: 0;
  min-width: auto !important;
  justify-content: center;
  width: var(--o-button-width-large, 3rem); }

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg); }
  100% {
    transform: translate(-50%, -50%) rotate(360deg); } }`;
