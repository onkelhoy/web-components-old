export const style = `:host {
  display: flex;
  align-items: center; }
  :host > div {
    flex: 1; }
  :host div[part="content"] {
    display: block; }
  :host div[part="edit"] {
    display: none; }
  :host pap-textarea {
    width: 100%;
    height: 100%; }

:host([mode="edit"]) div[part="content"] {
  display: none; }

:host([mode="edit"]) div[part="edit"] {
  display: block; }

:host([size="small"]) {
  height: var(--field-size-medium, 40px); }

:host([size="medium"]) {
  height: var(--field-size-large, 48px); }

:host([size="large"]) {
  height: var(--field-size-larger, 56px); }

:host([align="left"]) {
  justify-content: flex-start; }

:host([align="center"]) {
  justify-content: center; }

:host([align="right"]) {
  justify-content: flex-end; }`;
