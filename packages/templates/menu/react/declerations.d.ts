
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-menu-template': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').MenuTemplate> & import('./MenuTemplate').Attributes, HTMLElement>;
		'pap-item-template': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/item/index.js').ItemTemplate> & import('./ItemTemplate').ItemTemplateAttributes, HTMLElement>;
  }
}
