// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/header/wc';

window.onload = () => {
    console.log('[theme]: window loaded');

    window.oTheme.add({ name: "Blue", href: "blue", representColor: "cornflowerblue" });
    window.oTheme.add({ name: "Orange", href: "orange", representColor: "orange" });
}
