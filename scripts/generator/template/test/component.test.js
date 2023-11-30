import { fixture } from '@pap-it/tools-test';

describe('TEMPLATE_CLASSNAME', function () {
  describe('base tests', function () {
    it('web-component should exists', function () {
      const elm = fixture('TEMPLATE_PREFIXNAME');

      if (!elm) {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`TEMPLATE_PREFIXNAME[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) {
        throw new Error('element not found');
      }
    });
  });
});