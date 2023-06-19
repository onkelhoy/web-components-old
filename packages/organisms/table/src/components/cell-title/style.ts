export const style = `:host {
  height: 56px;
  display: flex;
  padding-inline: 0.7rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  color: var(--tblecelltitle-text-color-light, var(--color-primary-600, black));
  background-color: var(--tablecelltitle-background-light, var(--color-neutral-300, #F1F1F4)); }
  :host o-typography {
    white-space: nowrap;
    /* Prevents the text from wrapping */
    overflow: hidden;
    /* Ensures the text is clipped */
    text-overflow: ellipsis;
    /* Apply the ellipsis */ }
  :host o-icon {
    user-select: none; }

:host([cansort="false"]) o-icon {
  display: none; }

:host([sorting="none"]) o-icon:not([name="table.sort.none"]) {
  display: none; }

:host([sorting="up"]) o-icon:not([name="table.sort.up"]) {
  display: none; }

:host([sorting="down"]) o-icon:not([name="table.sort.down"]) {
  display: none; }`;
