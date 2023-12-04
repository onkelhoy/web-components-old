export const style = `:host {
  --background: var(--dropdown-background, var(--pap-color-neutral-50)); }
  :host pap-popover-template {
    --popover-gap: var(--gap-small, 8px);
    flex-grow: 1;
    width: 100%; }
    :host pap-popover-template input {
      width: 100%; }
    :host pap-popover-template::part(wrapper) {
      width: 100%; }
    :host pap-popover-template pap-box-template.options {
      box-sizing: border-box;
      padding: var(--padding-small, 8px);
      width: 100%;
      display: block;
      background-color: var(--background);
      border: 1px solid grey;
      max-height: 15rem;
      overflow-y: auto; }

:host([size="small"]) pap-box-template.wrapper {
  height: var(--pap-field-height-small, var(--field-size-small, 32px)); }

:host([size="small"]) footer,
:host([size="small"]) header {
  height: var(--pap-field-block-height-small, var(--field-size-small, 32px)); }

:host([size="medium"]) pap-box-template.wrapper {
  height: var(--pap-field-height-medium, var(--field-size-medium, 40px)); }

:host([size="medium"]) footer,
:host([size="medium"]) header {
  height: var(--pap-field-block-height-medium, var(--field-size-small, 32px)); }

:host([size="large"]) pap-box-template.wrapper {
  height: var(--pap-field-height-large, var(--field-size-large, 56px)); }

:host([size="large"]) footer,
:host([size="large"]) header {
  height: var(--pap-field-block-height-large, var(--field-size-small, 32px)); }

:host([placement="bottom-left"][size="small"]) pap-popover-template::part(wrapper),
:host([placement="bottom-center"][size="small"]) pap-popover-template::part(wrapper),
:host([placement="bottom-right"][size="small"]) pap-popover-template::part(wrapper) {
  top: calc(var(--field-size-small, 32px) + var(--field-size-small)); }

:host([placement="bottom-left"][size="medium"]) pap-popover-template::part(wrapper),
:host([placement="bottom-center"][size="medium"]) pap-popover-template::part(wrapper),
:host([placement="bottom-right"][size="medium"]) pap-popover-template::part(wrapper) {
  top: calc(var(--field-size-small, 32px) + var(--field-size-medium)); }

:host([placement="bottom-left"][size="large"]) pap-popover-template::part(wrapper),
:host([placement="bottom-center"][size="large"]) pap-popover-template::part(wrapper),
:host([placement="bottom-right"][size="large"]) pap-popover-template::part(wrapper) {
  top: calc(var(--field-size-small, 32px) + var(--field-size-large)); }

:host([popoveropen="true"]) pap-icon[name="caret"] {
  transform: rotate(180deg); }`;
