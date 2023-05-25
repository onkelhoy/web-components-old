export const style = `:host {
  position: relative;
  display: block;
  height: fit-content;
  --gap: var(--popover-gap, 1rem); }
  :host div.wrapper {
    position: absolute;
    top: 0;
    left: 0; }

:host([open="true"]) div.wrapper {
  display: block; }

:host([open="false"]) div.wrapper {
  display: none; }

:host([placement="top-right"]) div.wrapper {
  padding-bottom: var(--gap);
  transform: translateY(-100%); }

:host([placement="top-center"]) div.wrapper {
  padding-bottom: var(--gap);
  left: 50%;
  transform: translate(-50%, -100%); }

:host([placement="top-left"]) div.wrapper {
  padding-bottom: var(--gap);
  left: 100%;
  transform: translateY(-100%); }

:host([placement="bottom-right"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%; }

:host([placement="bottom-center"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%;
  left: 50%;
  transform: translateX(-50%); }

:host([placement="bottom-left"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%;
  left: 100%; }

:host([placement="left-top"]) div.wrapper {
  padding-right: var(--gap);
  transform: translateX(-100%); }

:host([placement="left-center"]) div.wrapper {
  padding-right: var(--gap);
  top: 50%;
  transform: translate(-100%, -50%); }

:host([placement="left-bottom"]) div.wrapper {
  padding-right: var(--gap);
  top: 100%;
  transform: translateX(-100%); }

:host([placement="right-top"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%; }

:host([placement="right-center"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%;
  top: 50%;
  transform: translateY(-50%); }

:host([placement="right-bottom"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%;
  top: 100%;
  transform: translateX(-100%); }`;
