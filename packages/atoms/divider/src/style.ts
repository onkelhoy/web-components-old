export const style = `:host {
  --color: var(--o-divider-color-light, var(--o-color-netural-200)); }
  :host div {
    background-color: var(--color);
    content: ''; }

@media (prefers-color-scheme: dark) {
  :host {
    --color: var(--o-divider-color-dark, var(--o-color-netural-200)); } }

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
