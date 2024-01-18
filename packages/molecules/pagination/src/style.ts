export const style = `:host {
  container-type: inline-size;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: var(--unit-size7, 48px);
  gap: var(--gap-small, 8px);
  padding-inline: var(--padding-medium, 16px); }
  :host span.flex {
    display: flex;
    align-items: center;
    gap: var(--gap-small, 8px); }
  :host span:has(pap-button) {
    min-width: max-content; }
  :host pap-dropdown {
    width: 6rem; }
    :host pap-dropdown::part(menu) {
      max-height: 30rem; }

@container (max-width: 768px) {
  :host pap-button[data-type="last"],
  :host pap-button[data-type="first"],
  :host span.page pap-dropdown + pap-typography,
  :host span.flex:not(.page) + pap-divider,
  :host span.flex:not(.page) + pap-divider + pap-typography,
  :host span.flex:not(.page) {
    display: none !important; } }`;
