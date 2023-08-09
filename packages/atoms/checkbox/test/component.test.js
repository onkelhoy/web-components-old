import { fixture } from '@onkelhoy/tools-test';

describe('Checkbox', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-checkbox');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-checkbox[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});