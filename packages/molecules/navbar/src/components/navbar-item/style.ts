export const style = `:host {
  --button-color: var(--o-navbaritem-text-color-light, var(--primary-100, #8A8D96));
  --button-color-selected: var(--o-navbaritem-text-color-selected-light, var(--primary-600, #000000));
  --button-background: var(--o-navbaritem-background-light, var(--neutral-100, white));
  --button-background-selected: var(--o-navbaritem-background-selected-light, var(--neutral-300, #F1F1F4));
  --button-background-hover: var(--o-navbaritem-background-hover-light, var(--neutral-300, #F1F1F4));
  --button-background-active: var(--o-navbaritem-background-active-light, var(--neutral-300, #F1F1F4));
  --indicator: var(--button-background);
  --indicator-selected: var(--o-navbaritem-indicator-selected-light, var(--b1-300, #009DD3));
  --count-border: var(--o-navbaritem-count-border-color-light, var(--neutral-300, #F1F1F4));
  --count-background: var(--o-navbaritem-count-background-color-light, var(--neutral-100, #ffffff));
  --count-background-selected: var(--o-navbaritem-count-background-color-selected-light, var(--neutral-200, #F8F8F8)); }

:host {
  display: block;
  min-width: 56px;
  container-type: inline-size; }
  :host o-button {
    --button-text-color-filled: var(--button-color);
    --button-text-color-filled-hover: var(--button-color-selected);
    --button-text-color-filled-active: var(--button-color-selected);
    --button-background-color-filled: var(--button-background);
    --button-background-color-filled-hover: var(--button-background-hover);
    --button-background-color-filled-active: var(--button-background-active); }
    :host o-button span[slot="prefix"] {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center; }
      :host o-button span[slot="prefix"].indicator::after {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--indicator); }
      :host o-button span[slot="prefix"].caret {
        display: none; }
    :host o-button span.group {
      flex-grow: 1;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      white-space: nowrap; }
    :host o-button:hover {
      --indicator: var(--button-background-hover); }
    :host o-button:active {
      --indicator: var(--button-background-active); }
    :host o-button o-box-template.counter {
      background-color: var(--count-background);
      border: 1px solid var(--count-border);
      color: var(--button-color);
      width: 48px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 28px;
      box-sizing: border-box; }
    :host o-button o-icon.selected {
      display: none; }
  :host o-accordion {
    padding-left: 1rem; }
    :host o-accordion ::slotted(o-navbar-item) {
      margin-block: var(--margin-small, 8px); }

:host([isparent="true"]) span[slot="prefix"].indicator {
  display: none; }

:host([isparent="true"]) span[slot="prefix"].caret {
  display: flex; }

:host(.selected) {
  --indicator: var(--indicator-selected); }
  :host(.selected) o-button {
    --button-background-color-filled: var(--button-background-selected);
    --button-text-color-filled: var(--button-color-selected); }
    :host(.selected) o-button:hover {
      --indicator: var(--indicator-selected); }
    :host(.selected) o-button:active {
      --indicator: var(--indicator-selected); }
    :host(.selected) o-button o-icon.selected {
      display: initial; }
    :host(.selected) o-button o-icon.unselected {
      display: none; }

:host([accordionopen="false"]) span[slot="prefix"].caret {
  transform: rotate(-90deg); }

@container (max-width: 150px) {
  :host o-button o-typography,
  :host o-button o-box-template.counter,
  :host o-button span[slot="prefix"] {
    display: none !important; }
  :host o-button span.group {
    justify-content: center;
    width: 100%; }
  :host o-accordion {
    display: none; } }

@container (min-width: 150px) {
  :host o-button {
    padding-left: 0; } }`;
