export const style = `:host {
  display: block; }
  :host code {
    overflow: hidden;
    position: relative;
    background-color: var(--o-color-bg-secondary);
    display: block;
    border-radius: var(--radius-small);
    min-height: 3rem; }
    :host code nav {
      width: 100%;
      background-color: var(--o-color-bg-tertiary);
      padding-inline: var(--padding-small);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between; }
    :host code span.attribute {
      color: var(--o-color-text-brand);
      margin-left: var(--margin-medium); }
    :host code span.attribute-value {
      color: var(--o-color-accent-01-800); }
    :host code span.tag {
      color: var(--o-color-text-secondary); }
    :host code span.tag-name {
      color: var(--o-color-text-success); }
    :host code span.content {
      color: var(--o-color-text); }
    :host code pre {
      margin: 0;
      padding: var(--padding-medium); }
  :host fieldset {
    margin-top: var(--margin-small);
    display: flex;
    flex-direction: column;
    gap: var(--gap-medium); }

:host([display="code"]) fieldset {
  display: none; }`;
