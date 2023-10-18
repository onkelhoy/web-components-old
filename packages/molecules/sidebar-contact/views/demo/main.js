// tools
import '@pap-it/system-doc/wc';

// component
import '@pap-it/sidebar-contact/wc';

window.onload = () => {
    const contactElement = document.querySelector('pap-sidebar-contact');
    if (contactElement)
    {
        contactElement.contacts = [
            {"name":"Philipp Kristen", "role": "Account manager", "email": "example@example.ex", "teams": "example@example.ex", "phone": "+4912345678"},
            {"name":"Ageta Crisstensson", "role": "Field service", "phone": "+4912345678"},
            {"name":"Philipp Kristen", "role": "Account manager", "email": "example@example.ex", "teams": "example@example.ex", "phone": "+4912345678"},
            {"name":"Oskar Månsson", "role": "Field service", "phone": "+4912345678", "email": "example@example.ex"},
            {"name":"Lennart Erikberg", "role": "Field service", "phone": "+4912345678", "teams": "adrien.vilcini@interzero.de"},
        ]
    }
}
