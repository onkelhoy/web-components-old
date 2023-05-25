export function html(strings: TemplateStringsArray, ...values: any[]) {
    let result = "";

    for (let i = 0; i < values.length; i++) {
        if (values[i] instanceof DocumentFragment)
        {
            result += strings[i] + `<doc-frag index="${i}"></doc-frag>`
            continue;
        }
        const trimmed = strings[i].trim();
        const match = trimmed.match(/.*\s(on|@)([\w-]*)=/);

        if (match) 
        {
            const [_whole, eventtype, name] = match;
            const split = trimmed.split(eventtype+name);
            result += split[0] + ` @${name}="${i}"`
        }
        else 
        {
            result += strings[i] + values[i];
        }
    }

    result += strings[values.length];

    const template = document.createElement("template");
    template.innerHTML = result.trim();

    const content = template.content;

    content.querySelectorAll('doc-frag').forEach(element => {
        const index = Number(element.getAttribute('index'));
        Array
            .from((values[index] as DocumentFragment).children)
            .reverse()
            .forEach(item => element.insertAdjacentElement('afterend', item))

        element.parentElement?.removeChild(element);
    })

    content.querySelectorAll<HTMLElement>("*").forEach(element => {
        Array.from(element.attributes).forEach((attr) => {
            if (attr.name.startsWith('@')) {
                const eventName = attr.name.slice(1);
                const indexValue = Number(element.getAttribute(attr.name));
                element.removeAttribute(attr.name);
                element.addEventListener(eventName, values[indexValue]);
            }
        });
    });

    return content;
}
