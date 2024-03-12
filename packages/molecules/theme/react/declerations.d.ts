
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-theme': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').ThemeContainer> & import('./ThemeContainer').Attributes, HTMLElement>;
		'pap-lightdark': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/lightdark/index.js').Lightdark> & import('./Lightdark').LightdarkAttributes, HTMLElement>;
		'pap-theme-menu': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/theme-menu/index.js').ThemeMenu> & import('./ThemeMenu').ThemeMenuAttributes, HTMLElement>;
  }
}
