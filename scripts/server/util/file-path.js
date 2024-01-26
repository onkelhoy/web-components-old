// package
const fs = require('fs');
const path = require('path');

// local packages
const { DEPENDENCY, LOCKFILE } = require('./dependency');
const { get: asset_get } = require('./assets');
// const WEB_DIR = path.join(process.env.ROOT_DIR, 'web/');


/**
 * Checks for the existence of a file in various potential folders based on a provided URL.
 * The function sequentially checks the file's presence in the .temp directory, view directory,
 * local assets directory, dependency assets directories, and finally, the global directory.
 * 
 * @param {string} url - The relative path or identifier for the file to be accessed.
 * @returns {string|null} The path to the file if found, or null if the file does not exist in any checked location.
 */
function get_path(url) {
  const asset_path = asset_get(url);
  if (asset_path) return asset_path;

  // we check if file exist in .temp folder 
  const temp_path = path.join(process.env.VIEW_DIR, ".temp", url);
  if (fs.existsSync(temp_path)) return temp_path;

  // then we check if inside view folder 
  const view_path = path.join(process.env.VIEW_DIR, url);
  if (fs.existsSync(view_path)) return view_path;

  // then we check if inside view public folder 
  const public_path = path.join(process.env.VIEW_DIR, 'public', url);
  if (fs.existsSync(public_path)) return public_path;

  // then we check if inside local asset folder 
  const local_asset_path = path.join(process.env.PACKAGE_DIR, 'asset', url);
  if (fs.existsSync(local_asset_path)) return local_asset_path;

  // then we check if in any of our dependency's assets 
  for (let dep in DEPENDENCY) {
    const resolved_path = LOCKFILE.packages[DEPENDENCY[dep].path].resolved;
    // in development case we have packages locally so we see if LOCKFILE has resolved flag set
    if (resolved_path && !resolved_path.startsWith("http")) {
      const package_asset_path = path.join(process.env.ROOT_DIR, resolved_path, 'asset', url);
      if (fs.existsSync(package_asset_path)) {
        return package_asset_path;
      }
    }
    else {
      // check as node_modules
      const package_asset_path = path.join(process.env.ROOT_DIR, DEPENDENCY[dep].path, 'asset', url);
      if (fs.existsSync(package_asset_path)) return package_asset_path;
    }
  }

  // last we check if it exist on global level 
  const global_path = path.join(process.env.ROOT_DIR, 'asset', url);
  if (fs.existsSync(global_path)) return global_path;

  return null;
}

function getFilePath(request, response) {
  // starting route should be omitted to keep everything to "/" origin
  let { base_route } = request.cookies;
  const url = request._parsedUrl.pathname;

  let attempts = 0;

  while (true) {
    let new_url = url;
    if (attempts > 10) return null;

    // check if we can remove base_route from our url
    if (base_route && new_url.startsWith(base_route)) {
      new_url = new_url.replace(base_route, '');
    }
    else {
      base_route = '';
      attempts++;
    }

    if (['/', ''].includes(new_url)) return process.env.HTMLFILE; // path.join(process.env.VIEW_DIR, process.env.HTMLFILE);

    const filepath = get_path(new_url);
    if (filepath) {
      response.cookie('base_route', base_route);
      return filepath;
    }

    if (url.startsWith('/themes')) {
      const partial_theme_path = path.join(process.env.ROOT_DIR, url, 'tokens.css');
      if (fs.existsSync(partial_theme_path)) return partial_theme_path;

      // last we check if it exist on global level theme 
      const full_theme_path = path.join(process.env.ROOT_DIR, url);
      if (fs.existsSync(full_theme_path)) return full_theme_path;
    }

    // we split to get paths
    const splitted = new_url.split('/');
    const first = splitted[0] === '' ? splitted[1] : splitted[0];

    // at this point we could not find any file, so we need to update the current base_route and try again 
    const new_baseroute = base_route + '/' + first;
    if (url === new_baseroute) {
      // it is the same as the url.. at this point I think it's a 404 
      return null;
    }
    else {
      base_route = new_baseroute;
    }
  }
}

module.exports = {
  getFilePath,
}