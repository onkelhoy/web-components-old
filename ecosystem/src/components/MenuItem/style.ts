export const style = `:host {
  display: block;
  font-family: inherit;
  --selected: var(--ecosystemmenuitem-light-selected, rgb(0, 0, 0));
  --selected-text: var(--ecosystemmenuitem-light-selected-text, rgb(255, 255, 255));
  --color: var(--ecosystemmenuitem-light-text-color, black);
  --sub-color: var(--ecosystemmenuitem-light-text-sub-color, rgb(19, 19, 19));
  --small-baground-color: var(--ecosystemmenuitem-light-small-baground-color, rgb(202, 202, 202));
  color: var(--color);
  user-select: none;
  container-type: inline-size; }

@media (prefers-color-scheme: dark) {
  :host {
    --selected: var(--ecosystemmenuitem-dark-selected, rgb(255, 255, 255));
    --selected-text: var(--ecosystemmenuitem-dark-selected-text, rgb(0, 0, 0));
    --color: var(--ecosystemmenuitem-dark-text-color, rgb(255, 255, 255));
    --sub-color: var(--ecosystemmenuitem-dark-text-sub-color, rgb(237, 237, 237));
    --small-baground-color: var(--ecosystemmenuitem-light-small-baground-color, rgb(100, 100, 100)); } }

.menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0.7rem;
  position: relative;
  color: var(--sub-color); }
  .menu:hover {
    background-color: var(--selected);
    color: var(--selected-text); }
    .menu:hover::after {
      background-color: var(--selected-text); }
  .menu ::slotted([slot="collapsed"]) {
    display: none; }

.child {
  padding-left: 1.2rem; }

.menu > o-icon {
  transition: transform 40ms ease; }

:host([haschild="true"]) .menu {
  font-size: 12pt; }

:host([haschild="false"]) .menu {
  padding-left: 1.5rem;
  font-size: 13pt; }
  :host([haschild="false"]) .menu::after {
    position: absolute;
    content: '';
    width: 0.25rem;
    height: 0.25rem;
    top: 50%;
    left: 0.7rem;
    background-color: var(--sub-color);
    transform: translate(-50%, -50%); }
  :host([haschild="false"]) .menu o-icon {
    display: none; }

:host([haschild="false"].selected) .menu {
  background-color: var(--selected);
  color: var(--selected-text); }
  :host([haschild="false"].selected) .menu::after {
    background-color: var(--selected-text); }

:host([open="true"][haschild="true"]) .menu > o-icon {
  transform: rotate(0); }

:host([open="false"][haschild="true"]) .menu > o-icon {
  transform: rotate(-90deg); }

:host([open="false"]) .child {
  display: none; }

:host([open="true"]) .child {
  display: block; }

@container (max-width: 6rem) {
  .menu {
    width: 4rem !important;
    height: 4rem !important;
    margin: auto;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: var(--small-baground-color);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem !important; }
    .menu::after {
      display: none; }
    .menu o-icon[name="caret"] {
      display: none; }
    .menu ::slotted(*) {
      display: none; }
    .menu ::slotted([slot="collapsed"]) {
      --icon-custom-size: 30px !important;
      display: initial; }
  .child {
    padding-left: 0; } }`;
