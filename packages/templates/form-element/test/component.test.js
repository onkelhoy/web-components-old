import { fixture } from '@henry2/tools-test';

describe('Form-elementTemplate', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('o-form-element-template');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`o-form-element-template[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});