export const style = `:host{display:inline-block;color:var(--pap-color-icon, #29292F);--border-color: var(--pap-color-border, #C7CBD4);cursor:pointer}:host pap-box-template[part=main]{border:none;display:inline-flex;background-color:rgba(0,0,0,0);align-items:center;padding:0}:host pap-box-template[part=switch]{position:relative;content:"";display:flex;align-items:center;border:1px solid var(--border-color);background-color:var(--background);width:var(--width);height:var(--size)}:host pap-box-template[part=switch] span[part=circle]{content:"";position:absolute;display:flex;justify-content:center;align-items:center;transition:left ease var(--timing-fast, 80ms),scale ease var(--timing-fast, 80ms);border-radius:50%;background-color:var(--circle-background);box-sizing:border-box;width:var(--size);height:var(--size)}:host pap-box-template[part=switch]:focus{--border-color: var(--pap-color-border-strong, #29292F);outline:1px solid var(--border-color)}:host(:hover){--border-color: var(--pap-color-border-strong, #29292F)}:host([variant=primary]){--background: var(--pap-color-bg-tertiary, #EAEBEF);--circle-background: var(--pap-color-icon-secondary, #6E7087)}:host([variant=primary][checked=true]){--background: var(--pap-color-bg-success, #2E701B);--circle-background: var(--pap-color-bg, #FFFFFF);--border-color: var(--pap-color-bg-success, #2E701B)}:host([variant=secondary]){--background: var(--pap-color-bg, #FFFFFF);--circle-background: var(--pap-color-bg-inverse, #29292F)}:host([size=small]){--size: var(--unit-size3, 16px);--width: 28px}:host([size=medium]){--size: var(--field-size-smaller, 24px);--width: 44px}:host([size=large]){--size: var(--field-size-small, 32px);--width: 60px}:host([mode=fill]) pap-box-template[part=main]{display:flex}:host([checked=false]) span[part=circle]{left:0}:host([scale=true][checked=false]) span[part=circle]{scale:.6}:host([checked=true]){--circle: var(--circle-selected)}:host([checked=true]) span[part=circle]{left:calc(100% - var(--size))}`;