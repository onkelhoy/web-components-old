// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/select/wc';

window.onload = () => 
{
  console.log('[demo]: window loaded');
  document.querySelectorAll('pap-select').forEach(select => 
  {
    select.addEventListener('change', e => console.log(e.target.value));
  });

  document.querySelectorAll('form').forEach(form => 
  {
    form.addEventListener('submit', e => 
    {
      e.preventDefault();
      const data = new FormData(e.target);
      alert(Array.from(data));
    })
  })
}
