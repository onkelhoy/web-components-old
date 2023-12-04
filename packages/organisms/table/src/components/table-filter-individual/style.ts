export const style = `:host div:not(.fields) {
  display: flex;
  align-items: center;
  gap: var(--gap-small, 8px); }
  :host div:not(.fields).center {
    justify-content: center; }
  :host div:not(.fields).bottom-align {
    align-items: flex-end; }
  :host div:not(.fields) pap-dropdown,
  :host div:not(.fields) pap-input {
    width: 100%;
    min-width: 0; }

:host div.fields {
  display: flex;
  flex-direction: column;
  gap: var(--gap-medium, 16px);
  padding-block: var(--padding-medium, 16px); }
  :host div.fields:empty {
    padding-block: var(--padding-small, 8px); }
  :host div.fields div.field:has(pap-dropdown[value=""]) pap-input,
  :host div.fields div.field:has(pap-dropdown[value="empty"]) pap-input,
  :host div.fields div.field:has(pap-dropdown[value="not-empty"]) pap-input {
    display: none; }`;
