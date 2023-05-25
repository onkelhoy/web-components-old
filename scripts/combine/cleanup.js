const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { deepMerge } = require('./util');


// constants
const SCRIPTDIR = process.argv[2];
const CLASSNAME = process.argv[3];
const DEFAULT_CONFIG = JSON.parse(fs.readFileSync(path.join(SCRIPTDIR, 'defaultconfig.json'), 'utf-8'));
let LOCAL_CONFIG = {}; 
try {
    LOCAL_CONFIG = JSON.parse(fs.readFileSync(".config", 'utf-8'));
}
catch {}

// create the fallback config 
const config = deepMerge(DEFAULT_CONFIG, LOCAL_CONFIG);

// variables 
const combinedIndex_path = path.join("views", "combined", "index.html");
const combinedIndexSRC = fs.readFileSync(combinedIndex_path, 'utf-8');
const document = parse(combinedIndexSRC);

const tabs = document.querySelector('ul.tabs')
    .childNodes
    .sort((a, b) => {
        let aIndex = config.tabs.order.indexOf(a.getAttribute('data-tab'));
        let bIndex = config.tabs.order.indexOf(b.getAttribute('data-tab'));

        // if a is not in order, set its index high to sort at the end
        if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;

        // if b is not in order, set its index high to sort at the end
        if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;

        return aIndex - bIndex;
    });

tabs[0].setAttribute('class', 'selected');
document.querySelector(`section[data-tab="${tabs[0].getAttribute('data-tab')}"]`).setAttribute('class', 'selected');
document.querySelector('title').set_content(`${CLASSNAME} Component`);

document.querySelector('ul.tabs').childNodes = tabs;
fs.writeFileSync(combinedIndex_path, document.toString(), "utf-8");

