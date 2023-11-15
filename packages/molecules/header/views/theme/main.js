// tools
import '@papit/tools-doc/wc';

// component
import '@papit/header/wc';

window.onload = () => {
    console.log('[theme]: window loaded');

    window.oTheme.add({ name: "KTV", href: "ktv", representColor: "cornflowerblue" });
    window.oTheme.add({ name: "PMP", href: "pmp", representColor: "orange" });
}
