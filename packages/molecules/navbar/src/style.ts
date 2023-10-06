export const style = `@media (prefers-color-scheme: light) {
  :host o-icon.logo.dark {
    display: none; }
  :host o-icon.logo.light {
    display: initial; } }

@media (prefers-color-scheme: dark) {
  :host o-icon.logo.dark {
    display: initial; }
  :host o-icon.logo.light {
    display: none; } }

:host(.theme-dark) o-icon.logo.dark {
  display: initial; }

:host(.theme-dark) o-icon.logo.light {
  display: none; }

:host(.theme-light) o-icon.logo.dark {
  display: none; }

:host(.theme-light) o-icon.logo.light {
  display: initial; }

:host {
  position: sticky;
  top: 0;
  left: 0;
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr; }
  :host o-box-template {
    container-type: inline-size;
    display: block;
    background-color: var(--o-navbar-background-color, var(--o-color-bg, #FFFFFF));
    padding: var(--padding-small, 8px);
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto; }
    :host o-box-template header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--margin-small, 8px);
      padding-block: var(--padding-small, 8px); }
      :host o-box-template header o-icon.logo {
        margin-left: var(--margin-medium, 16px); }
      :host o-box-template header o-button {
        gap: 0;
        padding: 0;
        width: 40px;
        height: 40px;
        color: var(--o-color-text); }
    :host o-box-template o-divider {
      margin-block: var(--margin-small, 8px); }
    :host o-box-template div.body ::slotted(o-navbar-item) {
      margin-bottom: var(--margin-small, 8px); }

:host([mode="open"]) {
  width: 310px; }

:host([mode="collapsed"]) {
  width: 72px; }

:host([mode="hover"]) {
  width: 72px; }
  :host([mode="hover"]) o-box-template {
    position: absolute; }
    :host([mode="hover"]) o-box-template:hover {
      width: 310px;
      transition: width 60ms ease-in; }
    :host([mode="hover"]) o-box-template header o-button o-icon.open {
      display: none; }
    :host([mode="hover"]) o-box-template header o-button o-icon.collapsed {
      display: block; }
    :host([mode="hover"]) o-box-template header o-button o-icon.hover {
      display: none; }

@container (min-width: 72px) {
  :host o-box-template {
    transition: width 60ms ease-in; }
    :host o-box-template header o-button o-icon.open {
      display: block; }
    :host o-box-template header o-button o-icon.collapsed {
      display: none; }
    :host o-box-template header o-button o-icon.hover {
      display: none; } }

@container (max-width: 72px) {
  :host o-box-template {
    transition: width 150ms ease-in; }
    :host o-box-template header {
      justify-content: center; }
      :host o-box-template header ::slotted(*) {
        display: none; }
      :host o-box-template header o-icon.logo.dark,
      :host o-box-template header o-icon.logo.light {
        display: none !important; }
      :host o-box-template header o-button o-icon.open {
        display: none; }
      :host o-box-template header o-button o-icon.collapsed {
        display: none !important; }
      :host o-box-template header o-button o-icon.hover {
        display: block !important; } }`;
