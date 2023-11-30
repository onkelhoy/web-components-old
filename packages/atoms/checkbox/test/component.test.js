import { fixture } from '@pap-it/tools-test';

describe('Checkbox', function () 
{
  describe('base tests', function () 
  {
    it('web-component should exists', function () 
    {
      const elm = fixture('pap-checkbox');

      if (!elm) 
      {
        throw new Error('element not created')
      }

      const docelm = document.querySelector(`pap-checkbox[data-testid="${elm.getAttribute('data-testid')}"]`);
      
      if (!docelm) 
      {
        throw new Error('element not found');
      }
    });
  });
});