export const style = `:host {
  display: block;
  height: 100%;
  position: relative;
  overflow: hidden;
  --background: var(--controller-light-background, #fafafa);
  --color: var(--controller-light-color, black);
  --border: var(--controller-light-border, rgb(138,138,138));
  color: var(--color); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--controller-dark-background, rgb(48 48 48));
    --color: var(--controller-dark-color, white);
    --border: var(--controller-dark-border, rgb(143, 143, 143)); } }

main {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 2rem);
  height: 100%;
  padding: 1rem; }

section {
  background-color: var(--background);
  width: calc(100% - 1rem);
  position: absolute;
  user-select: none;
  bottom: 0;
  min-height: 5rem;
  max-height: calc(100vh - 10rem);
  border-top: 4px solid var(--border);
  padding: 0.5rem;
  overflow-y: auto;
  height: 50%;
  padding-top: 40px;
  padding-bottom: 80px; }
  section span.resize {
    position: sticky;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    content: '';
    transform: translateY(-40px);
    cursor: row-resize; }
  section:has(span.resize:hover) {
    border-top-color: cornflowerblue; }`;
