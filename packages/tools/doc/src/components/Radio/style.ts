export const style = `:host {
  --selected:rgb(255, 255, 255);
  --forground:rgb(243, 243, 243);
  --background: rgb(215, 215, 215);
  --color: black;
  --unselected-color: rgb(132, 132, 132);
  --selected-color: black;
  font-family: inherit;
  font-size: 12pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  user-select: none; }

@media (prefers-color-scheme: dark) {
  :host {
    --background: rgb(0, 0, 0);
    --color: white;
    --selected-color: white;
    --selected:rgb(48, 48, 48);
    --forground:rgb(63, 63, 63);
    --unselected-color: rgb(117, 117, 117); } }

label {
  color: var(--color);
  display: block; }

div {
  background-color: var(--background);
  display: flex;
  padding: 0.5rem;
  border-radius: 1000px;
  gap: 0.5rem; }
  div div {
    background-color: var(--forground);
    padding: 0.5rem 2rem;
    color: var(--unselected-color); }

:host([value="true"]) div.left {
  background-color: var(--selected);
  color: var(--selected-color);
  outline: 2px solid var(--unselected-color); }

:host([value="false"]) div.right {
  background-color: var(--selected);
  color: var(--selected-color);
  outline: 2px solid var(--unselected-color); }`;
