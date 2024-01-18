export const style = `:host(:not([resize="none"])) pap-box-template.wrapper {
  height: auto; }
  :host(:not([resize="none"])) pap-box-template.wrapper pap-prefix-suffix-template {
    height: auto;
    padding-inline: 0;
    --pap-prefix-suffix-content-padding: 0; }

:host(:not([resize="none"])) textarea {
  padding: var(--padding-medium, 16px);
  box-sizing: border-box; }

:host(:not([resize="vertical"])) textarea {
  resize: none; }

:host([resize="vertical"]) textarea {
  resize: vertical; }`;
