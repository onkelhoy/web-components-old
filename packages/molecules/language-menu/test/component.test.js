import { fixture } from '@pap-it/tools-test';

describe('LanguageMenu', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-language-menu');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-language-menu[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});