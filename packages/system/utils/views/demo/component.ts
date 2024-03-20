// system
import { html, property, query, CustomElement } from "../../src/";

// local 
const style = ":host {background-color: blue; color:white;}"

type AO = {
  bajs: number;
  name: string;
}

export class TestComponent1 extends CustomElement {
  static styles = [style]

  @property() foo: string = "bar";
  @property({ type: Number }) bajs: number = 44;
  @property({ type: Boolean, attribute: 'foo-laa' }) fooLaa: boolean = true;
  @property({ type: Object, attribute: 'veryvery-goooood' }) good: AO = { bajs: 44, name: 'banan' };

  @query({
    selector: 'header', load: function (this: TestComponent1) {
      console.log('element loaded')
    }
  }) headerElement!: HTMLElement;

  render() {
    return html`
      <header part="header">
        <slot name="header">
          <h1>${this.foo}</h1>
        </slot>
      </header>
    `
  }
}


export class TestComponent2 extends CustomElement {
  static style = style;

  @property() foo: string = "bar";
  @property() OK: string = "bar";
  @property() bajsapa: string = "bar";
  @property() heheh: string = "bar";

  render() {
    return html`
      <header part="header">
        <slot name="header">
          <h1>${this.foo}</h1>
        </slot>
      </header>
    `
  }
}

export class TestComponent3 extends TestComponent1 {
  static styles = [...TestComponent1.styles, ':host {background-color: red;color:black;}']

  @property() snoske: string = "bar";
  @property() foo: string = "BAAJS";

  render() {
    return html`
      <header part="header">
        <slot name="header">
          <h1>${this.foo}</h1>
        </slot>
      </header>
    `
  }
}


export class TestComponent4 extends TestComponent3 {
  static style = ':host {background-color: yellow;}';

  @property() SLISKENOCHPISKEN = "hejsansvejkasn"

  render() {
    return html`
      <header part="header">
        <slot name="header">
          <h1>${this.foo}</h1>
        </slot>
      </header>
    `
  }
}

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

// if (!cElements.get('pap-editor-input')) {
//   cElements.define('pap-editor-input', Input);
// }

if (!cElements.get('test-component-1')) {
  cElements.define('test-component-1', TestComponent1);
}
if (!cElements.get('test-component-2')) {
  cElements.define('test-component-2', TestComponent2);
}

if (!cElements.get('test-component-3')) {
  cElements.define('test-component-3', TestComponent3);
}

if (!cElements.get('test-component-4')) {
  cElements.define('test-component-4', TestComponent4);
}
