export const style = `:host {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-small, 8px); }

:host([hidden]) pap-menu {
  display: none; }

.theme-color {
  display: block;
  content: '';
  width: var(--field-size-small, 32px);
  height: var(--field-size-small, 32px);
  border-radius: 50%; }

pap-toggle::part(indicator) {
  background-color: transparent; }

pap-toggle[checked="true"] pap-icon[name="light-mode"] {
  display: none; }

pap-toggle[checked="false"] pap-icon[name="dark-mode"] {
  display: none; }`;
