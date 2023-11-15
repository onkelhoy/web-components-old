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
  components: {
    default: 'src/component.ts'
  },
  slot: {},
  html: 'Hello World',
};
let LOCAL_CONFIG = {};
try {
  LOCAL_CONFIG = JSON.parse(fs.readFileSync(path.join(FOLDER_PATH, '.config'), 'utf-8'))
}
catch {}
const CONFIG = deepMerge(GLOBAL_CONFIG, LOCAL_CONFIG);
const CUSTOMELEMENTS = JSON.parse(fs.readFileSync(path.join(PACKAGE_DIR, 'custom-elements.json')));
const body = root.querySelector('section[slot="setting"].control');

// first append the component 
const doccard = root.querySelector('doc-controller > div');
if (!/\w/.test(doccard.innerHTML))
{
  const content = CUSTOMELEMENTS.html.slots.map(s => {
    let inner = s.html;
    if (!inner && s.name === "default") inner = CONFIG.html;

    const slot = s.name === "default" ? "" : `slot="${s.name}"`
    return `
      <div ${slot} data-slotname="${s.name}">
        ${inner}
      </div>
    `;
  }).join(' ')
  doccard.set_content(parse(`
      <${PREFIXNAME}>
        ${content}
      </${PREFIXNAME}>
  `));
}

// parts
const html_part = body.querySelector('pap-tab-content#html');
const properties_part = body.querySelector('pap-tab-content#properties');
const css_part = body.querySelector('pap-tab-content#css');

//#region html part 
if (!html_part.querySelector(`div[data-name="slot-html"]`)) 
{
  html_part.appendChild(parse(`<div data-name="slot-html" class="slot"><br/></div>`));
}
const slotdiv = html_part.querySelector('div[data-name="slot-html"]');

CUSTOMELEMENTS.html.slots.forEach(slot => {
  if (!html_part.querySelector(`doc-input[name="slot-${slot.name}"]`))
  {
    let value = slot.html;
    let name = `HTML slot: ${slot.name}`
    if (!value && slot.name === "default") 
    {
      value = CONFIG.html;
      name = 'HTML'
    }
    else if (!value && CONFIG.slot[slot.name])
    {
      value = CONFIG.slot[slot.name];
    }

    slotdiv.appendChild(parse(`<doc-input label="${name}" variant="textarea" name="slot-${slot.name}" data-slotname="${slot.name}" value="${value}"></doc-input>`))
  }
});
//#endregion

//#region property part
let target = CUSTOMELEMENTS;
build_properties(`${target.className} Properties`, target.properties);
while((target = target.extend_class))
{
  build_properties(`${target.className} Properties`, target.properties);
}

function build_properties(name, properties) {
  if (properties.length === 0) return;
  
  if (name) 
  {
    // ALLNAMES.push(name);
    const title = parse(`<h3 data-subtitle="${name}">${name}</h3>`);
    if (!properties_part.querySelector(`h3[data-subtitle="${name}"]`)) 
    {
      properties_part.appendChild(title);
    }
  }
  if (!properties_part.querySelector(`div[data-name="${name}"]`)) 
  {
    properties_part.appendChild(parse(`<div data-name="${name}" class="properties"></div>`));
  }
  const div = properties_part.querySelector(`div[data-name="${name}"]`);

  for (const prop of properties) {
    const propconfig = CONFIG.properties[prop.name];
    if (propconfig === "disabled") continue;

    const default_value = propconfig?.default || prop.default_value || "";

    if (propconfig && propconfig.variants)
    {
      append_property(prop, div, parse(`
        <doc-input data-prop-name="${prop.name}" variant="select" value="${default_value}" name="${prop.name}" label="${prop.name}" options='${JSON.stringify(propconfig.variants)}'></doc-input>
      `))
    }
    else if (prop.type_value instanceof Array)
    {
      append_property(prop, div, parse(`
        <doc-input data-prop-name="${prop.name}" variant="select" value="${default_value}" name="${prop.name}" label="${prop.name}" options='${JSON.stringify(prop.type_value)}'></doc-input>
      `))
    }
    else if (prop.primitive)
    {
      if (prop.type === "boolean")
      {
        append_property(prop, div, parse(`
          <doc-radio name="${prop.name}" data-prop-name="${prop.name}" label="${prop.name}" value="${default_value}"></doc-radio>
        `))
      }
      else if (prop.type === "string")
      {
        if (/color/i.test(prop.name))
        {
          append_property(prop, div, parse(`
            <color-picker-input data-prop-name="${prop.name}" name="${prop.name}" label="${prop.name}" value="${default_value}"></color-picker-input>
          `));
        }
        else 
        {
          append_property(prop, div, parse(`
            <doc-input data-prop-name="${prop.name}" value="${default_value}" name="${prop.name}" label="${prop.name}"></doc-input>
          `))
        }
      }
      else if (prop.type === "number")
      {
        append_property(prop, div, parse(`
          <doc-input data-prop-name="${prop.name}" variant="number" value="${default_value}" name="${prop.name}" label="${prop.name}"></doc-input>
        `))
      }
    }
    else if (prop.type_value)
    {
      append_property(prop, div, parse(`
        <doc-input data-prop-name="${prop.name}" variant="textarea" value="${default_value}" name="${prop.name}" label="${prop.name} - ${prop.type}"></doc-input>
      `))
    }
  }
}

function append_property(prop, div, element) {
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
//#endregion

//#region css part

function build_css(data, level = 0) {
  // first get target div
  // then build view
  // last iterate sources 

  const name = data.folder.split('/').at(-1);
  if (!css_part.querySelector(`div[data-css-part="${data.folder}"]`))
  {
    css_part.appendChild(parse(`
      <div data-css-part="${data.folder}" class="style-source">
        <h3>${level > 0 ? "Inherited " : ""}${name} styles</h3>
      </div>
    `));
  }
  const div = css_part.querySelector(`div[data-css-part="${data.folder}"]`);

  // building view
  const sortedKeys = Object.keys(data.variables).sort();
  for (let key of sortedKeys) {

    let divgroup = parse(`<div class="style-group" data-style-name="${key}"></div>`);
    const prevelement = div.querySelector(`div[data-style-name="${key}"]`)

    if (prevelement)
    {
      prevelement.replaceWith(divgroup);
    }
    else 
    {
      div.appendChild(divgroup);
    }

    divgroup = div.querySelector(`div[data-style-name="${key}"]`);

    const info = data.variables[key];
    let input = null;
    if (key.includes("color"))
    {
      // color picket 
      const value = info.fallbacks.length === 1 ? info.fallbacks[0] : "";
      input = parse(`<color-picker-input data-css-input="true" name="${key}" label="${key}" value="${value}"></color-picker-input>`)
    }
    else if (key.includes("cursor"))
    {
      const value = info.fallbacks.length === 1 ? info.fallbacks[0] : "";
      const cursorOptions = [
        'alias',
        'all-scroll',
        'auto',
        'cell',
        'context-menu',
        'col-resize',
        'copy',
        'crosshair',
        'default',
        'e-resize',
        'ew-resize',
        'grab',
        'grabbing',
        'help',
        'move',
        'n-resize',
        'ne-resize',
        'nesw-resize',
        'ns-resize',
        'nw-resize',
        'nwse-resize',
        'no-drop',
        'none',
        'not-allowed',
        'pointer',
        'progress',
        'row-resize',
        's-resize',
        'se-resize',
        'sw-resize',
        'text',
        'vertical-text',
        'w-resize',
        'wait',
        'zoom-in',
        'zoom-out'
      ];
    
      input = parse(`<doc-input data-css-input="true" variant="select" options='${JSON.stringify(cursorOptions)}' name="${key}" label="${key}" value="${value}"></doc-input>`)
    }
    else 
    {
      // TODO need to correct the analyzer as it now includes too many variables - variables that are just fallbacks - should only take the first! 
      const value = info.fallbacks.length === 1 ? info.fallbacks[0] : "";
      input = parse(`<doc-input data-css-input="true" name="${key}" label="${key}" value="${value}"></doc-input>`);
    }
    
    divgroup.appendChild(parse('<div class="info"></div>'));
    const infodiv = divgroup.querySelector('div.info');


    infodiv.appendChild(parse(`<div><h5>Usecases</h5><ul class="usecases"></ul></div>`));
    const usecases = infodiv.querySelector('ul.usecases');
    info.usecases.forEach(usecase => usecases.appendChild(parse(`<li>${usecase}</li>`)))

    infodiv.appendChild(parse(`<div><h5>Fallbacks</h5><ul class="fallbacks"></ul></div>`));
    const fallbacks = infodiv.querySelector('ul.fallbacks');
    info.fallbacks.forEach(fallback => fallbacks.appendChild(parse(`<li>${fallback}</li>`)))

    divgroup.appendChild(input);
    divgroup.appendChild(infodiv);
  }

  data.sources.forEach(source => build_css(source, level + 1))
}
build_css(CUSTOMELEMENTS.css);
//#endregion

fs.writeFileSync(index_path, root.toString());