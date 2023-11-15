import { fixture } from '@papit/tools-test';

describe('Toggle', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-toggle');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-toggle[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});