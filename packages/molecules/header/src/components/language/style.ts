export const style = `:host {
  display: inline-block; }

.flag {
  display: inline-block;
  height: 24px;
  width: 24px;
  border-radius: 1000px;
  line-height: 28px;
  overflow: hidden; }
  .flag:not(.globe) span {
    left: -2rem;
    margin-left: -40%;
    font-size: 33pt; }

span.wrapper {
  display: flex;
  justify-content: center;
  align-items: center; }

::part(box) {
  min-width: 215px; }

.grid {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center; }`;
