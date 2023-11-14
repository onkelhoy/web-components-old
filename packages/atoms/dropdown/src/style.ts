export const style = `:host {
  --background: var(--dropdown-background-light, var(--o-color-neutral-50)); }
  :host o-popover-template {
    --popover-gap: var(--gap-small, 8px);
    flex-grow: 1;
    width: 100%; }
    :host o-popover-template input {
      width: 100%; }
    :host o-popover-template::part(wrapper) {
      width: 100%; }
    :host o-popover-template o-box-template.options {
      box-sizing: border-box;
      padding: var(--padding-small, 8px);
      width: 100%;
      display: block;
      background-color: var(--background);
      border: 1px solid grey;
      max-height: 15rem;
      overflow-y: auto; }

:host([size="small"]) o-box-template.wrapper {
  height: var(--o-field-height-small, var(--field-size-small, 32px)); }

:host([size="small"]) footer,
:host([size="small"]) header {
  height: var(--o-field-block-height-small, var(--field-size-small, 32px)); }

:host([size="medium"]) o-box-template.wrapper {
  height: var(--o-field-height-medium, var(--field-size-medium, 40px)); }

:host([size="medium"]) footer,
:host([size="medium"]) header {
  height: var(--o-field-block-height-medium, var(--field-size-small, 32px)); }

:host([size="large"]) o-box-template.wrapper {
  height: var(--o-field-height-large, var(--field-size-large, 56px)); }

:host([size="large"]) footer,
:host([size="large"]) header {
  height: var(--o-field-block-height-large, var(--field-size-small, 32px)); }

:host([placement="bottom-left"][size="small"]) o-popover-template::part(wrapper),
:host([placement="bottom-center"][size="small"]) o-popover-template::part(wrapper),
:host([placement="bottom-right"][size="small"]) o-popover-template::part(wrapper) {
  top: calc(var(--field-size-small, 32px) + var(--field-size-small)); }

:host([placement="bottom-left"][size="medium"]) o-popover-template::part(wrapper),
:host([placement="bottom-center"][size="medium"]) o-popover-template::part(wrapper),
:host([placement="bottom-right"][size="medium"]) o-popover-template::part(wrapper) {
  top: calc(var(--field-size-small, 32px) + var(--field-size-medium)); }

:host([placement="bottom-left"][size="large"]) o-popover-template::part(wrapper),
:host([placement="bottom-center"][size="large"]) o-popover-template::part(wrapper),
:host([placement="bottom-right"][size="large"]) o-popover-template::part(wrapper) {
  top: calc(var(--field-size-small, 32px) + var(--field-size-large)); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--dropdown-background-dark, var(--o-color-neutral-50)); } }

:host([popoveropen="true"]) o-icon[name="caret"] {
  transform: rotate(180deg); }`;
