export const style = `:host {
  display: block;
  position: sticky;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000; }
  :host o-button[part="hamburger-outside"] {
    position: absolute;
    top: var(--gap-large);
    left: var(--gap-medium);
    z-index: 3;
    display: none; }
  :host o-box-template {
    position: fixed;
    container-type: inline-size;
    z-index: 2;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    background-color: var(--o-sidebar-background-color, var(--o-color-bg, #FFFFFF));
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-block: var(--padding-medium);
    padding-bottom: 0; }
    :host o-box-template header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--padding-small);
      padding-left: var(--padding-medium);
      padding-bottom: var(--padding-medium); }
      :host o-box-template header o-icon {
        color: var(--o-color-text-brand-strong); }
    :host o-box-template o-divider {
      padding-right: var(--padding-small);
      padding-left: var(--padding-medium); }
      :host o-box-template o-divider::part(line) {
        background-color: var(--o-color-border-tertiary); }
    :host o-box-template div[part="body"] {
      overflow-y: auto;
      padding-top: var(--padding-small);
      padding-bottom: var(--padding-medium);
      padding-right: var(--padding-small); }
    :host o-box-template footer {
      margin-top: auto;
      padding-bottom: var(--padding-medium);
      padding-inline: var(--padding-small); }
  :host o-box-template[elevation="medium"] {
    box-shadow: var(--shadow-horizontal-m); }
  :host::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--o-color-bg-overlay);
    opacity: 0;
    z-index: 1;
    pointer-events: none; }

:host([mode="open"]) {
  min-width: 320px;
  width: 320px; }
  :host([mode="open"]) o-box-template {
    width: 320px; }

:host([mode="collapsed"]) {
  min-width: 3.5rem;
  width: 3.5rem; }
  :host([mode="collapsed"]) o-box-template {
    width: 3.5rem; }

:host([mode="hover"]) {
  min-width: 3.5rem;
  width: 3.5rem;
  z-index: 1000; }
  :host([mode="hover"]) o-box-template {
    width: 3.5rem; }
    :host([mode="hover"]) o-box-template:hover {
      width: 320px;
      transition: width 60ms ease-in;
      box-shadow: var(--shadow-horizontal-m); }
    :host([mode="hover"]) o-box-template:not(:hover) {
      box-shadow: none; }

:host(.mobile:not([mode="open"])),
:host([unit="pad"]:not([mode="open"])),
:host([unit="mobile"]:not([mode="open"])) {
  min-width: 0;
  width: 0; }
  :host(.mobile:not([mode="open"])) o-box-template,
  :host([unit="pad"]:not([mode="open"])) o-box-template,
  :host([unit="mobile"]:not([mode="open"])) o-box-template {
    width: 0; }
  :host(.mobile:not([mode="open"])) o-button[part="hamburger-outside"],
  :host([unit="pad"]:not([mode="open"])) o-button[part="hamburger-outside"],
  :host([unit="mobile"]:not([mode="open"])) o-button[part="hamburger-outside"] {
    display: flex; }
  :host(.mobile:not([mode="open"]))::before,
  :host([unit="pad"]:not([mode="open"]))::before,
  :host([unit="mobile"]:not([mode="open"]))::before {
    opacity: 0; }

:host([mode="open"].mobile),
:host([mode="open"][unit="pad"]),
:host([mode="open"][unit="mobile"]) {
  min-width: 0;
  width: 0; }
  :host([mode="open"].mobile) o-box-template,
  :host([mode="open"][unit="pad"]) o-box-template,
  :host([mode="open"][unit="mobile"]) o-box-template {
    width: 85vw;
    max-width: 320px; }
  :host([mode="open"].mobile)::before,
  :host([mode="open"][unit="pad"])::before,
  :host([mode="open"][unit="mobile"])::before {
    opacity: 0.7; }

@container (min-width: 3.5rem) {
  :host o-box-template {
    transition: width 60ms ease-in; } }

@container (max-width: 3.5rem) {
  :host o-box-template {
    transition: width 150ms ease-in; }
    :host o-box-template header {
      justify-content: center;
      padding-left: var(--padding-small); }
      :host o-box-template header ::slotted(*) {
        display: none; }
      :host o-box-template header o-icon.logo {
        display: none !important; }
    :host o-box-template o-divider {
      padding-left: var(--padding-small); } }`;
