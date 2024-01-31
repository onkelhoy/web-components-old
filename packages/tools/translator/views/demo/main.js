// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/tools-translator/wc';

window.onload = () => {
  window.papTranslation.addAll(
    [
      {
        id: "translation-demo",
        name: "translation-demo",
        translations: {
          "Hello World": "Translated Hello World",
          "Hello {name}": "Translated Hello {name}",
          "bajs": "BAAAAAJS",
          "scope.bajs": "Hey im a scoped BAJS"
        }
      },
      {
        id: "translation-demo-2",
        name: "translation-demo-2",
        translations: {
          "Hello World": "Translated 2 Hello World",
          "Hello {name}": "Translated 2 Hello {name}",
          "bajs": "BAAAAAJS 2",
          "Type here": "Type here then",
          "Your email address": "screw your email address"
        }
      }
    ]
  );
  window.papTranslation.change('translation-demo');

  const translationToggleMap = {
    "translation-demo": "translation-demo-2",
    "translation-demo-2": "translation-demo",
  }
  window['toggle-translation'].onclick = () => {
    window.papTranslation.change(translationToggleMap[window.papTranslation?.current.id] || 'translation-demo');
  }
  console.log('[demo]: window loaded');
}
