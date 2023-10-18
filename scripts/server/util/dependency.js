const path = require('path');
const fs = require('fs');

const LOCKFILE = JSON.parse(fs.readFileSync(path.resolve(process.env.ROOT_DIR, 'package-lock.json')));
const PACKAGE = JSON.parse(fs.readFileSync(path.resolve(process.env.PACKAGE_DIR, "package.json")));
const DEPENDENCY = {}

function recursive(name, callback) 
{
  if (!name.startsWith('@pap-it'))
  {
    return;
  }

  let package_path = `node_modules/${name}`;
  if (LOCKFILE.packages[package_path].resolved)
  { // its locally created
    package_path = LOCKFILE.packages[package_path].resolved;
  }

  if (!DEPENDENCY[name]) 
  {
    DEPENDENCY[name] = {
      path: package_path,
      package: JSON.parse(fs.readFileSync(path.resolve(process.env.ROOT_DIR, package_path, 'package.json')))
    }

    if (callback)
    {
      callback(name, package_path, DEPENDENCY[name]);
    }
    // iterate the dependencies
    for (let packagename in LOCKFILE.packages[package_path]?.dependencies) 
    {
      recursive(packagename, callback);
    }
    for (let packagename in LOCKFILE.packages[package_path]?.devDependencies) 
    {
      recursive(packagename, callback);
    }
  }
}

function init(callback) 
{
  for (const dep in PACKAGE.dependencies) 
  {
    recursive(dep, callback);
  }
  for (const dep in PACKAGE.devDependencies) 
  {
    recursive(dep, callback);
  }
  
  return DEPENDENCY;
}

module.exports = {
  LOCKFILE,
  PACKAGE,
  DEPENDENCY,
  init
}