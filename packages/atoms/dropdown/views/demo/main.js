// tools
import '@onkelhoy/tools-doc/wc';

// component
import '@onkelhoy/dropdown/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    let k = 0;
    window.dynamic_content_btn.onclick = () => {
        const dropdown = document.querySelector('o-dropdown[name="dynamic-content"]');
        const start = ~~(Math.random() * 10);
        const end = start + ~~(Math.random() * 10) + 3;

        k++;
        // goal
        dropdown.options = new Array(end - start).fill(0).map((_v, i) => i + start);

        // if (k % 2 === 0)
        // {
        //     dropdown.innerHTML = "<o-option value='3'>Hello</o-option>"
        // }
        // else 
        // {
        //     dropdown.innerHTML = "<o-option value='2'>Bajs</o-option>"
        // }
    }
}
