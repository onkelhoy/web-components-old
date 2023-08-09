import { fixture } from '@henry2/tools-test';

describe('Toggle', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-toggle');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-toggle[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});