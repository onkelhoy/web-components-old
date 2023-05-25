import { html } from "@circular-tools/utils";
import { BaseTemplate } from "@circular-templates/base";

import { Translator } from '@circular-tools/translator';

class InsideDemo extends BaseTemplate {
  render() {
    return html`
      <o-translator>${this.getAttribute('text')}</o-translator>
    `
  }
}

class ExtendDemo extends Translator {
  render() {
    return html`
      <label>${this.translateKey('bajs')}</label>
    `
  }
}

const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('translate-insidedemo')) {
  cElements.define('translate-insidedemo', InsideDemo);
}

if (!cElements.get('translate-extenddemo')) {
  cElements.define('translate-extenddemo', ExtendDemo);
}