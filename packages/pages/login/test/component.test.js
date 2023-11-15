import { fixture } from '@papit/tools-test';

describe('LoginPage', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-login-page');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-login-page[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});