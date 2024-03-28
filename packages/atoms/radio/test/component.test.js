import { fixture } from '@pap-it/tools-test';

describe('Radio', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-radio');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-radio[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});