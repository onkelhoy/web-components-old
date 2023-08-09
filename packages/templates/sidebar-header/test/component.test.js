import { fixture } from '@onkelhoy/tools-test';

describe('Sidebar-headerTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-sidebar-header-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-sidebar-header-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});