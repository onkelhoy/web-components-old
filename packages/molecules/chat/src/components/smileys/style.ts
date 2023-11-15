export const style = `:host {
  display: grid;
  --button-background-color-clear-hover: var(--smiley-hover-backgroun, rgba(0, 0, 0, 0.05)); }
  :host div.search {
    padding: 1rem;
    height: fit-content; }
  :host pap-tab {
    flex-grow: 1; }
  :host pap-button {
    margin: 0;
    gap: 0;
    padding: 0;
    width: 40px;
    height: 40px;
    font-size: 15pt; }
    :host pap-button.clear {
      display: none; }

:host(:not([search=""])) pap-tabs {
  grid-template-rows: 1fr; }

:host(:not([search=""])) pap-tabs::part(content),
:host(:not([search=""])) pap-tabs::part(header) {
  display: none; }

:host(:not([search=""])) pap-icon[name="search"] {
  display: none; }

:host(:not([search=""])) pap-button.clear {
  display: flex; }`;
