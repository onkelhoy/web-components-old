import { fixture } from '@onkelhoy/tools-test';

describe('Tooltip', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-tooltip');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-tooltip[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});