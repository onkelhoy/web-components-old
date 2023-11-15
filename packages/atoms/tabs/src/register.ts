import { Tabs } from './component.js';
import { Tab } from './components/tab/index.js';
import { TabContent } from './components/content/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-tab')) {
  cElements.define('pap-tab', Tab);
}

if (!cElements.get('pap-tab-content')) {
  cElements.define('pap-tab-content', TabContent);
}

if (!cElements.get('pap-tabs')) {
  cElements.define('pap-tabs', Tabs);
}
