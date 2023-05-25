export const style = `:host {
  --background: var(--markdown-dark-background, rgb(48, 48, 48));
  --block-background: var(--markdown-dark-block-background, rgb(68, 68, 68));
  --block-ribbon: var(--markdown-dark-block-ribbon, rgb(100, 149, 237));
  --border: var(--markdown-dark-border, rgb(255, 255, 255));
  --color: var(--markdown-dark-color, rgb(255, 255, 255));
  --link: var(--markdown-dark-link, rgb(156, 156, 255));
  --link-hover: var(--markdown-dark-link-hover, rgb(138, 138, 253));
  display: block;
  color: var(--color);
  background-color: var(--background);
  padding: 1rem 10%;
  font-family: inherit;
  border-radius: 4px; }

@media (prefers-color-scheme: light) {
  :host {
    --background: var(--markdown-light-background, #fafafa);
    --block-background: var(--markdown-light-block-background, #ededed);
    --block-ribbon: var(--markdown-light-block-ribbon, cornflowerblue);
    --border: var(--markdown-light-border, #000000);
    --color: var(--markdown-light-color, rgb(0, 0, 0));
    --link: var(--markdown-light-link, rgb(84, 84, 213));
    --link-hover: var(--markdown-light-link-hover, rgb(37, 37, 137)); } }

table {
  color: inherit;
  width: 100%; }
  table thead {
    border-bottom-width: 1px;
    border-bottom-color: var(--border);
    border-bottom-style: solid; }
    table thead th {
      background-color: rgba(236, 236, 241, 0.2);
      border-top-width: 1px;
      border-top-color: var(--border);
      border-top-style: solid;
      border-left-width: 1px;
      border-left-color: var(--border);
      border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: var(--border);
      border-bottom-style: solid;
      padding: 0.25rem 0.75rem; }
      table thead th:first-child {
        border-top-left-radius: 0.375rem; }
      table thead th:last-child {
        border-right-width: 1px;
        border-right-color: var(--border);
        border-right-style: solid;
        border-top-right-radius: 0.375rem; }
  table tbody td {
    border-left-width: 1px;
    border-left-color: var(--border);
    border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--border);
    border-bottom-style: solid;
    padding: 0.25rem 0.75rem; }
    table tbody td:last-child {
      border-right-width: 1px;
      border-right-color: var(--border);
      border-right-style: solid; }
  table tbody tr:last-child td:last-child {
    border-bottom-right-radius: 0.375rem; }
  table tbody tr:last-child td:first-child {
    border-bottom-left-radius: 0.375rem; }

a {
  color: var(--link); }
  a:hover {
    text-decoration-thickness: 2px;
    color: var(--link-hover); }

h1 {
  border-bottom: var(--border) 1px solid; }

div.blockquote {
  background-color: var(--block-background);
  padding: 0.6rem;
  position: relative;
  padding-left: 1.2rem; }
  div.blockquote::after {
    width: 0.3rem;
    height: 100%;
    position: absolute;
    left: 0.3rem;
    top: 0;
    content: '';
    background-color: var(--block-ribbon); }

@media screen and (min-width: 1024px) {
  :host {
    padding: 1rem 20%; } }`;
