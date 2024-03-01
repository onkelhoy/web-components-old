
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-sidebar': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').Sidebar> & import('./Sidebar').Attributes, HTMLElement>;
		'pap-sidebar-item': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/item/index.js').Item> & import('./Item').ItemAttributes, HTMLElement>;
  }
}
