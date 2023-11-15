import { fixture } from '@papit/tools-test';

describe('Badge', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-badge');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-badge[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});