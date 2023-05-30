import { Tabs } from './component.js';
import { Tab } from './components/tab/index.js';
import { TabContent } from './components/content/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-tab')) {
  cElements.define('o-tab', Tab);
}

if (!cElements.get('o-tab-content')) {
  cElements.define('o-tab-content', TabContent);
}

if (!cElements.get('o-tabs')) {
  cElements.define('o-tabs', Tabs);
}
