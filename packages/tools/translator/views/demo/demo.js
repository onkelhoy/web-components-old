import { html } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

import { Translator } from '@pap-it/tools-translator';

class InsideDemo extends BaseSystem {
  render() {
    return html`
      <pap-translator>${this.getAttribute('text')}</pap-translator>
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

class ExtendDemo2 extends Translator {
  render() {
    const label = this.translateKey('Your email address');
    const placeholder = this.translateKey('Type here');
    return html`
      <p>${label}</p>
      <p>${placeholder}</p>
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

if (!cElements.get('translate-extenddemo2')) {
  cElements.define('translate-extenddemo2', ExtendDemo2);
}