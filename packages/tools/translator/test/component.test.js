import { fixture } from '@onkelhoy/tools-test';

describe('TranslatorTool', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-translator-tool');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-translator-tool[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});