import { fixture } from '@henry2/tools-test';

describe('Dropdown', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-dropdown');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-dropdown[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});