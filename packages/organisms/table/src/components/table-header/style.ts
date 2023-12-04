export const style = `:host {
  container-type: inline-size;
  display: block; }
  :host header {
    display: flex;
    flex-direction: row; }
    :host header div.top {
      flex: 1; }
    :host header > pap-divier {
      display: none; }
  :host div {
    display: flex;
    align-items: center;
    height: var(--field-size-medium, 40px); }
    :host div pap-search {
      margin-left: auto; }
    :host div.actions {
      gap: var(--gap-small, 8px);
      padding-inline: var(--padding-small, 8px); }
      :host div.actions pap-button:nth-child(n + 7) {
        display: none; }
      :host div.actions pap-button:last-child {
        display: block; }
      :host div.actions pap-menu pap-menu-item:nth-child(-n+7) {
        display: none; }
  :host div:has(pap-search[toggled="true"]) pap-typography {
    display: none; }
  :host div:has(pap-search[toggled="true"]) pap-search {
    flex: 1; }

@container (max-width: 768px) {
  :host div.actions pap-button:nth-child(n + 3) {
    display: none; }
  :host div.actions pap-button:last-child {
    display: block; }
  :host div.actions pap-menu pap-menu-item:nth-child(-n+3) {
    display: none; }
  :host div.actions pap-menu pap-menu-item:nth-child(n+4) {
    display: block; } }

@container (max-width: 320px) {
  :host header {
    flex-direction: column; }
    :host header > pap-divier {
      display: block; }
    :host header div.bottom {
      flex-direction: row-reverse; }
      :host header div.bottom pap-button[data-name="save"] {
        margin-right: auto; }
      :host header div.bottom pap-divider {
        display: none; } }`;
