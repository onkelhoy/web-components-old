// tools
import '@henry2/tools-doc/wc';

// components
import '@henry2/sidebar/wc';
import '@henry2/sidebar-contact/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    setTimeout(() => {
        document.querySelector('section#scrolling o-sidebar').querySelector('div[part="body"]').scrollTop = 25;

        document.querySelectorAll('o-sidebar-contact').forEach(elm => {
            elm.contacts = [
                {"name":"Philipp Kristen", "role": "Account manager", "email": "example@example.ex", "teams": "example@example.ex", "phone": "+4912345678"},
                {"name":"Ageta Crisstensson", "role": "Field service", "phone": "+4912345678"},
            ]
        });
    }, 300);
}
