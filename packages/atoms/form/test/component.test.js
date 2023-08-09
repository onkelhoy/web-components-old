import { fixture } from '@onkelhoy/tools-test';

describe('Form', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-form');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-form[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});