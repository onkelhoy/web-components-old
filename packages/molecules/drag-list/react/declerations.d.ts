
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-drag-list': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').DragList> & import('./DragList').Attributes, HTMLElement>;
		'pap-drag-list-item': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/item/index.js').Item> & import('./Item').ItemAttributes, HTMLElement>;
  }
}
