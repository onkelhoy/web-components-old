// tools
import '@circular-tools/doc/wc';

// component
import '@circular/accordion/wc';

window.onload = () => {
    console.log('[demo]: window loaded, WTF');

    window.openBTN.onclick = () => {
        console.log('open')
        window.target.open = true;
    }

    window.closeBTN.onclick = () => {
        console.log('close')
        window.target.open = false;
    }
}
