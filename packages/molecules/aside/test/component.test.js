import { fixture } from '@pap-it/tools-test';

describe('Aside', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-aside');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-aside[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});