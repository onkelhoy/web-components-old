const path = require('path');
const fs = require('fs');

// variabels 
const ROOT_DIR = process.argv[2];
const TARGET_PACKAGE = process.argv[3];
const lockfilepath = path.join(ROOT_DIR, 'package-lock.json');
const LOCKFILE = JSON.parse(fs.readFileSync(lockfilepath));

const targetpackage = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, LOCKFILE.packages[`node_modules/${TARGET_PACKAGE}`].resolved, 'package.json')));
if (!targetpackage) return;

// get version 
const VERSION = targetpackage.version;

// now save the lockfile 
for (let name in LOCKFILE.packages)
{
  if (name.startsWith('packages/'))
  {
    for (let deptype of ['dependencies', 'devDependencies'])
    {
      for (let depname in LOCKFILE.packages[name][deptype])
      {
        if (depname === TARGET_PACKAGE)
        {
          const package_info = LOCKFILE.packages[`node_modules/${LOCKFILE.packages[name]?.name}`];
          if (package_info)
          {
            const package_path = path.join(ROOT_DIR, package_info.resolved, 'package.json');
            const PACKAGE = JSON.parse(fs.readFileSync(package_path));
            PACKAGE[deptype][TARGET_PACKAGE] = VERSION;
            fs.writeFileSync(package_path, JSON.stringify(PACKAGE, null, 2), 'utf-8');
          }
        }
      }
    }
  }
}