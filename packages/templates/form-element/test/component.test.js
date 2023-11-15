import { fixture } from '@papit/tools-test';

describe('Form-elementTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('pap-form-element-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-form-element-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});