export const style = `:host {
  --button-background-color-clear-hover: var(--smiley-hover-backgroun, rgba(0, 0, 0, 0.05)); }
  :host div.accordion {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows ease 500ms;
    overflow: hidden; }
    :host div.accordion o-chat-smileys {
      overflow: hidden; }
  :host div {
    display: flex;
    align-items: center; }
    :host div o-input {
      flex-grow: 1; }
      :host div o-input::part(wrapper) {
        gap: 0; }
    :host div o-button {
      padding: 0.4rem;
      gap: 0; }
      :host div o-button.smiley-close {
        display: none; }

:host([smileyopen="true"]) div.accordion {
  grid-template-rows: 1fr;
  margin-bottom: 1rem;
  border-bottom: 1px solid grey; }

:host([smileyopen="true"]) o-button.smiley-close {
  display: block; }`;
