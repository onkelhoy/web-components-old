// tools
import '@circular-tools/doc/wc';

// component
import '@circular-tools/translator/wc';

window.onload = () => {
    window.oTranslation.loadAll(
        [
            {
                id: "translation-demo",
                name: "translation-demo",
                translations: {
                    "Hello World": "Translated Hello World",
                    "Hello {name}": "Translated Hello {name}",
                    "bajs": "BAAAAAJS"
                }
            },
            {
                id: "translation-demo-2",
                name: "translation-demo-2",
                translations: {
                    "Hello World": "Translated 2 Hello World",
                    "Hello {name}": "Translated 2 Hello {name}",
                    "bajs": "BAAAAAJS 2"
                }
            }
        ]
    );
    window.oTranslation.change('translation-demo');

    const translationToggleMap = {
        "translation-demo": "translation-demo-2",
        "translation-demo-2": "translation-demo",
    }
    window['toggle-translation'].onclick = () => {

        window.oTranslation.change(translationToggleMap[window.oTranslation?.current.id]);
    }
    console.log('[demo]: window loaded');
}
