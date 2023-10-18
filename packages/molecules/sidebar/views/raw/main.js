// tools
import '@pap-it/system-doc/wc';

// components
import '@pap-it/sidebar/wc';
import '@pap-it/sidebar-contact/wc';

window.onload = () => {
    console.log('[demo]: window loaded');

    const contactElement = document.querySelector('pap-sidebar-contact');
    if (contactElement)
    {
        contactElement.contacts = [
            {"name":"Philipp Kristen", "role": "Account manager", "email": "example@example.ex", "teams": "example@example.ex", "phone": "+4912345678"},
            {"name":"Ageta Crisstensson", "role": "Field service", "phone": "+4912345678"},
        ]
    }
}
