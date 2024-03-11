
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-menu': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').Menu> & import('./Menu').Attributes, HTMLElement>;
		'pap-menu-item': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/menu-item/index.js').Item> & import('./Item').ItemAttributes, HTMLElement>;
  }
}
