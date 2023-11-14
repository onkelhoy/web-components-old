export const style = `:host {
  --background: var(--o-markdown-background, var(--o-color-bg, #FFFFFF));
  --block-background: var(--o-markdown-block-background, var(--o-color-bg-tertiary, #EAEBEF));
  --block-ribbon: var(--o-markdown-block-ribbon, var(--o-color-bg-brand, #009DD3));
  --border: var(--o-markdown-border, var(--o-color-border, #C7CBD4));
  --color: var(--o-markdown-color, var(--o-color-text, #29292F));
  --link: var(--o-markdown-link, var(--o-color-text-link, #0177A3));
  --link-hover: var(--o-markdown-link-hover, var(--o-color-text-link-oninverse, #36CEFA));
  --table-header-background: var(--o-markdown-table-header-background, var(--o-color-hover-400, rgba(0,0,0,0.1)));
  display: block;
  color: var(--color);
  background-color: var(--background);
  padding: 1rem 10%;
  font-family: inherit; }

table {
  color: inherit;
  width: 100%; }
  table thead {
    border-bottom-width: 1px;
    border-bottom-color: var(--border);
    border-bottom-style: solid; }
    table thead th {
      background-color: var(--table-header-background);
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
        border-top-left-radius: var(--radius-small, 4px); }
      table thead th:last-child {
        border-right-width: 1px;
        border-right-color: var(--border);
        border-right-style: solid;
        border-top-right-radius: var(--radius-small, 4px); }
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
    border-bottom-right-radius: var(--radius-small, 4px); }
  table tbody tr:last-child td:first-child {
    border-bottom-left-radius: var(--radius-small, 4px); }

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
