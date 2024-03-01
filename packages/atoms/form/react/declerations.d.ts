
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-form': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').Form> & import('./Form').Attributes, HTMLElement>;
		'pap-message': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/message/index.js').Message> & import('./Message').MessageAttributes, HTMLElement>;
  }
}
