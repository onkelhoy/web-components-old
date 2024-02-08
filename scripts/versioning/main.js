const path = require('path');
const fs = require('fs');
const { exec: execCallback } = require('child_process');
const { promisify } = require('util');
const exec = promisify(execCallback);

async function runNpmVersionPatch(cwd) {
  try {
    const { stdout } = await exec('npm version patch', {
      cwd,
      env: {
        ...process.env,
      }
    });

    console.log(stdout);
  }
  catch (error) {
    // NOTE if node version changes this to different output we might want to update also.. a bit dirty
    if (error.code !== 1) {
      console.log(error);
    }
  }
}

// variabels 
const ROOT_DIR = process.argv[2];
const TARGET_PACKAGE = process.argv[3];
const lockfilepath = path.join(ROOT_DIR, 'package-lock.json');
const LOCKFILE = JSON.parse(fs.readFileSync(lockfilepath));
const PACKAGE_DIR = path.join(ROOT_DIR, LOCKFILE.packages[`node_modules/${TARGET_PACKAGE}`].resolved);

const targetpackage = JSON.parse(fs.readFileSync(path.join(PACKAGE_DIR, 'package.json')));

async function init() {
  if (targetpackage) {
    // get version 
    const VERSION = targetpackage.version;

    try {
      let readme = fs.readFileSync(path.join(PACKAGE_DIR, 'README.md'), 'utf-8');
      readme = readme.replace(/Version:.+\n/, `Version: ${VERSION}\n`);
      fs.writeFileSync(path.join(PACKAGE_DIR, 'README.md'), readme, 'utf-8');
    }
    catch (e) {
      console.log('[WARN] could not find README to update version');
    }

    // now save the lockfile 
    for (let name in LOCKFILE.packages) {
      if (name.startsWith('packages/')) {
        for (let deptype of ['dependencies', 'devDependencies']) {
          for (let depname in LOCKFILE.packages[name][deptype]) {
            if (depname === TARGET_PACKAGE) {
              const package_info = LOCKFILE.packages[`node_modules/${LOCKFILE.packages[name]?.name}`];
              if (package_info) {
                const component_path = path.join(ROOT_DIR, package_info.resolved);
                const package_path = path.join(component_path, 'package.json');
                const PACKAGE = JSON.parse(fs.readFileSync(package_path));
                PACKAGE[deptype][TARGET_PACKAGE] = VERSION;
                fs.writeFileSync(package_path, JSON.stringify(PACKAGE, null, 2), 'utf-8');

                if (deptype === 'dependencies' && process.env.GLOBAL_PUBLISH !== "true") {
                  // need to now call npm version patch for this package 
                  await runNpmVersionPatch(component_path);
                }
              }
            }
          }
        }
      }
    }
  }
}

init();