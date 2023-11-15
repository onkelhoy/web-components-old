export const style = `:host pap-button {
  gap: 0;
  padding: 0;
  height: fit-content; }
  :host pap-button pap-icon {
    display: none; }

:host label {
  display: flex;
  align-items: center;
  gap: var(--gap-small, 8px); }

:host([eye="true"]) pap-icon[name="eye-close"] {
  display: flex; }

:host([eye="false"]) pap-icon[name="eye"] {
  display: flex; }`;
