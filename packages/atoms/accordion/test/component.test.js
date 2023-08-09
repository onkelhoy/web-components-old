import { fixture } from '@henry2/tools-test';

describe('Accordion', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-accordion');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-accordion[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});