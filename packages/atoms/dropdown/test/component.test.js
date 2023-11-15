import { fixture } from '@papit/tools-test';

describe('Dropdown', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-dropdown');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-dropdown[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});