
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-select': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').Select> & import('./Select').Attributes, HTMLElement>;
		'pap-option': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/option/index.js').Option> & import('./Option').OptionAttributes, HTMLElement>;
  }
}
