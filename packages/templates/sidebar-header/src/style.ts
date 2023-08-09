export const style = `:host {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 'sidebar header' 'sidebar body' 'footer footer'; }
  :host div.header {
    grid-area: header; }
  :host div.sidebar {
    grid-area: sidebar; }
  :host div.footer {
    grid-area: footer; }
  :host div.body {
    grid-area: body;
    padding: var(--padding-small); }`;
