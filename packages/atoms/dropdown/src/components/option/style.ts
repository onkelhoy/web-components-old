export const style = `:host {
  display: flex;
  align-items: center;
  gap: var(--gap-small, 8px);
  padding: var(--option-padding, 0.3rem 0.5rem);
  cursor: pointer;
  user-select: none;
  --option-background-hover: var(--pap-option-background-hover-light, var(--pap-color-hover-100, rgba(0,0,0,0.03)));
  --option-background-active: var(--pap-option-background-active-light, var(--pap-color-hover-400, rgba(0,0,0,0.1))); }

:host(:hover) {
  background-color: var(--option-background-hover); }

:host(:active) {
  background-color: var(--option-background-active); }

::slotted(*:not(pap-typography)) {
  font-family: var(--typography-c3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c3-fontsize, 1rem);
  font-weight: var(--typography-c3-fontweight, 400);
  line-height: var(--typography-c3-lineheight, 140%);
  letter-spacing: var(--typography-c3-letterspacing, 0.01rem); }

@media (prefers-color-scheme: dark) {
  :host {
    --option-background-hover: var(--pap-option-background-hover-dark, rgba(255, 255, 255, 0.03));
    --option-background-active: var(--pap-option-background-active-dark, rgba(255, 255, 255, 0.1)); } }`;
