export const style = `:host {
  --background: var(--code-background-dark, rgb(22, 22, 30));
  --tag: var(--code-tag-dark, rgb(153, 153, 153));
  --tag-name: var(--code-tag-name-dark, rgb(128, 152, 219));
  --attribute: var(--code-attribute-dark, rgb(163, 244, 255));
  --attribute-value: var(--code-attribute-value-dark, rgb(189, 186, 101));
  --content: var(--code-content-dark, rgb(240, 240, 240));
  --button-color: var(--code-button-color-dark, rgb(0, 0, 0));
  --button-background: var(--code-border-button-color-dark, hsl(52, 79%, 60%));
  --button-background-hover: var(--code-button-background-hover-dark, hsl(52, 79%, 42%));
  --button-background-active: var(--code-button-background-active-dark, hsl(52, 79%, 60%)); }

@media (prefers-color-scheme: light) {
  :host {
    --background: var(--code-background-light, rgb(232, 232, 232));
    --tag: var(--code-tag-light, rgb(111, 111, 111));
    --tag-name: var(--code-tag-name-light, rgb(134, 94, 45));
    --attribute: var(--code-attribute-light, rgb(144, 123, 58));
    --attribute-value: var(--code-attribute-value-light, rgb(39, 48, 167));
    --content: var(--code-content-light, rgb(19, 19, 19));
    --button-color: var(--code-button-color-light, rgb(255, 255, 255));
    --button-background: var(--code-button-background-light, cornflowerblue);
    --button-background-hover: var(--code-button-background-hover-light, hsl(219, 79%, 80%));
    --button-background-active: var(--code-button-background-active-light, cornflowerblue); } }

code {
  position: relative;
  background-color: var(--background);
  padding: 1rem;
  display: block;
  border-radius: 0.3rem;
  margin: 1rem 0;
  min-height: 3rem; }
  code span.attribute {
    color: var(--attribute); }
  code span.attribute-value {
    color: var(--attribute-value); }
  code span.tag {
    color: var(--tag); }
  code span.tag-name {
    color: var(--tag-name); }
  code span.content {
    color: var(--content); }
  code pre {
    margin: 0; }
  code button#copy {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.2rem 1rem;
    border: none;
    cursor: pointer;
    background-color: var(--button-background);
    color: var(--button-color);
    letter-spacing: 2px;
    font-weight: 600;
    border-top-right-radius: 4px; }
    code button#copy:hover {
      background-color: var(--button-background-hover); }
    code button#copy:active {
      background-color: var(--button-background-active); }

:host([display="code"]) fieldset {
  display: none; }`;
