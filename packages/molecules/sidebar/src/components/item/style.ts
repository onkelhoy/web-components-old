export const style = `:host {
  container-type: inline-size;
  display: block;
  min-width: 3.5rem;
  margin-block: var(--margin-smaller, 4px); }
  :host div {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: var(--field-size-medium, 40px); }
  :host pap-divider {
    height: var(--unit-size2, 8px);
    display: none;
    width: 100%; }
    :host pap-divider::part(line) {
      background-color: var(--pap-color-border-tertiary, #EAEBEF); }
  :host pap-button {
    padding-left: var(--padding-left);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0; }
    :host pap-button span[slot="prefix"] {
      display: flex;
      justify-content: center;
      align-items: center; }
      :host pap-button span[slot="prefix"].indicator {
        margin-left: var(--margin-medium, 16px); }
        :host pap-button span[slot="prefix"].indicator::after {
          content: '';
          width: var(--unit-size2, 8px);
          height: var(--unit-size2, 8px);
          border-radius: 50%;
          display: none;
          background-color: var(--pap-color-bg-brand, #009DD3); }
      :host pap-button span[slot="prefix"].caret {
        display: none; }
    :host pap-button::part(content) {
      margin-left: 0; }
    :host pap-button span.group {
      flex-grow: 1;
      display: inline-flex;
      align-items: center;
      gap: var(--gap-small);
      white-space: nowrap;
      justify-content: flex-start;
      width: 100%; }
    :host pap-button pap-icon.selected {
      display: none; }

:host([isparent="false"][indicator="false"]) span[slot="prefix"] {
  margin-left: var(--margin-large, 24px); }

:host([counter]) pap-button::part(content) {
  max-width: calc(100% - 6rem); }

:host([isparent="true"]) *[slot],
:host([isparent="true"]) .group pap-icon {
  display: none !important; }

:host([isparent="true"]) span[slot="prefix"].caret {
  display: inline-flex !important;
  color: var(--pap-color-icon-secondary, #6E7087); }

:host([isparent="true"]) pap-button::part(content) {
  max-width: 100%; }

:host([isparent="true"]) .group pap-typography {
  color: var(--pap-color-text-secondary, #6E7087); }

:host(.selected:not([isparent="true"])) pap-button {
  background-color: var(--pap-sidebar-item-selected-bg, var(--pap-color-bg-tertiary, #EAEBEF));
  color: var(--pap-sidebar-item-selected-text, var(--pap-color-text, #29292F)); }
  :host(.selected:not([isparent="true"])) pap-button pap-icon.selected {
    display: initial; }
  :host(.selected:not([isparent="true"])) pap-button pap-icon.unselected {
    display: none; }

:host pap-button:hover pap-badge::part(box),
:host pap-button:active pap-badge::part(box),
:host(.selected:not([isparent="true"])) pap-button pap-badge::part(box) {
  background-color: var(--pap-color-bg, #FFFFFF) !important;
  border-color: var(--pap-color-border, #C7CBD4) !important;
  color: var(--pap-color-text, #29292F) !important; }

:host([open="false"]) span[slot="prefix"].caret {
  transform: rotate(-90deg); }

:host([open="false"]) pap-divider {
  display: flex; }

:host([indicator="true"]) span[slot="prefix"].indicator::after {
  display: inline; }

@container (max-width: 150px) {
  :host pap-button {
    display: inline-flex;
    border-top-left-radius: var(--radius-max, 1000px);
    border-bottom-left-radius: var(--radius-max, 1000px);
    min-width: 0;
    padding: 0;
    width: var(--field-size-medium, 40px);
    height: var(--field-size-medium, 40px); }
    :host pap-button span.group {
      justify-content: center; }
    :host pap-button::part(content) {
      margin-left: auto; }
  :host pap-typography,
  :host pap-badge,
  :host span[slot="prefix"],
  :host pap-divider {
    display: none !important; }
  :host([indicator="true"]) span[slot="prefix"].indicator {
    display: block !important;
    position: absolute;
    top: var(--unit-size1, 4px);
    right: var(--unit-size1, 4px);
    width: var(--unit-size2, 8px);
    height: var(--unit-size2, 8px); }
    :host([indicator="true"]) span[slot="prefix"].indicator::after {
      position: absolute; }
  :host([isparent="true"]) pap-button {
    position: relative; }
    :host([isparent="true"]) pap-button *[slot],
    :host([isparent="true"]) pap-button span[slot="prefix"].caret,
    :host([isparent="true"]) pap-button .group pap-icon {
      display: none !important; }
    :host([isparent="true"]) pap-button::after {
      content: '';
      width: var(--unit-size3, 16px);
      height: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: var(--pap-color-border, #C7CBD4);
      transform: translate(-50%, -50%); } }`;
