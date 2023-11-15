import { fixture } from '@papit/tools-test';

describe('ThemeTool', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-theme-tool');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-theme-tool[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});