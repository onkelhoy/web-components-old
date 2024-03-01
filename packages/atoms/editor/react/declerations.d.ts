
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-editor': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').Editor> & import('./Editor').Attributes, HTMLElement>;
		'pap-editor-input': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/input/index.js').Input> & import('./Input').InputAttributes, HTMLElement>;
  }
}
