import { fixture } from '@papit/tools-test';

describe('Divider', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-divider');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-divider[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});