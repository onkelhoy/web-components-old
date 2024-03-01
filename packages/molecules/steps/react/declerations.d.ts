
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-steps': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').Steps> & import('./Steps').Attributes, HTMLElement>;
		'pap-circle': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/circle/index.js').Circle> & import('./Circle').CircleAttributes, HTMLElement>;
  }
}
