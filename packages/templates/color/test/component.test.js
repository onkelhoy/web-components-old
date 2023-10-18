import { fixture } from '@pap-it/tools-test';

describe('ColorTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-color-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-color-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});