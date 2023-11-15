import { fixture } from '@papit/tools-test';

describe('AuthTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-auth-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-auth-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});