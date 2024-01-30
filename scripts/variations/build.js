const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { DeepMerge } = require('../utils/deep-merge');

const PACKAGE_DIR = process.argv[2];
const CLASSNAME = process.argv[3];
const PREFIXNAME = process.argv[4];

const ALLPROPS = [];
const ALLNAMES = [];

const FOLDER_PATH = path.join(PACKAGE_DIR, 'views', 'variations');
const index_path = path.join(FOLDER_PATH, 'index.html');
const indexContent = fs.readFileSync(index_path, 'utf-8');
const root = parse(indexContent);

const GLOBAL_CONFIG = {
  html: 'Hello World',
  properties: {}
};
let LOCAL_CONFIG = {};
try {
  LOCAL_CONFIG = JSON.parse(fs.readFileSync(path.join(FOLDER_PATH, '.config'), 'utf-8'))
}
catch (e) { }
const CONFIG = DeepMerge(GLOBAL_CONFIG, LOCAL_CONFIG);

root.querySelector('title').set_content(`${CLASSNAME} - Variations`);

const propinfo = JSON.parse(fs.readFileSync(path.join(PACKAGE_DIR, 'custom-elements.json')));
const body = root.querySelector('body');

const title = parse(`<h1 data-title="class">${propinfo.className} Properties</h1>`);
if (!body.querySelector('h1[data-title="class"]')) body.appendChild(title);
build_class_variant(body, null, propinfo.properties);

if (propinfo.extend_class) {
  const inheritTitle = parse('<h1 data-title="inherit">Inherited Properties</h1>');
  if (!body.querySelector('h1[data-title="inherit"]')) body.appendChild(inheritTitle);

  let target = propinfo;
  while ((target = target.extend_class)) {
    build_class_variant(body, `from ${target.className}`, target.properties);
  }
}

function build_class_variant(body, name, properties) {
  if (properties.length === 0) return;

  if (name) {
    ALLNAMES.push(name);
    const title = parse(`<h3 data-subtitle="${name}">${name}</h3>`);
    if (!body.querySelector(`h3[data-subtitle="${name}"]`)) body.appendChild(title);
  }

  const defaultprops = [];
  for (const name in CONFIG.properties) {
    const cprop = CONFIG.properties[name];
    if (cprop.default) {
      defaultprops.push({ name, value: cprop.default })
    }
  }

  properties.forEach(prop => {
    const variations = [];
    const propconfig = CONFIG.properties[prop.name];
    if (propconfig) {
      if (propconfig.variants) {
        propconfig.variants.forEach(v => {
          variations.push(v);
        });
      }

      if (propconfig.attributes) {
        for (let name in propconfig.attributes) {
          defaultprops.push({ name, value: propconfig.attributes[name] });
        }
      }
    }
    else if (prop.type_value instanceof Array) {
      prop.type_value.forEach(v => {
        variations.push(v);
      });
    }
    else if (prop.primitive) {
      if (prop.type === "boolean") {
        ["true", "false"].forEach(v => {
          variations.push(v)
        })
      }
      else if (prop.type === "string") {
        if (/color/i.test(prop.name)) {
          // "#ff7f50", "#6495ed", "#ff8c00", "#f4a460"
          // coral, cornflowerblue, darkorange, sandybrown
          ["coral", "cornflowerblue", "darkorange", "sandybrown"].forEach(v => variations.push(v));
        }
        else {
          ["foo", "bar", "hello world"].forEach(v => {
            variations.push(v)
          })
        }
      }
      else if (prop.type === "number") {
        ["1", "10", "1000"].forEach(v => {
          variations.push(v)
        })
      }
    }
    else if (prop.type_value) {
      variations.push(prop.type_value);
    }

    const element = parse(`
        <doc-card class="property" data-name="${prop.name}">
            <h2 slot="header"><span class="deemphasize">Property: </span>${prop.name}</h2>

            <div class="property-info">
              <p>type: ${prop.type}</p>
              <p>default-value: ${prop.default_value}</p>
              <p>required: ${!prop.conditional}</p>
            </div>
            <div class="variations">
                ${variations.map(v => `
                  <div class="variant" data-variant="${v}">
                    <h4><span class="deemphasize">Property-Value: </span>${v}</h4>
                    <pap-codeblock display="both">
                      <${PREFIXNAME} 
                        ${prop.name}="${v}"
                        ${defaultprops.map(dp => `${dp.name}="${dp.value}"`)}
                      >
                        ${CONFIG.html}
                      </${PREFIXNAME}>
                    </pap-codeblock>
                  </div>
                `).join(' ')}
            </div>
        </doc-card>
    `);

    ALLPROPS.push(prop.name);
    const preexist = body.querySelector(`doc-card[data-name="${prop.name}"].property`);
    if (preexist) {
      const title = preexist.querySelector('h2');
      if (title) {
        title.set_content(element.querySelector('h2').innerHTML)
      }
      else {
        preexist.childNodes.unshift(element.querySelector('h2'));
      }

      const propinfoelm = preexist.querySelector('div.property-info')
      if (propinfoelm) {
        propinfoelm.set_content(element.querySelector('div.property-info').innerHTML)
      }
      else {
        preexist.querySelector('h2').nextSibling?.insertBefore(element.querySelector('div.property-info'))
      }

      const variationselm = preexist.querySelector('div.variations')
      if (variationselm) {
        // first we add 
        element.querySelectorAll('div[data-variant]').forEach(elm => {
          const value = elm.getAttribute('data-variant');
          const preelm = variationselm.querySelector(`div[data-variant="${value}"]`);
          if (!preelm) {
            variationselm.appendChild(elm);
          }
        })


        // then cleanup
        variationselm.querySelectorAll('div[data-variant]').forEach(elm => {
          const value = elm.getAttribute('data-variant');
          if (!variations.includes(value)) {
            // not included so we should clean it up 
            elm.parentNode.removeChild(elm);
          }
        })
      }
      else {
        preexist.appendChild(element.querySelector('div.variations'))
      }
    }
    else {
      body.appendChild(element);
    }
  })
}

// remove all properties that is not in ALLPROPS (old ones) 
body.querySelectorAll('doc-card[data-name]').forEach(element => {
  if (!ALLPROPS.includes(element.getAttribute('data-name'))) {
    element.parentNode.removeChild(element);
  }
})
body.querySelectorAll('h3[data-subtitle]').forEach(element => {
  if (!ALLNAMES.includes(element.getAttribute('data-subtitle'))) {
    element.parentNode.removeChild(element);
  }
})

fs.writeFileSync(index_path, root.toString());