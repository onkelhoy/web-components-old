import { fixture } from '@henry2/tools-test';

describe('Markdown', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-markdown');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-markdown[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});