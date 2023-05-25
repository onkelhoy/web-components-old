import { fixture } from '@circular-tools/test';

describe('AssetTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-asset-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-asset-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});