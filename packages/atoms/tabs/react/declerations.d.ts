
declare namespace JSX {
  interface IntrinsicElements {
  	'pap-tabs': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/component.js').Tabs> & import('./Tabs').Attributes, HTMLElement>;
		'pap-tab-content': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/content/index.js').TabContent> & import('./TabContent').TabContentAttributes, HTMLElement>;
		'pap-tab': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/components/tab/index.js').Tab> & import('./Tab').TabAttributes, HTMLElement>;
  }
}
