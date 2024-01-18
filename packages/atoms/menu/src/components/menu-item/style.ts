export const style = `:host {
  font-family: var(--typography-c3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c3-fontsize, 1rem);
  font-weight: var(--typography-c3-fontweight, 400);
  line-height: var(--typography-c3-lineheight, 140%);
  letter-spacing: var(--typography-c3-letterspacing, 0.01rem); }
  :host pap-prefix-suffix-template {
    cursor: pointer;
    user-select: none;
    padding: var(--padding-small, 8px);
    padding-inline: var(--padding-medium, 16px); }
    :host pap-prefix-suffix-template:hover {
      background-color: var(--pap-color-hover-200, rgba(0, 0, 0, 0.05)); }
    :host pap-prefix-suffix-template::part(content) {
      flex: 1;
      justify-content: flex-start; }

:host([checked="false"]) pap-icon[name="check"] {
  display: none; }`;
