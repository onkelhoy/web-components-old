import { fixture } from '@circular-tools/test';

describe('PopoverTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-popover-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-popover-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});