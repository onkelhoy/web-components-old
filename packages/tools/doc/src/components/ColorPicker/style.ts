export const style = `:host {
  --size: var(--colorpicker-size, 300px);
  --border-outer: #000;
  --border-inner: #fff;
  width: calc(var(--size) + 2.5rem);
  height: calc(var(--size) + 2.5rem);
  display: grid;
  grid-template-columns: var(--size) 2rem;
  grid-template-rows: var(--size) 2rem;
  grid-template-areas: "area slide" "output output";
  column-gap: 0.5rem;
  row-gap: 0.5rem; }

@media (prefers-color-scheme: dark) {
  :host {
    --border-outer: #fff;
    --border-inner: #000; } }

div {
  grid-area: area; }

div + div {
  grid-area: slide; }

div + div + div {
  grid-area: output;
  background-color: var(--output-color, red); }

div {
  position: relative; }
  div.area {
    height: 100%;
    content: '';
    background: linear-gradient(to right, white, var(--target-color, red)), linear-gradient(to top, black, transparent);
    background-blend-mode: multiply; }
    div.area span.picker {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid var(--border-inner);
      outline: 1px solid var(--border-outer);
      position: absolute;
      top: 0;
      left: 100%;
      transform: translate(-50%, -50%); }
  div input[type="range"] {
    height: 2rem;
    width: var(--size);
    background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
    -webkit-appearance: none;
    /* Override default CSS styles */
    appearance: none;
    transform-origin: center;
    transform: translate(calc(-50% + 1rem), -50%) rotate(90deg);
    margin: 0;
    top: 50%;
    left: 0;
    position: absolute; }
    div input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      /* Override default look */
      appearance: none;
      width: 10px;
      /* Set a specific slider handle width */
      height: 2rem;
      /* Slider handle height */
      background: transparent;
      /* Green background */
      border: 1px solid var(--border-inner);
      outline: 1px solid var(--border-outer);
      cursor: pointer;
      /* Cursor on hover */ }
    div input[type="range"]::-moz-range-thumb {
      width: 10px;
      /* Set a specific slider handle width */
      height: 2rem;
      /* Slider handle height */
      background: transparent;
      /* Green background */
      border: 1px solid var(--border-inner);
      outline: 1px solid var(--border-outer);
      cursor: pointer;
      /* Cursor on hover */ }`;
