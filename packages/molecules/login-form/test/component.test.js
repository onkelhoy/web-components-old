import { fixture } from '@circular-tools/test';

describe('Login-form', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-login-form');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-login-form[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});