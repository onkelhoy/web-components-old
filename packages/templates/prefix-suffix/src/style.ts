export const style = `:host {
  align-items: center;
  display: flex;
  padding-inline: var(--pap-prefix-suffix-padding, var(--padding-small, 8px));
  box-sizing: border-box;
  position: relative; }
  :host span.content {
    padding-inline: var(--pap-prefix-suffix-content-padding, var(--padding-small, 8px));
    margin-left: var(--pap-prefix-suffix-content-margin-left, auto);
    margin-right: var(--pap-prefix-suffix-content-margin-right, auto);
    gap: var(--gap-small);
    display: inline-flex;
    align-items: center;
    justify-content: center; }

:host([streched]) span.content {
  flex: 1; }`;