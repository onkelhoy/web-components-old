export const style = `:host {
  display: block; }
  :host code {
    overflow: hidden;
    position: relative;
    background-color: var(--pap-color-bg-secondary, #F6F7F8);
    display: block;
    border-radius: var(--radius-small, 4px);
    min-height: 3rem; }
    :host code nav {
      width: 100%;
      background-color: var(--pap-color-bg-tertiary, #EAEBEF);
      padding-inline: var(--padding-small, 8px);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between; }
    :host code span.attribute {
      color: var(--pap-color-text-brand, #0177A3);
      margin-left: var(--margin-medium, 16px); }
    :host code span.attribute-value {
      color: var(--pap-color-accent-01-800); }
    :host code span.tag {
      color: var(--pap-color-text-secondary, #6E7087); }
    :host code span.tag-name {
      color: var(--pap-color-text-success, #29591B); }
    :host code span.content {
      color: var(--pap-color-text, #29292F); }
    :host code pre {
      margin: 0;
      padding: var(--padding-medium, 16px); }
  :host fieldset {
    margin-top: var(--margin-small, 8px);
    display: flex;
    flex-direction: column;
    gap: var(--gap-medium, 16px); }

:host([display="code"]) fieldset {
  display: none; }`;