export const style = `:host {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-small); }

:host([hidden]) o-menu {
  display: none; }

.theme-color {
  display: block;
  content: '';
  width: var(--container-size-small);
  height: var(--container-size-small);
  border-radius: 50%; }

o-toggle::part(indicator) {
  background-color: transparent; }

o-toggle[checked="true"] o-icon[name="light-mode"] {
  display: none; }

o-toggle[checked="false"] o-icon[name="dark-mode"] {
  display: none; }`;