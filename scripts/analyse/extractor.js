const fs = require('fs');
const path = require('path');

const { types_extractor } = require('./util/types');
const { html_extractor } = require('./util/html');
const { css_extractor } = require('./util/css');

// global
function extractor(folder_path, className) {
  // TODO check if it has prop file already generated
  try {
    // NOTE could probably remove this as its anyway a try-catch and next would crash if no file..
    const prop_info_file = path.join(folder_path, 'custom-elements.json');
    fs.accessSync(prop_info_file);
    const details = JSON.parse(fs.readFileSync(prop_info_file));

    // make sure imports is populated for css extraction
    for (let key in details.imports) {
      IMPORTS[key] = details[key].imports;
    }

    return details;
  }
  catch { }

  const component_path = path.join(folder_path, 'src/component.ts');
  const component_dist_path = path.join(folder_path, 'dist/src/component.js');
  const componentDIST = fs.readFileSync(component_dist_path, 'utf-8');

  // extracting the properties

  const lines = componentDIST.split('\n');
  const classprop_set = {
    property: {},
    query: {},
    context: {}
  };
  let classInfo = null;
  let imports = [];
  const events = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // check for comments
    if (/^\s*\/\//.test(line)) continue;
    if (/^\s*\/\*/.test(line)) continue;
    if (/^\s*\*/.test(line)) continue;

    let _imports = extract_import(line);
    if (_imports) {
      imports = imports.concat(_imports);
      continue;
    }

    const classLine = line.match(/class\s(\w+)\sextends\W(\w+)/);
    if (classLine) {
      classInfo = { name: classLine[1], extends: classLine[2] };
    }

    if (/\.dispatchEvent\(/.test(line)) {
      let eventtype = null;
      let eventname = null;
      const matches = line.match(/\.dispatchEvent\(new (\w+)\("(\w+)"(,\s?\{\sdetail:\s(.*))?/);
      if (matches) {
        eventtype = matches[1];
        eventname = matches[2];

        console.log(matches);
      }
      else {
        console.log('[ERROR]: found a disapatchEvent but no type associated');
        continue;
      }

      if (eventtype === "CustomEvent") {

      }
      else {
        events.push({ type: eventtype, name: eventname });
        continue;
      }
    }

    if (/__decorate\(\[/.test(line)) {
      let type = null; // property, query or context now 

      while (i < lines.length) {
        i++;

        if (type === null) {
          const trimmed = lines[i].trim();
          if (trimmed.startsWith('property(')) {
            // extract further info like attribute etc 
            type = 'property';
          }
          if (trimmed.startsWith('context(')) {
            type = 'context';
          }
          if (trimmed.startsWith('query(')) {
            type = 'query';
          }

          if (type) {
            i++;
          }
        }

        const propmatch = lines[i].match(/\.prototype\,\s\"(\w+)/);
        if (propmatch) {
          if (type) classprop_set[type][propmatch[1]] = true;
          break;
        }
      }
    }
  }

  if (!classInfo) {
    throw new Error('could not find class: ' + className);
  }

  let extend_class = null;
  if (classInfo.extends && !["HTMLElement", "Base"].includes(classInfo.extends)) {
    for (let imp of imports) {
      if (imp.name === classInfo.extends) {
        const super_path = getLocalModule(imp.from);

        if (super_path) extend_class = extractor(super_path, imp.name);
      }
    }
  }

  const ts_properties = types_extractor(component_path, className);
  const properties = ts_properties.filter(info => classprop_set.property[info.name]);

  IMPORTS[folder_path] = imports;

  return {
    className,
    folder: folder_path,
    properties,
    classprop_set,
    extend_class
  };
}
function extract_import(line) {
  const import_match_module = line.match(/import\W+\{([^'"\}]+)\W+from\W+["']([^"']+)["']/);
  if (import_match_module) {
    const imports = [];
    const [_whole, names, from] = import_match_module;
    const namesplit = names.split(",");
    for (const name of namesplit) {
      if (name === "") continue;
      imports.push({
        name: name.trim(),
        from, // TODO this should be cleaned
      })
    }
    return imports;
  }
  const import_match_default = line.match(/import\W+(\w+)\W+from\W+["']([^"']+)["']/);
  if (import_match_default) {
    const imports = [];
    const [_whole, name, from] = import_match_default;
    imports.push({
      name: name.trim(),
      from, // TODO this should be cleaned
    })
    return imports;
  }

  return null;
}
function getLocalModule(name) {
  const scope = LOCKFILE.name.split('/')[0];
  if (!name.startsWith(scope)) return null;

  const data = LOCKFILE.packages[`node_modules/${name}`];
  if (!data) return null;
  if (!data.resolved) return null;
  if (data.resolved.startsWith('http')) return null;

  return path.join(ROOT_DIR, data.resolved);
}

// PROCESS ARGS
const ROOT_DIR = process.argv[2]
const PACKAGE_DIR = process.argv[3]
const SCRIPT_DIR = process.argv[4]
const CLASSNAME = process.argv[5]

const LOCKFILE = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package-lock.json')));
const OUTPUT = path.join(PACKAGE_DIR, "custom-elements.json");
const IMPORTS = {};

async function runner() {
  const htmlinfo = await html_extractor(PACKAGE_DIR, CLASSNAME, SCRIPT_DIR);
  const typeinfo = extractor(PACKAGE_DIR, CLASSNAME);
  const cssinfo = css_extractor(PACKAGE_DIR, IMPORTS, getLocalModule)

  const info = {
    ...typeinfo,
    imports: IMPORTS,
    html: htmlinfo,
    css: cssinfo,
  }

  // write it to file
  fs.writeFileSync(OUTPUT, JSON.stringify(info, null, 2), "utf-8");

  process.exit();
}

runner();

