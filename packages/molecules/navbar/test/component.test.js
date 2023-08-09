import { fixture } from '@henry2/tools-test';

describe('Navbar', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-navbar');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-navbar[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});