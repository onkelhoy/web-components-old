import { fixture } from '@henry2/tools-test';

describe('Codeblock', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-codeblock');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-codeblock[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});