export const style = `:host {
  display: block; }

o-box-template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  min-height: 300px;
  background-color: var(--o-color-bg-secondary); }

:host([padding="large"]) o-box-template {
  padding: 60px 80px; }

:host([padding="medium"]) o-box-template {
  padding: var(--padding-medium) var(--padding-large); }

:host([padding="small"]) o-box-template {
  padding: var(--padding-medium); }`;
