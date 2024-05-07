// native packages
const fs = require('fs');
const path = require("path");
const {exec} = require('child_process');
// local packages
const {iterate, initializePackages} = require('../utils/package-list-dependency-order');

// setup
const LOCKFILE = JSON.parse(fs.readFileSync(path.join(process.env.ROOTDIR, "package-lock.json")));
initializePackages(process.env.ROOTDIR, LOCKFILE);

const set = new Set();

async function init() {
  await iterate(async list => {
    for (let package of list) {
      await new Promise(res => {
        console.log('\t[processing]: ', package.name)
        exec(path.join(__dirname, `individual.sh ${package.location} ${package.name}`), (error, stdout, stderr) => {
          if (error) {
            if (error.code === 2) {
              console.log('\t[skipped]\t', package.name);
            }
            else {
              console.log('\t[error]\t', package.name, error);
            }
          }
          else if (stderr) {
            console.log('\t[failed]\t', package.name, stderr);
          }
          else {


            console.log('\t[success]\t', package.name);
          }

          res();
        })
      })
    }
  })
}

init();