const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { DeepMerge } = require('../utils/deep-merge');

// constants
const SCRIPTDIR = process.argv[2];
const CLASSNAME = process.argv[3];
const DEFAULT_CONFIG = JSON.parse(fs.readFileSync(path.join(SCRIPTDIR, 'defaultconfig.json')));
let LOCAL_CONFIG = {};
try {
  LOCAL_CONFIG = JSON.parse(fs.readFileSync(".config"));
}
catch { }

// create the fallback config 
const config = DeepMerge(DEFAULT_CONFIG, LOCAL_CONFIG);

// variables 
const combinedIndex_path = path.join("views", "combined", "index.html");
const combinedIndexSRC = fs.readFileSync(combinedIndex_path, 'utf-8');
const document = parse(combinedIndexSRC);

const tabs = document.querySelectorAll('body > pap-tabs > pap-tab')
  .sort((a, b) => {
    let aIndex = config.tabs.order.indexOf(a.getAttribute('id'));
    let bIndex = config.tabs.order.indexOf(b.getAttribute('id'));

    // if a is not in order, set its index high to sort at the end
    if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;

    // if b is not in order, set its index high to sort at the end
    if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;

    return aIndex - bIndex;
  });

tabs[0].setAttribute('class', 'selected');
document.querySelector('title').set_content(`${CLASSNAME} Component`);

const tabcontainer = document.querySelector('pap-tabs');
tabs.forEach(element => {
  element.parentNode.removeChild(element);
  tabcontainer.appendChild(element);
});

fs.writeFileSync(combinedIndex_path, document.toString(), "utf-8");

