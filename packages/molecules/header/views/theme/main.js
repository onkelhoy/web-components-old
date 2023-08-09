// tools
import '@onkelhoy/tools-doc/wc';

// component
import '@onkelhoy/header/wc';

window.onload = () => {
    console.log('[theme]: window loaded');

    window.oTheme.add({ name: "Blue", href: "blue", representColor: "cornflowerblue" });
    window.oTheme.add({ name: "Orange", href: "orange", representColor: "orange" });
}
