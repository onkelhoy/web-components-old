import { fixture } from '@pap-it/tools-test';

describe('Table', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-table');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-table[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});