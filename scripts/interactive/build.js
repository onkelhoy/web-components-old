const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { deepMerge } = require('./util');

const PACKAGE_DIR = process.argv[2];
const CLASSNAME = process.argv[3];
const PREFIXNAME = process.argv[4];

// const ALLPROPS = [];
// const ALLNAMES = [];

const FOLDER_PATH = path.join(PACKAGE_DIR, 'views', 'interactive');
const index_path = path.join(FOLDER_PATH, 'index.html');
const indexContent = fs.readFileSync(index_path, 'utf-8');
const root = parse(indexContent);

const GLOBAL_CONFIG = {
  properties: {},
  html: 'Hello World',
};
let LOCAL_CONFIG = {};
try {
  LOCAL_CONFIG = JSON.parse(fs.readFileSync(path.join(FOLDER_PATH, '.config'), 'utf-8'))
}
catch {}
const CONFIG = deepMerge(GLOBAL_CONFIG, LOCAL_CONFIG);
const PROPINFO = JSON.parse(fs.readFileSync(path.join(PACKAGE_DIR, 'dist/propinfo.json')));
const body = root.querySelector('section[slot="setting"].control');

// first append the component 
const doccard = root.querySelector('doc-controller > div');
if (!/\w/.test(doccard.innerHTML))
{
  doccard.set_content(parse(`
      <${PREFIXNAME}>
        ${CONFIG.html}
      </${PREFIXNAME}>
  `));
}

body.querySelector('doc-input[name="html"]').setAttribute('value', CONFIG.html);


let target = PROPINFO;
build_class_variant(`${target.className} Properties`, target.properties);
while((target = target.extend_class))
{
  build_class_variant(`${target.className} Properties`, target.properties);
}

function build_class_variant(name, properties) {
  if (properties.length === 0) return;
  
  if (name) 
  {
    // ALLNAMES.push(name);
    const title = parse(`<h3 data-subtitle="${name}">${name}</h3>`);
    if (!body.querySelector(`h3[data-subtitle="${name}"]`)) 
    {
      body.appendChild(title);
    }
  }
  if (!body.querySelector(`div[data-name="${name}"]`)) 
  {
    body.appendChild(parse(`<div data-name="${name}" class="properties"></div>`));
  }
  const div = body.querySelector(`div[data-name="${name}"]`);

  for (const prop of properties) {
    const propconfig = CONFIG.properties[prop.name];
    if (propconfig === "disabled") continue;

    const default_value = propconfig?.default || prop.default_value || "";

    if (propconfig && propconfig.variants)
    {
      append(prop, div, parse(`
        <doc-input data-prop-name="${prop.name}" variant="select" value="${default_value}" name="${prop.name}" label="${prop.name}" options='${JSON.stringify(propconfig.variants)}'></doc-input>
      `))
    }
    else if (prop.type_value instanceof Array)
    {
      append(prop, div, parse(`
        <doc-input data-prop-name="${prop.name}" variant="select" value="${default_value}" name="${prop.name}" label="${prop.name}" options='${JSON.stringify(prop.type_value)}'></doc-input>
      `))
    }
    else if (prop.primitive)
    {
      if (prop.type === "boolean")
      {
        append(prop, div, parse(`
          <doc-radio name="${prop.name}" data-prop-name="${prop.name}" label="${prop.name}" value="${default_value}"></doc-radio>
        `))
      }
      else if (prop.type === "string")
      {
        if (/color/i.test(prop.name))
        {
          append(prop, div, parse(`
            <color-picker-input data-prop-name="${prop.name}" name="${prop.name}" label="${prop.name}" value="${default_value}"></color-picker-input>
          `));
        }
        else 
        {
          append(prop, div, parse(`
            <doc-input data-prop-name="${prop.name}" value="${default_value}" name="${prop.name}" label="${prop.name}"></doc-input>
          `))
        }
      }
      else if (prop.type === "number")
      {
        append(prop, div, parse(`
          <doc-input data-prop-name="${prop.name}" variant="number" value="${default_value}" name="${prop.name}" label="${prop.name}"></doc-input>
        `))
      }
    }
    else if (prop.type_value)
    {
      append(prop, div, parse(`
        <doc-input data-prop-name="${prop.name}" variant="textarea" value="${default_value}" name="${prop.name}" label="${prop.name} - ${prop.type}"></doc-input>
      `))
    }
  }
}

function append(prop, div, element) {
  const prevelement = div.querySelector(`*[data-prop-name="${prop.name}"]`)
  if (prevelement)
  {
    prevelement.replaceWith(element);
    // prevelement.parentNode.removeChild(prevelement);
  }
  else {
    div.appendChild(element);
  }
}

fs.writeFileSync(index_path, root.toString());