// tools
import '@pap-it/system-doc';

// component
import '@pap-it/accordion';

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

  window.horizontalopenBTN.onclick = () => {
    console.log('open horizontal')
    window.horizontaltarget.open = true;
  }

  window.horizontalcloseBTN.onclick = () => {
    console.log('close horizontal')
    window.horizontaltarget.open = false;
  }
}
