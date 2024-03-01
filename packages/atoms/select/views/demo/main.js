// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/select/wc';

let PAGINATION_CASE_VALUE = 0;
window.onload = () => {
  console.log('[demo]: window loaded');
  document.querySelectorAll('pap-select').forEach(select => {
    select.addEventListener('change', e => console.log(e.target.value));
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(e.target);
      alert(Array.from(data));
    })
  })

  // let k = 0;
  // window.dynamic_content_btn.onclick = () => {
  //   const select = document.querySelector('pap-select[name="dynamic-content"]');
  //   const start = ~~(Math.random() * 10);
  //   const end = start + ~~(Math.random() * 10) + 3;

  //   k++;
  //   // goal
  //   select.options = new Array(end - start).fill(0).map((_v, i) => i + start);
  // }

  window.pagination_case.options = [
    { value: '0', text: '1' },
    { value: '1', text: '2' },
    { value: '2', text: '3' },
    { value: '3', text: '4' },
  ]

  window.pagination_case_INIT.onclick = () => {
    window.pagination_case.options = new Array(10).fill(0).map((_v, i) => ({ value: i.toString(), text: (i + 1).toString() }));
  }
  window.pagination_case_INC.onclick = () => {
    PAGINATION_CASE_VALUE = Math.min(9, PAGINATION_CASE_VALUE + 1);
    console.log('inc', PAGINATION_CASE_VALUE)
    window.pagination_case.value = PAGINATION_CASE_VALUE.toString();
  }
  window.pagination_case_DEC.onclick = () => {
    PAGINATION_CASE_VALUE = Math.max(0, PAGINATION_CASE_VALUE - 1);
    console.log('dec', PAGINATION_CASE_VALUE)
    window.pagination_case.value = PAGINATION_CASE_VALUE.toString();
  }
}
