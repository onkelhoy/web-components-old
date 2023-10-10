export const style = `:host {
  background-color: var(--o-color-secondary-950);
  color: var(--o-color-text-inverse);
  display: block;
  padding: 60px;
  padding-left: 100px;
  position: relative;
  overflow: hidden; }
  :host::after, :host::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 200%;
    padding-top: 60%;
    transform: translate(47%, -58%); }
  :host::after {
    opacity: .7;
    background: var(--o-color-primary-100);
    background: radial-gradient(circle, var(--o-color-primary-100) 0%, rgba(0, 0, 0, 0) 70%); }
  :host::before {
    opacity: .5;
    background: var(--o-color-primary-50);
    background: radial-gradient(circle, var(--o-color-primary-50) 0%, rgba(0, 0, 0, 0) 40%); }

div {
  max-width: 450px; }`;
