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
  :host o-divider {
    height: var(--unit-size2, 8px);
    display: none;
    width: 100%; }
    :host o-divider::part(line) {
      background-color: var(--o-color-border-tertiary, #EAEBEF); }
  :host o-button {
    padding-left: var(--padding-left);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0; }
    :host o-button span[slot="prefix"] {
      display: flex;
      justify-content: center;
      align-items: center; }
      :host o-button span[slot="prefix"].indicator {
        margin-left: var(--margin-medium); }
        :host o-button span[slot="prefix"].indicator::after {
          content: '';
          width: var(--unit-size2, 8px);
          height: var(--unit-size2, 8px);
          border-radius: 50%;
          display: none;
          background-color: var(--o-color-bg-brand, #009DD3); }
      :host o-button span[slot="prefix"].caret {
        display: none; }
    :host o-button::part(content) {
      margin-left: 0; }
    :host o-button span.group {
      flex-grow: 1;
      display: inline-flex;
      align-items: center;
      gap: var(--gap-small);
      white-space: nowrap;
      justify-content: flex-start;
      width: 100%; }
    :host o-button o-icon.selected {
      display: none; }

:host([isparent="false"][indicator="false"]) span[slot="prefix"] {
  margin-left: var(--margin-large); }

:host([counter]) o-button::part(content) {
  max-width: calc(100% - 6rem); }

:host([isparent="true"]) *[slot],
:host([isparent="true"]) .group o-icon {
  display: none !important; }

:host([isparent="true"]) span[slot="prefix"].caret {
  display: inline-flex !important;
  color: var(--o-color-icon-secondary, #6E7087); }

:host([isparent="true"]) o-button::part(content) {
  max-width: 100%; }

:host([isparent="true"]) .group o-typography {
  color: var(--o-color-text-secondary, #6E7087); }

:host(.selected:not([isparent="true"])) o-button {
  background-color: var(--o-sidebar-item-selected-bg, var(--o-color-bg-tertiary, #EAEBEF));
  color: var(--o-sidebar-item-selected-text, var(--o-color-text, #29292F)); }
  :host(.selected:not([isparent="true"])) o-button o-icon.selected {
    display: initial; }
  :host(.selected:not([isparent="true"])) o-button o-icon.unselected {
    display: none; }

:host o-button:hover o-badge::part(box),
:host o-button:active o-badge::part(box),
:host(.selected:not([isparent="true"])) o-button o-badge::part(box) {
  background-color: var(--o-color-bg, #FFFFFF) !important;
  border-color: var(--o-color-border, #C7CBD4) !important;
  color: var(--o-color-text, #29292F) !important; }

:host([open="false"]) span[slot="prefix"].caret {
  transform: rotate(-90deg); }

:host([open="false"]) o-divider {
  display: flex; }

:host([indicator="true"]) span[slot="prefix"].indicator::after {
  display: inline; }

@container (max-width: 150px) {
  :host o-button {
    display: inline-flex;
    border-top-left-radius: var(--radius-max, 1000px);
    border-bottom-left-radius: var(--radius-max, 1000px);
    min-width: 0;
    padding: 0;
    width: var(--field-size-medium, 40px);
    height: var(--field-size-medium, 40px); }
    :host o-button span.group {
      justify-content: center; }
    :host o-button::part(content) {
      margin-left: auto; }
  :host o-typography,
  :host o-badge,
  :host span[slot="prefix"],
  :host o-divider {
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
  :host([isparent="true"]) o-button {
    position: relative; }
    :host([isparent="true"]) o-button *[slot],
    :host([isparent="true"]) o-button span[slot="prefix"].caret,
    :host([isparent="true"]) o-button .group o-icon {
      display: none !important; }
    :host([isparent="true"]) o-button::after {
      content: '';
      width: var(--unit-size3, 16px);
      height: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: var(--o-color-border, #C7CBD4);
      transform: translate(-50%, -50%); } }`;
