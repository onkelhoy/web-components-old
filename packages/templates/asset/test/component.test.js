import { fixture } from '@pap-it/tools-test';

describe('Asset', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-asset-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-asset-template[data-testid="${elm.getAttribute('data-testid')}"]`);

      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});