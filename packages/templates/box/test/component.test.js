import { fixture } from '@circular-tools/test';

describe('BoxTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-box-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-box-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});