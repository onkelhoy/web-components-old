// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/header/wc';

window.onload = () => {
  console.log('[theme]: window loaded');

  window.papTheme.add({ name: "KTV", href: "/themes/ktv", representColor: "cornflowerblue" });
  window.papTheme.add({ name: "PMP", href: "/themes/pmp", representColor: "orange" });
}
