// tools
import '@henry2/tools-doc/wc';

// component
import '@henry2/header/wc';

window.onload = () => {
    console.log('[theme]: window loaded');

    window.oTheme.add({ name: "KTV", href: "ktv", representColor: "cornflowerblue" });
    window.oTheme.add({ name: "PMP", href: "pmp", representColor: "orange" });
}
