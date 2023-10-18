import { Card } from './components/Card';
import { Controller } from './components/Controller';
import { ColorPicker } from './components/ColorPicker';
import { ColorPickerInput } from './components/ColorPickerInput';
import { Input } from './components/Input';
import { Radio } from './components/Radio';

// include packages
import '@pap-it/tabs/wc';
import "@pap-it/codeblock/wc";
import "@pap-it/markdown/wc";
import "@pap-it/typography/wc";
import "@pap-it/icon/wc";
import "@pap-it/divider/wc";
import "@pap-it/header/wc";
import "@pap-it/tools-showcase/wc";

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('doc-card')) {
  cElements.define('doc-card', Card);
}

if (!cElements.get('doc-controller')) {
  cElements.define('doc-controller', Controller);
}

if (!cElements.get('color-picker')) {
  cElements.define('color-picker', ColorPicker);
}

if (!cElements.get('doc-input')) {
  cElements.define('doc-input', Input);
}

if (!cElements.get('doc-radio')) {
  cElements.define('doc-radio', Radio);
}

if (!cElements.get('color-picker-input')) {
  cElements.define('color-picker-input', ColorPickerInput);
}
