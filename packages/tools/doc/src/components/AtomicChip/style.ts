export const style = `:host {
  --background: #1f1f1f;
  --color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  background-color: var(--background);
  color: var(--color); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: #ededed;
    --color: black; } }

:host([type="organisms"]) o-icon::part(svg) {
  stroke: none; }

:host([type="templates"]) o-icon::part(svg) {
  fill: none; }`;
