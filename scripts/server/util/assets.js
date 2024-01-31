const path = require('path');
const fs = require('fs');

const { DEPENDENCY } = require('./dependency');
const TRANSLATION_META = {};
const ASSETS = {
  // references
  __references: {
    icons: {},
    translations: {},
    images: {},
    themes: {},
  },
};

function recursive(dir, package_type, dependency_name, asset_type) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const direntPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (package_type !== "temp" && dirent.name === "translations") {
        continue;
      }
      else {
        recursive(direntPath, package_type, dependency_name, dirent.name);
      }
    }
    else {
      // if for some reason we didnt have it..
      if (!asset_type) {
        if (/\.(jpe?g|png|gif|bmp|tiff|webp)$/i.test(direntPath)) {
          asset_type = 'images';
        }
        else if (/\.json$/i.test(direntPath)) {
          asset_type = 'translations'
        }
        else if (/\.svg$/i.test(direntPath)) {
          asset_type = 'icons'
        }
        else {
          asset_type = 'unknown';
        }
      }

      // we want to extract key from the url ex: "path/component/asset/icons/hello.svg" -> "/icons/hello.svg"
      let key = "asset";
      if (package_type === "view") {
        key = "public";
      }
      if (package_type === "temp") {
        key = ".temp";
      }
      key = direntPath.split(key)[1];

      // last we append it 
      append(key, asset_type, package_type, direntPath, dependency_name);
    }
  }
}
function append(key, asset_type, package_type, filepath, dependency_name) {
  if (!ASSETS[key]) ASSETS[key] = [];

  // append to references
  if (!ASSETS.__references[asset_type][key]) ASSETS.__references[asset_type][key] = true;

  const extension = path.extname(key);
  const name = path.basename(key, extension);
  let meta = undefined;
  if (asset_type === "translations") {
    meta = TRANSLATION_META[name];
  }

  ASSETS[key].push({
    asset_type,
    package_type,
    name,
    meta,
    dependency_name: dependency_name ?? undefined,
    path: key,
    fullpath: filepath,
  });
}
function add(directory, package_type, dependency_name = null) {
  try {
    recursive(directory, package_type, dependency_name);
  }
  catch (e) {
    // no assets found
    if (package_type !== 'dependency') console.log(`No ${package_type} assets found`);
  }
}

function add_themes() {
  const global_theme_folder = fs.readdirSync(path.join(process.env.ROOT_DIR, "themes"), { withFileTypes: true });

  for (let folder of global_theme_folder) {
    const filepath = path.join(process.env.ROOT_DIR, "themes", folder.name, 'tokens.css');
    if (fs.existsSync(filepath)) {
      append(`/themes/${folder.name}`, 'themes', 'global', filepath);
    }
  }
}

function init() {
  // first append the view public 
  add(path.join(process.env.VIEW_DIR, ".temp"), 'temp');

  // then append the view public 
  add(path.join(process.env.VIEW_DIR, "public"), 'view');

  // then append the local assets 
  add(path.join(process.env.PACKAGE_DIR, "asset"), 'local');

  // then append the global assets 
  add(path.join(process.env.ROOT_DIR, "asset"), 'global');

  // then we append each dependency
  for (let name in DEPENDENCY) {
    add(path.join(process.env.ROOT_DIR, DEPENDENCY[name].path, "asset"), 'dependency', name);
  }

  // last we append also theme files 
  add_themes();
}


function get(url) {
  let data = ASSETS[url];
  if (!data) return null;
  if (data.length === 0) return null;

  // since we added assets in the correct order we know that the first asset is the one we want 
  return data[0].fullpath;
}
function get_byreference(reference) {
  if (!ASSETS.__references[reference]) return { error: 'reference not exists' };

  let list = [];
  for (let key in ASSETS.__references[reference]) {
    list = list.concat(ASSETS[key]);
  }

  return list;
}
function get_byorder(name) {
  for (let reference of packagelevelorder) {
    const data = get_byreference(reference, name);
    if (!data.error) return data;
  }

  return null;
}

// MERGE related

/**
 * This function is ment to combine all files that share same name into 1 file (if multiple different files then multiple files)
 * it treats files that shares same name as 1 (and will perform merge)
 * 
 * @param {string|function|{global:string, package: string, view: string}} folder_path - path of folder to find target files to merge 
 * @param {*} merger - the merge function that accepts files: string[]
 */
function merge(folder_path, merger) {
  let paths = typeof folder_path === "function" ? folder_path() : folder_path;
  paths = paths instanceof Object ? paths : { global: paths, package: paths, view: paths };

  paths.global = path.join(process.env.ROOT_DIR, 'asset', paths.global);
  paths.package = path.join(process.env.PACKAGE_DIR, 'asset', paths.package);
  paths.view = path.join(process.env.VIEW_DIR, 'public', paths.view);

  const output = {};
  for (let level in paths) {
    if (fs.existsSync(paths[level])) {
      output[level] = {
        path: paths[level],
        files: fs.readdirSync(paths[level]).map(filename => {
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
function savefile(name, content) {
  fs.writeFileSync(path.join(process.env.VIEW_DIR, '.temp', name), content);
}

module.exports = {
  TRANSLATION_META,
  ASSETS,
  merge,
  init,
  get,
  get_byorder,
  get_byreference,
}