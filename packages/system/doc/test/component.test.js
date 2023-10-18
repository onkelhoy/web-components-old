import { fixture } from '@pap-it/tools-test';

describe('DocTool', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-doc-tool');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-doc-tool[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});