// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/dropdown/wc';

let PAGINATION_CASE_VALUE = 0;

window.onload = () => {
  console.log('[demo]: window loaded');

  let k = 0;
  window.dynamic_content_btn.onclick = () => {
    const dropdown = document.querySelector('pap-dropdown[name="dynamic-content"]');
    const start = ~~(Math.random() * 10);
    const end = start + ~~(Math.random() * 10) + 3;

    k++;
    // goal
    dropdown.options = new Array(end - start).fill(0).map((_v, i) => i + start);

    // if (k % 2 === 0)
    // {
    //     dropdown.innerHTML = "<pap-option value='3'>Hello</pap-option>"
    // }
    // else 
    // {
    //     dropdown.innerHTML = "<pap-option value='2'>Bajs</pap-option>"
    // }
  }

  window.pagination_case_INIT.onclick = () => {
    window.pagination_case.options = new Array(10).fill(0).map((_v, i) => ({ value: i.toString(), text: (i + 1).toString() }));
  }
  window.pagination_case_INC.onclick = () => {
    PAGINATION_CASE_VALUE = Math.min(9, PAGINATION_CASE_VALUE + 1);
    window.pagination_case.value = PAGINATION_CASE_VALUE.toString();
  }
  window.pagination_case_DEC.onclick = () => {
    PAGINATION_CASE_VALUE = Math.max(0, PAGINATION_CASE_VALUE - 1);
    window.pagination_case.value = PAGINATION_CASE_VALUE.toString();
  }
}
