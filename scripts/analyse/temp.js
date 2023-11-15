const { parse } = require('node-html-parser');

var P=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var x=(d,t,e,r)=>{for(var i=r>1?void 0:r?M(t,e):t,s=d.length-1,c;s>=0;s--)(c=d[s])&&(i=(r?c(t,e,i):c(i))||i);return r&&i&&P(t,e,i),i};var k={type:String,attribute:!0,rerender:!0};function b(d){let t=d===void 0?k:{...k,...d};return function(e,r){let i=r.toLowerCase(),s=!1,c=e.constructor.observedAttributes||[];c.push(i),e.constructor.observedAttributes=c;let a=e.attributeChangedCallback||function(){};e.attributeChangedCallback=function(o,u,l){a.call(this,o,u,l),o===i&&!s&&(this[r]=A(l,t.type))},Object.defineProperty(e,r,{get(){return this[`_${r}`]},set(o){if(this[`_${r}`]===o)return;let u=this[`_${r}`];this[`_${r}`]=o,t.attribute&&(s=!0,this.setAttribute(i,$(o,t.type).toLowerCase()),s=!1),t.onUpdate&&this[t.onUpdate].call(this,o,u),t.rerender&&this.debouncedRequestUpdate()}})}}function A(d,t){switch(t.name){case"Boolean":return d.toLowerCase()==="true";case"Number":return Number(d);case"Object":case"Array":return JSON.parse(d);default:return t(d)}}function $(d,t){switch(t.name){case"Object":case"Array":return JSON.stringify(d);default:return String(d)}}function E(d,t=300){let e=null;return function(...r){e&&clearTimeout(e),e=setTimeout(()=>{d.apply(this,r),e=null},t)}}function w(d,t,e,r){var i=arguments.length,s=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,e):r,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(d,t,e,r);else for(var a=d.length-1;a>=0;a--)(c=d[a])&&(s=(i<3?c(s):i>3?c(t,e,s):c(t,e))||s);return i>3&&s&&Object.defineProperty(t,e,s),s}var _=class extends HTMLElement{constructor(){super(),this.callAfterUpdate=[],this.debouncedRequestUpdate=E(this.requestUpdate,100),this.attachShadow({mode:"open"}),this.callAfterUpdate.push(this.firstUpdate)}connectedCallback(){this.debouncedRequestUpdate(),this.attributeObserver=new MutationObserver((t,e)=>{for(let r of t)r.type==="attributes"&&r.attributeName&&this.attributeChangedCallback(r.attributeName,r.oldValue,this.getAttribute(r.attributeName))}),this.attributeObserver.observe(this,{attributes:!0})}disconnectedCallback(){this.attributeObserver.disconnect()}attributeChangedCallback(t,e,r){}getStyle(){var t;let e=this.constructor;return[...(t=e.styles)!==null&&t!==void 0?t:[],...typeof e.style=="string"?[e.style]:[]].join(" ")}requestUpdate(){if(this.shadowRoot){let t=this.render();this.shadowRoot.innerHTML=`
                <style>
                    ${this.getStyle()}
                </style>
                ${typeof t=="string"?t:""}
            `,t instanceof DocumentFragment&&this.shadowRoot.appendChild(t);let e,r=this.callAfterUpdate.reverse();for(;e=r.pop();)typeof e=="object"&&e.callback.call(this,...e.args),e instanceof Function&&e.call(this);this.callAfterUpdate=[]}}debouncedRequestUpdate(){}firstUpdate(){}render(){return"Hello From Base Class"}};var n=class{static init(){if(n.canvasContext)return;n.spectrumMap=new Map;let e=document.createElement("canvas").getContext("2d");if(e)n.canvasContext=e;else throw new Error("Could not create ContextAPI from canvas element");n.initspectrum()}static extractRootColors(){let t=[],e=document.styleSheets;for(let s=0;s<e.length;s++){let c=e[s].cssRules||e[s].rules;for(let a=0;a<c.length;a++){let o=c[a];if(o.selectorText===":root"){let u=7;o.cssText[5]==="{"&&(u=6);let l=o.cssText.slice(u,o.cssText.length-1).replace(/ /g,"");t=t.concat(l.split(";"))}}}let r=[],i=[];return t.forEach(s=>{if(s.startsWith("--color")){let[c,a]=s.split(":"),o=c.split("--color")[1];if(o[0]==="-"&&(o=o.slice(1,o.length)),/\d$/.test(c)){let u=o.match(/\d+/g),l=o.split(/-?\d+/);u&&(u==null?void 0:u.length)>0&&l.length>0&&r.push({value:a,name:l[0],number:u[0]})}else i.push({full:c,value:a,name:o})}}),{colors:i,sideColors:r}}static extractStyleColors(){let{colors:t,sideColors:e}=n.extractRootColors(),r=document.documentElement,i=r.style;Object.values(i).forEach(a=>{if(a.startsWith("--color")){let o=a.split("--color")[1];o[0]==="-"&&(o=o.slice(1,o.length));let u=r.style.getPropertyValue(a);if(/\d$/.test(a)){let l=o.match(/\d+/g),f=o.split(/-?\d+/);l&&(l==null?void 0:l.length)>0&&f.length>0&&e.push({value:u,name:f[0],number:l[0]})}else t.push({full:a,name:o,value:u})}});let s=new Set,c=Array.from(n.sideColors.keys());e.forEach(a=>{let o=a.name+a.number,u=n.sideColors.get(o),l=c.findIndex(f=>f===o);if(l>=0&&c.splice(l,1),!u||u.css!==a.value){let f=n.cssToRGB(a.value),[h,p,y]=n.rgbToHSL(f[0],f[1],f[2]),g={css:a.value,h,s:p,l:y};n.sideColors.set(o,g),s.add(a.name)}}),c.forEach(a=>{n.sideColors.delete(a),s.add(a.split(/-?\d+/)[0])}),t.forEach(a=>{let o=n.get(a.name);if(s.has(a.name)||!o||o&&o.original!==a.value){let u=n.spectrum(a.value,a.name,!0);n.set(a.name,{name:a.name,original:a.value,spectrum:u})}})}static initspectrum(){if(n.observer)return;let t=document.documentElement,e=(r,i)=>{for(let s of r)s.type==="attributes"&&s.attributeName==="style"&&n.extractStyleColors()};n.observer=new MutationObserver(e),n.observer.observe(t,{attributes:!0,attributeFilter:["style"]}),n.extractStyleColors()}static dispatch(t,e){(n.listeners.get(t)||[]).forEach(i=>i(e))}static checkSideColor(t,e,r){if(t){let i=n.sideColors.get(t+e);if(i)return r[e]=i,!0}return!1}static register(t,e){let r=n.listeners.get(t)||[];r.push(e),n.listeners.set(t,r)}static unregister(t,e){let r=(n.listeners.get(t)||[]).filter(i=>i!==e);n.listeners.set(t,r)}static isName(t){return n.spectrumMap.has(t)}static get(t){return n.spectrumMap.get(t)}static set(t,e){n.spectrumMap.set(t,e),n.dispatch(t,e)}static cssToRGB(t){n.canvasContext.fillStyle=t;let e=n.canvasContext.fillStyle;if(e.startsWith("#")){let r=e.substring(1),i=parseInt(r.slice(0,2),16),s=parseInt(r.slice(2,4),16),c=parseInt(r.slice(4,6),16);return[i,s,c]}return e.replace(/rgba?\(|\)|\s/g,"").split(",").map(r=>Number(r))}static rgbToHSL(t,e,r){t/=255,e/=255,r/=255;let i=Math.max(t,e,r),s=Math.min(t,e,r),c,a,o=(i+s)/2;if(i===s)c=a=0;else{let u=i-s;switch(a=o>.5?u/(2-i-s):u/(i+s),i){case t:c=(e-r)/u+(e<r?6:0);break;case e:c=(r-t)/u+2;break;case r:default:c=(t-e)/u+4;break}c/=6}return[c,a,o]}static hslToRgb(t,e,r){let i,s,c;if(e===0)i=s=c=r;else{let a=(l,f,h)=>(h<0&&(h+=1),h>1&&(h-=1),h<.16666666666666666?l+(f-l)*6*h:h<.5?f:h<.6666666666666666?l+(f-l)*(.6666666666666666-h)*6:l),o=r<.5?r*(1+e):r+e-r*e,u=2*r-o;i=a(u,o,t+1/3),s=a(u,o,t),c=a(u,o,t-1/3)}return[Math.round(i*255),Math.round(s*255),Math.round(c*255)]}static spectrum(t,e,r=!1){n.init();let i=n.get(t);if(i&&!r)return i.spectrum;let s=n.cssToRGB(t),[c,a,o]=n.rgbToHSL(s[0],s[1],s[2]),u=Math.min(o,1-o)/5,l={};for(let p=-4;p<=4;p++){let y=(9-(p+4))*100;if(n.checkSideColor(e,y,l))continue;let g=Math.min(Math.max(o+u*p,0),1);l[y]={h:c,s:a,l:g,css:`hsl(${c*360}, ${a*100}%, ${g*100}%)`}}let f=(c+.5)%1;n.checkSideColor(e,2e3,l)||(l[2e3]={h:f,s:a,l:o,css:`hsl(${f*360}, ${a*100}%, ${o*100}%)`}),n.checkSideColor(e,2e3,l)||(l[3e3]={h:c,s:.05,l:.97,css:`hsl(${c*360}, 5%, 97%)`}),n.checkSideColor(e,2e3,l)||(l[3100]={h:c,s:.05,l:.4,css:`hsl(${c*360}, 5%, 40%)`});let h=a/6;for(let p=0;p<5;p++){let y=(11+p)*100;if(n.checkSideColor(e,y,l))continue;let g=Math.min(Math.max(pap-h*p,0),1);l[(11+p)*100]={h:c,s:g,l:o,css:`hsl(${c*360}, ${g*100}%, ${o*100}%)`}}return l}};n.spectrumMap=new Map;n.listeners=new Map;n.sideColors=new Map;window.addEventListener("load",()=>n.init());var S=class extends _{constructor(){super(...arguments),this.setColors=()=>{if(!this.color)return;let t=n.spectrum(this.color);Object.entries(t).forEach(([e,r])=>{this.style.setProperty(`--color${e}`,r.css),this.style.setProperty(`--text-color${e}`,r.l>.6?"black":"white")})}}onColorUpdate(t,e){typeof e=="string"&&n.isName(e)&&n.unregister(e,this.setColors),n.isName(t)&&n.register(t,this.setColors),this.setColors()}};w([b({onUpdate:"onColorUpdate"})],S.prototype,"color",void 0);var j=`:host {
  --shadow-color: var(--box-shadow-light-color, rgba(0, 0, 0, 0.1)); }

@media (prefers-color-scheme: dark) {
  :host {
    --shadow-color: var(--box-shadow-dark-color, rgb(0, 0, 0)); } }

:host([radius="none"]) {
  border-radius: var(--box-radius-none, var(--radius-none, 0px)); }

:host([radius="small"]) {
  border-radius: var(--box-radius-small, var(--radius-small, 4px)); }

:host([radius="medium"]) {
  border-radius: var(--box-radius-medium, var(--radius-medium, 8px)); }

:host([radius="large"]) {
  border-radius: var(--box-radius-large, var(--radius-large, 16px)); }

:host([radius="circular"]) {
  border-radius: var(--box-radius-circular, var(--radius-circular, 1000px)); }

:host([elevation="none"]) {
  box-shadow: var(--box-shadow-none, var(--shadow-none, none)); }

:host([elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-small, 0 2px 4px var(--shadow-color))); }

:host([elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-medium, 0 2px 8px 2px var(--shadow-color))); }

:host([elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-large, 0 2px 15px 5px var(--shadow-color))); }`;var m=class extends S{constructor(){super(...arguments),this.radius="circular",this.elevation="none"}render(){return`
            <slot></slot>
        `}};m.style=j;w([b()],m.prototype,"radius",void 0);w([b()],m.prototype,"elevation",void 0);var T=`:host {
  cursor: var(--button-cursor, pointer);
  align-items: center;
  font-family: var(--button-font-family, var(--font-family, inherit));
  justify-content: space-between;
  gap: 0.5rem;
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */ }

:host([mode="hug"]) {
  display: inline-flex; }

:host([mode="fill"]) {
  display: flex; }

:host([size="small"]) {
  font-size: var(--button-font-size-small, var(--font-size-small, 0.8rem));
  height: var(--button-height-small, var(--height-small, 20px));
  padding: var(--button-padding, var(--padding-small, 0.5rem));
  border-width: var(--button-border-width, var(--border-width-small, 2px)); }

:host([size="medium"]) {
  font-size: var(--button-font-size-medium, var(--font-size-medium, 1rem));
  height: var(--button-height-medium, var(--height-medium, 32px));
  padding: var(--button-padding, var(--padding-medium, 1rem));
  border-width: var(--button-border-width, var(--border-width-medium, 3px)); }

:host([size="large"]) {
  font-size: var(--button-font-size-large, var(--font-size-large, 1.2rem));
  height: var(--button-height-large, var(--height-large, 48px));
  padding: var(--button-padding, var(--padding-large, 1rem));
  border-width: var(--button-border-width, var(--border-width-large, 4px)); }

:host([variant="clear"]) {
  background-color: var(--button-background-color-clear, transparent);
  color: var(--button-text-color-clear, var(--color500)); }

:host([variant="clear"]:hover) {
  background-color: var(--button-background-color-clear-hover, transparent);
  color: var(--button-text-color-clear-hover, var(--color600)); }

:host([variant="clear"]:active) {
  background-color: var(--button-background-color-clear-active, var(--color3000));
  color: var(--button-background-text-color-clear-active, var(--color700)); }

:host([variant="clear"][disabled]) {
  background-color: var(--button-background-color-clear-disabled, transparent);
  color: var(--button-text-color-clear-disabled, var(--disabled-text-color, var(--color3100))); }

:host([variant="underlined"]) {
  background-color: var(--button-background-color-underlined, transparent);
  color: var(--button-text-color-underlined, var(--color500)); }

:host([variant="underlined"]:hover) {
  background-color: var(--button-background-color-underlined-hover, transparent);
  color: var(--button-text-color-underlined-hover, var(--color600)); }

:host([variant="underlined"]:active) {
  background-color: var(--button-background-color-underlined-active, var(--color3000));
  color: var(--button-background-text-color-underlined-active, var(--color700)); }

:host([variant="underlined"][disabled]) {
  background-color: var(--button-background-color-underlined-disabled, transparent);
  color: var(--button-text-color-underlined-disabled, var(--disabled-text-color, var(--color3100))); }

:host([variant="outlined"]) {
  background-color: var(--button-background-color-outlined, transparent);
  color: var(--button-text-color-outlined, var(--color500)); }

:host([variant="outlined"]:hover) {
  background-color: var(--button-background-color-outlined-hover, transparent);
  color: var(--button-text-color-outlined-hover, var(--color600)); }

:host([variant="outlined"]:active) {
  background-color: var(--button-background-color-outlined-active, var(--color3000));
  color: var(--button-background-text-color-outlined-active, var(--color700)); }

:host([variant="outlined"][disabled]) {
  background-color: var(--button-background-color-outlined-disabled, transparent);
  color: var(--button-text-color-outlined-disabled, var(--disabled-text-color, var(--color3100))); }

:host([disabled]) {
  cursor: var(--button-cursor-disabled, not-allowed); }

:host([variant="filled"]) {
  background-color: var(--button-background-color-filled, var(--color500));
  color: var(--button-text-color-filled, var(--text-color500)); }

:host([variant="filled"]:hover) {
  background-color: var(--button-background-color-filled-hover, var(--color600));
  color: var(--button-text-color-filled-hover, var(--text-color600)); }

:host([variant="filled"]:active) {
  background-color: var(--button-background-color-filled-active, var(--color700));
  color: var(--button-text-color-filled-active, var(--text-color700)); }

:host([variant="filled"][disabled]) {
  background-color: var(--button-background-color-filled-disabled, var(--color1400));
  color: var(--button-text-color-filled-disabled, var(--disabled-text-color, var(--color3000))); }

:host([variant="outlined"]) {
  border-color: var(--button-border-color-outlined, var(--color500));
  border-style: var(--button-border-style, solid); }

:host([variant="outlined"]:hover) {
  border-color: var(--button-border-color-outlined-hover, var(--color600)); }

:host([variant="outlined"]:active) {
  border-color: var(--button-border-color-outlined-active, var(--color700)); }

:host([variant="outlined"][disabled]) {
  border-color: var(--button-border-color-outlined-disabled, var(--color1400)); }

:host([variant="underlined"]) {
  text-decoration: underline;
  text-decoration-thickness: var(--button-underlined-thickness, 1px); }

:host([variant="underlined"]:hover) {
  text-decoration-thickness: var(--button-underlined-hover-thickness, 2px); }

:host([variant="underlined"]:active) {
  text-decoration-thickness: var(--button-underlined-active-thickness, 2px); }

:host([variant="underlined"][disabled]) {
  text-decoration-thickness: var(--button-underlined-disabled-thickness, 1px); }`;var v=class extends m{constructor(){super();this.size="medium";this.mode="hug";this.variant="filled";this.tabIndex=1;setTimeout(()=>{this.color||(this.color="primary")},1)}render(){return`
            <slot name="left"><span> </span></slot>
            <slot></slot>
            <slot name="right"><span> </span></slot>
        `}};v.styles=[m.style,T],x([b()],v.prototype,"size",2),x([b()],v.prototype,"mode",2),x([b()],v.prototype,"variant",2),x([b()],v.prototype,"tabIndex",2);var O=customElements!=null?customElements:window==null?void 0:window.customElements;if(!O)throw new Error("Custom Elements not supported");O.get("pap-button")||O.define("pap-button",v);

const data = parse(v.render())

console.log(data)