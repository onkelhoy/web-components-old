export const style = `:host {
  display: block;
  --variant-bg-color: var(--o-color-bg-success);
  --variant-text-color: var(--o-color-text-success); }

showcase-card {
  margin-bottom: var(--margin-medium); }

showcase-card::part(box) {
  overflow: hidden; }
  showcase-card::part(box)::after {
    z-index: 9999;
    content: '';
    width: 100%;
    height: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--variant-bg-color); }

div {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-small); }
  div o-icon {
    background-color: var(--variant-bg-color);
    color: var(--variant-text-color);
    padding: var(--padding-smaller);
    border-radius: var(--radius-max); }

:host([variant="success"]) {
  --variant-bg-color: var(--o-color-bg-success);
  --variant-text-color: var(--o-color-text-inverse); }

:host([variant="error"]) {
  --variant-bg-color: var(--o-color-bg-danger);
  --variant-text-color: var(--o-color-text-inverse); }

:host([variant="warning"]) {
  --variant-bg-color: var(--o-color-bg-warning);
  --variant-text-color: var(--o-color-text); }`;
