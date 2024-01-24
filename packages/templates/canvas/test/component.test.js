import { fixture } from '@pap-it/tools-test';

describe('CanvasTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-canvas-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-canvas-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});