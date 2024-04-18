const fs = require('fs');
const path = require("path");
const { parse } = require('node-html-parser');
const { exec } = require('child_process');

const { iterate, initializePackages } = require('../utils/package-list-dependency-order');

// variables 
process.env.ROOT_DIR = process.argv[2];
process.env.WEB_DIR = path.join(process.env.ROOT_DIR, "web");
const LOCKFILE = JSON.parse(fs.readFileSync(path.join(process.env.ROOT_DIR, "package-lock.json")));

// FILES
// package 
const ECOSYSTEMPACKAGE_PATH = path.join(process.env.WEB_DIR, "package.json");
const ECOSYSTEMPACKAGE = JSON.parse(fs.readFileSync(ECOSYSTEMPACKAGE_PATH));
// html 
const HTML_PATH = path.join(process.env.WEB_DIR, "index.html");
const HTMLFILE = fs.readFileSync(HTML_PATH, 'utf-8');
const HTMLDOCUMENT = parse(HTMLFILE);
// javascript 
const MAIN_PATH = path.join(process.env.WEB_DIR, "main.js");
let MAIN_FILE = fs.readFileSync(MAIN_PATH, "utf-8");

// HTML variables
const sidebarElement = HTMLDOCUMENT.querySelector("pap-sidebar");
const itemmap = {};

// setup
initializePackages(process.env.ROOT_DIR, LOCKFILE);

async function init() {
  await iterate(async list => {
    for (let info of list) {
      await new Promise(res => {
        exec(path.join(__dirname, `individual.sh ${info.location}`), (error, envinfo, stderr) => {
          if (error) {
            if (error.code === 2) {
              console.log('\t[skipped]\t', info.name);
            }
            else {
              console.log('\t[error]\t', info.name, error);
            }
          }
          else if (stderr) {
            console.log('\t[failed]\t', info.name, stderr);
          }
          else {
            // update ecosystem-dependency
            ECOSYSTEMPACKAGE.dependencies[info.name] = info.version;

            // update javascript import 
            // MAIN_FILE += `\nimport "${info.name}";`

            // add sidebar
            const [atomictype, prefixname, classname, name] = envinfo.split('#');
            if (!itemmap[atomictype]) {
              itemmap[atomictype] = sidebarElement.querySelector(`pap-sidebar-item#${atomictype}`);
            }

            itemmap[atomictype].setAttribute('count', Number(itemmap[atomictype].getAttribute('count') || 0) + 1)
            itemmap[atomictype].appendChild(
              parse(`<pap-sidebar-item id="${(atomictype + "_" + name).trim()}" data-atomic-type="${atomictype}" data-name="${name}" text="${name}"></pap-navbar-item>`)
            );

            console.log('\t[success]\t', info.name);
          }

          res();
        })
      })
    }
  });

  // save file 
  const HTMLFILE_latest = fs.readFileSync(HTML_PATH, 'utf-8');
  const HTMLDOCUMENT_latest = parse(HTMLFILE_latest);
  const sidebar_latest = HTMLDOCUMENT_latest.querySelector('pap-sidebar');
  sidebar_latest.replaceWith(sidebarElement);

  fs.writeFileSync(ECOSYSTEMPACKAGE_PATH, JSON.stringify(ECOSYSTEMPACKAGE, null, 2));
  fs.writeFileSync(HTML_PATH, HTMLDOCUMENT_latest.toString(), "utf-8");
  fs.writeFileSync(MAIN_PATH, MAIN_FILE, 'utf-8');
}

init();