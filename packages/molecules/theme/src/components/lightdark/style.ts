export const style = `:host pap-toggle::part(indicator) {
  background-color: transparent; }

:host pap-toggle[checked="true"] pap-icon[name="light-mode"] {
  display: none; }

:host pap-toggle[checked="false"] pap-icon[name="dark-mode"] {
  display: none; }`;
