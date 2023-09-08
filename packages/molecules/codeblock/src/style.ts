export const style = `:host {
  display: block;
  margin-block: var(--margin-medium);
  color: var(--o-color-text); }
  :host .string {
    color: var(--o-color-text-warning); }
  :host .keyword {
    color: var(--o-color-text-danger); }
    :host .keyword.class, :host .keyword.implements, :host .keyword.extends, :host .keyword.this, :host .keyword.function {
      color: var(--o-color-primary-500); }
  :host .function-arg {
    color: var(--o-color-text-warning); }
  :host .function-name {
    color: var(--o-color-text-brand-strong); }
  :host div.line {
    min-height: 12px;
    color: var(--o-color-text); }
  :host .html-attribute {
    padding-left: var(--padding-smaller); }
    :host .html-attribute .html-attribute-name {
      color: var(--o-color-primary-700); }
    :host .html-attribute .html-attribute-value {
      color: var(--o-color-text-warning); }
  :host .html-tag {
    color: var(--o-color-neutral-700); }
  :host .html-tag-name {
    color: var(--o-color-primary-500); }
  :host code o-box-template {
    background-color: var(--o-color-bg-secondary);
    overflow: hidden;
    display: block; }
    :host code o-box-template header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: inherit;
      background-color: var(--o-color-bg-tertiary); }
      :host code o-box-template header > o-typography {
        text-indent: var(--padding-medium); }
      :host code o-box-template header o-toggle {
        color: var(--o-color-text); }
      :host code o-box-template header o-button o-icon[name="done"] {
        display: none; }
      :host code o-box-template header o-button o-icon[name="content_paste"] {
        display: initial; }
    :host code o-box-template main {
      min-height: var(--unit-size5);
      padding: var(--padding-medium) var(--padding-large); }
  :host fieldset {
    background-color: var(--o-color-bg); }

:host([display="code"]) fieldset {
  display: none; }

:host(.copied) header o-button o-icon[name="done"] {
  display: initial; }

:host(.copied) header o-button o-icon[name="content_paste"] {
  display: none; }`;
