// native packages
const fs = require('fs');
const path = require("path");
const {exec} = require('child_process');
const {parse} = require('node-html-parser');

// local packages
const {iterate, initializePackages, importmapset} = require('../utils/package-list-dependency-order');
const {envtojson} = require('../utils/env-to-json');

// setup
const LOCKFILE = JSON.parse(fs.readFileSync(path.join(process.env.ROOTDIR, "package-lock.json")));
initializePackages(process.env.ROOTDIR, LOCKFILE);

let htmltemplate = null;
const envmap = {};

function initstructure() {
  // build importmap 
  const importmap = {
    imports: {}
  };

  // inititalize full importmap set 
  importmapset.forEach(dep => {
    const _path = path.join(process.env.ROOTDIR, 'node_modules', dep, 'package.json');
    const packagejson = JSON.parse(fs.readFileSync(_path));

    if (dep.startsWith("@" + process.env.PROJECTSCOPE)) {
      // we are coping over its dist anyway so we should only fix importmap
      const jsonenv = envtojson(path.join(process.env.ROOTDIR, 'node_modules', dep, '.env'));
      envmap[dep] = jsonenv; // store into envmap for later use

      // prioritize "exports"
      if (packagejson.exports) {
        for (let key in packagejson.exports) {
          if (key === '.') {
            importmap.imports[dep] = path.resolve(`/${jsonenv.ATOMICTYPE}/${jsonenv.NAME}/${packagejson.exports[key]}`);
          }
          else {
            importmap.imports[path.join(dep, key)] = path.resolve(`/${jsonenv.ATOMICTYPE}/${jsonenv.NAME}/${packagejson.exports[key]}`);
          }
        }
      }
      // no "exports" found try "main"
      else if (packagejson.main) {
        importmap.imports[dep] = path.resolve(`/${jsonenv.ATOMICTYPE}/${jsonenv.NAME}/${packagejson.main}`);
      }
      else {
        // NOTE should not happen really, so we warn future us
        console.log(`[WARNING]: package ${dep} could not be determined`);
      }
    }
    else {
      // prioritize "exports"
      if (packagejson.exports) {
        for (let key in packagejson.exports) {
          if (key === '.') {
            importmap.imports[dep] = `/node_modules/${path.join(dep, packagejson.exports[key])}`;
          }
          else {
            importmap.imports[path.join(dep, key)] = `/node_modules/${path.join(dep, packagejson.exports[key])}`;
          }
        }
      }
      // no "exports" found try "main"
      else if (packagejson.main) {
        importmap.imports[dep] = `/node_modules/${path.join(dep, packagejson.main)}`;
      }
      else {
        // NOTE should not happen really, so we warn future us
        console.log(`[WARNING]: package ${dep} could not be determined`);
      }
    }
  });

  const importmapscript = parse(`<script type="importmap">${JSON.stringify(importmap, null, 4)}</script>`);

  // load & fix template index.html file 
  const file = fs.readFileSync(path.join(process.env.SCRIPTDIR, 'template/index.html'), 'utf-8');
  htmltemplate = parse(file);
  htmltemplate.querySelector('head').insertAdjacentHTML('afterbegin', importmapscript);
}

async function init() {
  initstructure();

  await iterate(async list => {
    for (let package of list) {
      if (!envmap[package.name]) {
        console.log('\t[skipped]:\t', package.name, '\t... warning');
        continue;
      }

      await new Promise(res => {
        process.stdout.write(`\t[processing]:\t${package.name}\t... `);

        exec(path.join(__dirname, `individual.sh ${package.location} ${package.name}`), (error, stdout, stderr) => {
          if (error) {
            switch (error.code) {
              case 2:
                process.stdout.write('[skipped]\n');
                break;
              default:
                process.stdout.write('[error]\n');
                console.log(error, '\n');
                break;
            }
          }
          else if (stderr) {
            process.stdout.write('[failed]\n');
            console.log(stderr, '\n');
          }
          else {
            // NOTE at this point the "package" combined-view has been copied over
            // we need to update the index.html file 

            let destname = stdout.match(/DESTNAME::(.*)/);
            let classname = stdout.match(/CLASSNAME::(.*)/);
            const warnings = [];

            // extractions
            if (!destname) warnings.push('could not extract destination-name');
            destname = destname[1];

            if (!classname) warnings.push('could not extract classname');
            classname = classname[1];

            htmltemplate.querySelector('title').set_content(classname);

            // TODO append the necessary info for the router (starting file)

            const savepath = path.join(
              process.env.DESTINATION,
              envmap[package.name].ATOMICTYPE,
              envmap[package.name].NAME,
              "index.html",
            );
            fs.writeFileSync(savepath, htmltemplate.toString());

            process.stdout.write('[success]\n');
            if (warnings.length > 0) console.log('warnings', warnings.map((v, i) => `${i + 1} ${v}`).join('\n'));
          }

          res();
        })
      })
    }
  })
}

init();
