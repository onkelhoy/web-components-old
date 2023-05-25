import { fixture } from '@circular-tools/test';

describe('UtilsTool', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-utils-tool');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-utils-tool[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});