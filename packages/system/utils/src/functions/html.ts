export function findComments(element:Node) {
    let arr = [];
    for(let i = 0; i < element.childNodes.length; i++) {
        let node = element.childNodes[i];
        if(node.nodeType === 8) { // Check if node is a comment
            arr.push(node);
        } else {
            arr.push.apply(arr, findComments(node));
        }
    }
    return arr;
}
function insertElement(parent:Node, comment:Node, indexes: RegExpMatchArray | null, values:any[]) {
    if (indexes === null) return;

    let target:any = values;
    for (let i=0; i<indexes.length; i++) {
        const index = Number(indexes[i]);
        target = target[index];
    }
    try {
        parent.insertBefore(target as DocumentFragment, comment);
    }
    catch (e) 
    {
        console.error(e);
        console.log('what is going on here', parent);
    }
}

export function html(strings: TemplateStringsArray, ...values: any[]) {
    let result = "";

    for (let i = 0; i < values.length; i++) {
        // NOTE the reason why td is because the tr would move it outside, its anyway just temp so should work in all cases
        if (values[i] instanceof Array)
        {
            let arr = []; // NOTE not supporting deep nested arrays now..
            for (let j=0; j<values[i].length; j++)
            {
                if (values[i][j] instanceof DocumentFragment)
                {
                    arr.push(`<!-- comment-node-${i}.${j} -->`)
                }
            }
            if (arr.length > 0)
            {
                result += strings[i] + arr.join(' ')
                continue;
            }
        }
        if (values[i] instanceof DocumentFragment)
        {
            result += strings[i] + `<!-- comment-node-${i} -->`;
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

    findComments(content)
        .forEach(comment => {
            const parent = comment.parentNode;
            if (parent)
            {
                const trimmedCommentName = comment.nodeValue?.trim();
                if (trimmedCommentName?.startsWith("comment-node"))
                {
                    if (comment.textContent)
                    {
                        const indexes = comment.textContent.match(/\d+/g)
                        insertElement(parent, comment, indexes, values);
                    }
                }
                // else if (trimmedCommentName?.startsWith("comment-ref"))
                // {
                //     console.log('comment', comment.nodeValue)
                // }
    
                // NOTE could investigate to keep it for performance caching or something to determine which have been updating 
                parent.removeChild(comment);
            }
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

        element.removeAttribute('"');
    });

    return content;
}
