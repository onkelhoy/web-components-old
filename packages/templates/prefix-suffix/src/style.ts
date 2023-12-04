export const style = `:host {
  align-items: center;
  display: flex;
  padding-inline: var(--padding-small, 8px);
  box-sizing: border-box;
  position: relative; }
  :host span.content {
    padding-inline: var(--padding-small, 8px);
    margin-inline: auto;
    gap: var(--gap-small);
    display: inline-flex;
    align-items: center;
    justify-content: center; }

:host([streched]) span.content {
  flex: 1; }`;
