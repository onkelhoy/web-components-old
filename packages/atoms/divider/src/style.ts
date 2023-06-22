export const style = `:host {
  --color: var(--divider-light-color, var(--colors-netural-grey300, #F1F1F4)); }
  :host div {
    background-color: var(--color);
    content: ''; }

@media (prefers-color-scheme: dark) {
  :host {
    --color: var(--divider-dark-color, var(--colors-netural-grey700, #101010)); } }

:host([mode="horizontal"]) {
  display: flex;
  align-items: center;
  height: 16px; }
  :host([mode="horizontal"]) div {
    height: 1px;
    flex-grow: 1;
    transform: translateY(0.5px); }

:host([mode="vertical"]) {
  margin-inline: var(--divider-margin, 8px);
  height: 100%; }
  :host([mode="vertical"]) div {
    width: '1px';
    height: 100%; }`;
