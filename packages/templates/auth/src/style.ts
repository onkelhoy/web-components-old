export const style = `:host {
  display: grid;
  grid-template-rows: auto minmax(76px, auto) 57px 1fr 89px;
  grid-template-columns: 4fr 2fr 50% 2fr 4fr;
  grid-template-areas: "t t logo t2 t2" "z welcome welcome welcome z2" "k k note k2 k2" "k k form k2 k2" "k k footer k2 k2";
  justify-content: center;
  background-color: var(--o-color-white);
  position: relative;
  height: 100vh; }
  :host div.logo {
    grid-area: logo; }
  :host div.welcome {
    grid-area: welcome; }
  :host div.note {
    grid-area: note;
    margin-bottom: var(--margin-large); }
  :host div.form {
    grid-area: form; }
  :host div.footer {
    grid-area: footer; }
  :host div.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--gap-small); }
  :host ::slotted(o-button),
  :host o-button {
    gap: 0;
    padding: 0; }`;
