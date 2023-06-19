export const style = `:host {
  display: grid;
  --button-background-color-clear-hover: var(--smiley-hover-backgroun, rgba(0, 0, 0, 0.05)); }
  :host div.search {
    padding: 1rem;
    height: fit-content; }
  :host o-tab {
    flex-grow: 1; }
  :host o-button {
    margin: 0;
    gap: 0;
    padding: 0;
    width: 40px;
    height: 40px;
    font-size: 15pt; }
    :host o-button.clear {
      display: none; }

:host(:not([search=""])) o-tabs {
  grid-template-rows: 1fr; }

:host(:not([search=""])) o-tabs::part(content),
:host(:not([search=""])) o-tabs::part(header) {
  display: none; }

:host(:not([search=""])) o-icon[name="search"] {
  display: none; }

:host(:not([search=""])) o-button.clear {
  display: flex; }`;
