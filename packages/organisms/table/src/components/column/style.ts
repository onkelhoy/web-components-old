export const style = `:host{display:flex;align-items:center;justify-content:space-between;cursor:pointer;box-sizing:border-box;background-color:var(--pap-color-bg-tertiary, #EAEBEF);padding-block:var(--padding-smaller, 4px);padding-left:var(--padding-medium, 16px);padding-right:var(--padding-small, 8px)}:host pap-typography[key=subtitle]{color:var(--pap-color-text-secondary-ontertiary, #6E7087)}:host(:hover){background-color:var(--pap-color-bg-hover, #DADDE3)}:host([sort=none]) div.sort>pap-icon{display:none}:host([sort=none]:hover) div.sort>pap-icon[name="sort.none"]{display:inline-flex}:host([sort=asc]) div.sort>pap-icon:not([name="sort.asc"]){display:none}:host([sort=desc]) div.sort>pap-icon:not([name="sort.desc"]){display:none}:host([size=small]){height:var(--field-size-medium, 40px)}:host([size=medium]){height:var(--field-size-large, 48px)}:host([size=large]){height:var(--field-size-larger, 56px)}`;