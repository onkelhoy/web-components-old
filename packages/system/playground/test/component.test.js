import { fixture } from '@pap-it/tools-test';

describe('PlaygroundSyste', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-playground-syste');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-playground-syste[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});