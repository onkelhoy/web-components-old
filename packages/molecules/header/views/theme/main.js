// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/header/wc';

window.onload = () => 
{
  console.log('[theme]: window loaded');

  window.oTheme.add({ name: "KTV", href: "/themes/ktv", representColor: "cornflowerblue" });
  window.oTheme.add({ name: "PMP", href: "/themes/pmp", representColor: "orange" });
}
