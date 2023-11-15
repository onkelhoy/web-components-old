// tools
import '@papit/tools-doc/wc';

// components
import '@papit/sidebar/wc';
import '@papit/sidebar-contact/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    setTimeout(() => {
        document.querySelector('section#scrolling pap-sidebar').querySelector('div[part="body"]').scrollTop = 25;

        document.querySelectorAll('pap-sidebar-contact').forEach(elm => {
            elm.contacts = [
                {"name":"Philipp Kristen", "role": "Account manager", "email": "example@example.ex", "teams": "example@example.ex", "phone": "+4912345678"},
                {"name":"Ageta Crisstensson", "role": "Field service", "phone": "+4912345678"},
            ]
        });
    }, 300);
}
