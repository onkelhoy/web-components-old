export const style = `:host {
  display: block;
  margin-block: var(--margin-medium, 16px);
  color: var(--o-color-text, #29292F); }
  :host .string {
    color: var(--o-color-text-warning, #984308); }
  :host .keyword {
    color: var(--o-color-text-danger, #A3111F); }
    :host .keyword.class, :host .keyword.implements, :host .keyword.extends, :host .keyword.this, :host .keyword.function {
      color: var(--o-color-primary-500, #0CB9Eb); }
  :host .function-arg {
    color: var(--o-color-text-warning, #984308); }
  :host .function-name {
    color: var(--o-color-text-brand-strong, #002652); }
  :host div.line {
    min-height: 12px;
    color: var(--o-color-text, #29292F); }
  :host .html-attribute {
    padding-left: var(--padding-smaller, 4px); }
    :host .html-attribute .html-attribute-name {
      color: var(--o-color-primary-700, #0177A3); }
    :host .html-attribute .html-attribute-value {
      color: var(--o-color-text-warning, #984308); }
  :host .html-tag {
    color: var(--o-color-neutral-700, #4D4E58); }
  :host .html-tag-name {
    color: var(--o-color-primary-500, #0CB9Eb); }
  :host code o-box-template {
    background-color: var(--o-color-bg-secondary, #F6F7F8);
    overflow: hidden;
    display: block; }
    :host code o-box-template header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: inherit;
      background-color: var(--o-color-bg-tertiary, #EAEBEF); }
      :host code o-box-template header > o-typography {
        text-indent: var(--padding-medium, 16px); }
      :host code o-box-template header o-toggle {
        color: var(--o-color-text, #29292F); }
      :host code o-box-template header o-button o-icon[name="done"] {
        display: none; }
      :host code o-box-template header o-button o-icon[name="content_paste"] {
        display: initial; }
    :host code o-box-template main {
      min-height: var(--unit-size5, 32px);
      padding: var(--padding-medium, 16px) var(--padding-large, 24px); }
  :host fieldset {
    background-color: var(--o-color-bg, #FFFFFF); }

:host([display="code"]) fieldset {
  display: none; }

:host(.copied) header o-button o-icon[name="done"] {
  display: initial; }

:host(.copied) header o-button o-icon[name="content_paste"] {
  display: none; }`;
