export const style = `:host {
  display: flex;
  flex-direction: column;
  gap: var(--gap-medium, 16px);
  background-color: var(--pap-color-bg, #FFFFFF); }
  :host pap-table-header {
    position: relative;
    z-index: 2;
    padding-block: var(--padding-medium, 16px); }
  :host pap-table-menu pap-tabs::part(header) {
    background-color: var(--pap-color-bg-secondary, #F6F7F8); }
  :host pap-table-menu pap-tabs pap-tab {
    padding-bottom: var(--padding-small, 8px); }
    :host pap-table-menu pap-tabs pap-tab div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--gap-smaller, 4px); }
  :host pap-box-template[part="wrapper"] {
    display: block;
    background-color: var(--pap-color-bg-secondary, #F6F7F8); }
    :host pap-box-template[part="wrapper"] table {
      width: 100%; }`;
