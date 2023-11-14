export const style = `:host o-button {
  gap: 0;
  padding: 0;
  height: fit-content; }
  :host o-button o-icon {
    display: none; }

:host label {
  display: flex;
  align-items: center;
  gap: var(--gap-small, 8px); }

:host([eye="true"]) o-icon[name="eye-close"] {
  display: flex; }

:host([eye="false"]) o-icon[name="eye"] {
  display: flex; }`;
