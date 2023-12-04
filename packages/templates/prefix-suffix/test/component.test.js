import { fixture } from '@pap-it/tools-test';

describe('PrefixSuffixTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-prefix-suffix-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-prefix-suffix-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});