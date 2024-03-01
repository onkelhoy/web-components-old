// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/tools-translator/wc';

window.onload = () => {
  window.papLocalization.add(
    {
      id: "translation-demo-2",
      meta: {
        region: "GB",
        language: "en"
      },
      translations: {
        "Hello World": "Translated 2 Hello World",
        "Hello {name}": "Translated 2 Hello {name}",
        "bajs": "BAAAAAJS 2",
        "{start} - {end} of {total}": "{start} - {end} AHA!!!! {total}",
        "Type here": "Type here then",
        "Your email address": "screw your email address"
      }
    }
  );

  const translationToggleMap = {
    "translation-demo": "translation-demo-2",
    "translation-demo-2": "translation-demo",
  }
  window['toggle-translation'].onclick = () => {
    window.papLocalization.change(translationToggleMap[window.papLocalization?.current.id] || 'translation-demo');
  }

  let start = 4;
  window.dec.onclick = () => {
    start--;
    window.paginationcase.setAttribute("start", start);
  }
  window.inc.onclick = () => {
    start++;
    window.paginationcase.setAttribute("start", start);
  }
  console.log('[demo]: window loaded');
}
