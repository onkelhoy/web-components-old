import { PDFviewer } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-pdf-viewer')) {
  cElements.define('pap-pdf-viewer', PDFviewer);
}
