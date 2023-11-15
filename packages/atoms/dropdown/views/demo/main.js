// tools
import '@papit/tools-doc/wc';

// component
import '@papit/dropdown/wc';

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
}
