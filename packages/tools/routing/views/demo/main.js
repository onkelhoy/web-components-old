// tools
import '@pap-it/system-doc/wc';

import '@pap-it/tools-routing/wc';

window.onload = () => {
  console.log('[demo]: window loaded');

  document.querySelector('#pagea').onclick = () => {
    document.querySelector('pap-routing').assetBase = "a"
  }
  document.querySelector('#pageb').onclick = () => {
    document.querySelector('pap-routing').assetBase = "b"
  }
}
