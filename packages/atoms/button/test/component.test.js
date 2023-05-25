import { fixture } from '@circular-tools/test';

describe('Button', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-button');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-button[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});