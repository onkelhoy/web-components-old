const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { deepMerge } = require('./util');

// constants 
const SUBFOLDER = process.argv[2];
const HTMLPATH = process.argv[3];
const PACKAGENAME = process.argv[4];
const ATOMICTYPE = process.argv[5];

// this is for global (for now)
const GLOBAL = process.argv[6];

const FOLDER_PATH = path.join("views", SUBFOLDER);
let DEFAULT_CONFIG = {
    name: SUBFOLDER
};
let LOCAL_CONFIG = {};
try {
    LOCAL_CONFIG = JSON.parse(fs.readFileSync(path.join(FOLDER_PATH, '.config'), 'utf-8'))
}
catch {}

// create the fallback config 
const config = deepMerge(DEFAULT_CONFIG, LOCAL_CONFIG);

// variables
const combinedindex_path = path.join("views", "combined", "index.html");
const combinedmain_path = path.join('views', 'combined', 'main.js');
let combinemainjs = fs.readFileSync(combinedmain_path, 'utf-8');
const combinedIndexSRC = fs.readFileSync(combinedindex_path, 'utf-8');
const indexSRC = fs.readFileSync(HTMLPATH, 'utf-8');
const document = parse(indexSRC);
const combinedDOM = parse(combinedIndexSRC);
const combinedHEAD = combinedDOM.querySelector('head');
const ids = [];
let addedscripts = 0;
let addedlinks = 0;

const IDNAME = `${ATOMICTYPE}_${PACKAGENAME}_${SUBFOLDER}`;

// helper function
function fixCSS(css, ids) {
    const section = `${GLOBAL ? `div#${IDNAME}` : '' }section[data-tab="${SUBFOLDER}"]`;
    const idselector = new RegExp(`#(${ids.join('|')})`);

    const lines = css.split(/\n/);
    for (let i=0; i<lines.length; i++) 
    {
        if (/^(\s+)?(@font-face|:root|@media|--)/g.test(lines[i])) continue
        if (/\{/.test(lines[i]))
        {
            const startline_match = lines[i].match(/^(body)?([^\{,]*)(\{|,)\W*$/);
            if (startline_match) lines[i] = lines[i].replace(startline_match[2], ` ${section} ${startline_match[2]}`);

            if (ids.length > 0)
            {
                const idselector_match = lines[i].match(idselector);
                if (idselector_match)
                {
                    lines[i] = lines[i].replace(idselector_match[1], `${IDNAME}_${idselector_match[1]}`)
                }
            }
        }
    }
    return lines.join('\n');

}
function fixJS(js, ids) {
    const section = `${GLOBAL ? `div#${IDNAME}` : '' }section[data-tab="${SUBFOLDER}"]`;
    const idsjoin = ids.join('|');
    const windowIdSelector = new RegExp(`window.(${idsjoin})\W?`);
    const queryIdSelector = new RegExp(`#(${idsjoin})`);
    const documentIdSelector = new RegExp(`\.getElementById\((${idsjoin})\)`);

    const lines = js.split(/\n/);
    for (let i=0; i<lines.length; i++) {
        // checking for ID selectors
        if (ids.length > 0)
        {
            const windowidselector_match = lines[i].match(windowIdSelector);
            if (windowidselector_match)
            {
                lines[i] = lines[i].replace(`window.${windowidselector_match[1]}`, `window.${IDNAME}_${windowidselector_match[1]}`);
            }
            const queryidselector_match = lines[i].match(queryIdSelector);
            if (queryidselector_match)
            {
                lines[i] = lines[i].replace(`#${queryidselector_match[1]}`, `#${IDNAME}_${queryidselector_match[1]}`);
            }
            const documentidselector_match = lines[i].match(documentIdSelector);
            if (documentidselector_match)
            {
                lines[i] = lines[i].replace(`.getElementById(${documentidselector_match[1]}`, `.getElementById(${IDNAME}_${documentidselector_match[1]}`);
            }
        }
    
        // checking for all other query selectors (not !ID)
        // const queryselector_match = lines[i].match(/querySelector\((\'\")^#/g);
        // if (queryselector_match)
        // {
        //     lines[i] = lines[i].replace(`querySelector(${queryselector_match[1]}`, `querySelector(${queryselector_match[1]}${section} `);
        // }
        const queryselector_match = lines[i].match(/querySelector(All)?\([\'\"\`]?/);
        if (queryselector_match)
        {
          lines[i] = lines[i].replace(queryselector_match[0], `${queryselector_match[0]}${section} `);
        }

        // check for relative imports (that goes up)
        const relativeimport_match = lines[i].match(/(import[^\"\']+\"?\'?\.\.)/)
        if (relativeimport_match)
        {
            lines[i] = lines[i].replace(relativeimport_match[1], relativeimport_match[1]+"/../..")
        }

        // replace direct window events
        const windowfunction_match = lines[i].match(/window\.on(\w+)/);
        if (windowfunction_match)
        {
            lines[i] = lines[i].replace(`window.on${windowfunction_match[1]}`, `const windowFunc${IDNAME}_${windowfunction_match[1]}`);

            lines.push(`\nwindow.addEventListener("${windowfunction_match[1]}", windowFunc${IDNAME}_${windowfunction_match[1]})`);
        }
    }
    return lines.join('\n');
}
function add_script(js, src) {
    const name = src.split('/').pop();
    const url = generate_file(js, name);

    combinemainjs += `\nimport "./${url}";`
    // combinedHEAD.appendChild(parse(`<script SUBFOLDER="module" defer src="${url}"></script>`));
}

function add_link(css, href) {
    const name = href.split('/').pop();
    const url = generate_file(css, name);

    combinedHEAD.appendChild(parse(`<link rel="stylesheet" href="${url}" />`));
}
function generate_file(content, name) {
    name = `${IDNAME}-${name}`;
    const localpath = path.join("sources", SUBFOLDER, name);
    const dest = path.join("views", "combined", localpath);

    fs.writeFileSync(dest, content, "utf-8");

    return localpath;
}


// extracting info from HTML
document.querySelectorAll('*[id]').forEach(element => {
    ids.push(element.getAttribute('id'));
    element.setAttribute('id', `${IDNAME}_${element.getAttribute('id')}`);
});

// append script, link and potentially styles (head)
document.querySelectorAll('script').forEach(script => {
    let js = null, src = null;
    if (script.hasAttribute('src'))
    {
        // TODO extract source and append to
        src = script.getAttribute('src');
        if (!src.startsWith("bundle"))
        {
            js = fixJS(fs.readFileSync(path.resolve(FOLDER_PATH, src), 'utf-8'), ids);
        }
    }
    else
    {
        js = fixJS(script.innerHTML, ids);
        src = addedscripts+'.js'
        addedscripts++;
    }


    if (js)
    {
        add_script(js, src);
    }

    // remove it
    script.parentNode.removeChild(script);
});
document.querySelectorAll('link').forEach(link => {
    const rel = link.getAttribute('rel');
    if (rel && rel === 'stylesheet')
    {
        // TODO add to style
        const href = link.getAttribute('href');
        const css = fixCSS(fs.readFileSync(path.resolve(FOLDER_PATH, href), 'utf-8'), ids);
        add_link(css, href);
    }

    // remove it
    link.parentNode.removeChild(link);
});
document.querySelectorAll('style').forEach(style => {
    // TODO add to style
    const css = fixCSS(style.innerHTML, ids);
    const href = addedlinks+'.css'
    addedlinks++;
    add_link(css, href);

    // remove it
    style.parentNode.removeChild(style);
});

// append the tab 
combinedDOM.querySelector('ul.tabs').appendChild(parse(`<li data-tab="${SUBFOLDER}">${config.name}</li>`))

// append the 
combinedDOM.querySelector('body').appendChild(parse(`<section data-tab="${SUBFOLDER}">${document.querySelector('body').innerHTML}</section>`))

fs.writeFileSync(combinedindex_path, combinedDOM.toString(), "utf-8");
fs.writeFileSync(combinedmain_path, combinemainjs, 'utf-8');
