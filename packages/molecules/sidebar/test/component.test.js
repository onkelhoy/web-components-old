import { fixture } from '@henry2/tools-test';

describe('Sidebar', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-sidebar');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-sidebar[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});