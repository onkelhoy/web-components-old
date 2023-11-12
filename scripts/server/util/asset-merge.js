const fs = require('fs');
const path = require('path');

const PACKAGE_DIR = process.env.PACKAGE_DIR;
const ROOT_DIR = process.env.ROOT_DIR;
const VIEW_DIR = process.env.VIEW_DIR;

/**
 * This function is ment to combine all files that share same name into 1 file (if multiple different files then multiple files)
 * it treats files that shares same name as 1 (and will perform merge)
 * 
 * @param {string|function|{global:string, package: string, view: string}} folder_path - path of folder to find target files to merge 
 * @param {*} merger - the merge function that accepts files: string[]
 */
function AssetMerge(folder_path, merger) 
{
  let paths = typeof folder_path === "function" ? folder_path() : folder_path;
  paths = paths instanceof Object ? paths : { global: paths, package: paths, view: paths };

  paths.global = path.join(ROOT_DIR, 'asset', paths.global);
  paths.package = path.join(PACKAGE_DIR, 'asset', paths.package);
  paths.view = path.join(VIEW_DIR, 'public', paths.view);

  const output = {};
  for (let level in paths) 
  {
    if (fs.existsSync(paths[level])) 
    {
      output[level] = {
        path: paths[level],
        files: fs.readdirSync(paths[level]).map(filename => 
        {
          return {
            filename,
            content: fs.readFileSync(path.join(paths[level], filename), 'utf-8')
          }
        })
      };
    }
  }

  merger(output, savefile);
}

/**
 * This function just simply saves a file into the temp folder 
 * 
 * @param {string} name
 * @param {string} content
 */
function savefile(name, content) 
{
  fs.writeFileSync(path.join(VIEW_DIR, '.temp', name), content);
}

module.exports = {
  AssetMerge
}