import { fixture } from '@papit/tools-test';

describe('Chat', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-chat');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-chat[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});