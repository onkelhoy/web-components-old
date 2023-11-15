import { fixture } from '@papit/tools-test';

describe('Icon', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-icon');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-icon[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});