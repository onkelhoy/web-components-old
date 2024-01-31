const path = require('path');

// NOTE this has to be done first !! 
// assinging environment variables
process.env.SCRIPT_DIR = process.argv[2];
process.env.PACKAGE_DIR = process.argv[3];
process.env.ROOT_DIR = process.argv[4];
process.env.SUBFOLDER = process.argv[5];
process.env.HTMLFILE = process.argv[6];
process.env.LIVEMODE = process.argv[7];
process.env.VIEW_DIR = process.env.SUBFOLDER === "no-view-folder" ? process.env.PACKAGE_DIR : path.join(process.env.PACKAGE_DIR, 'views', process.env.SUBFOLDER);

const { start } = require('./util/server');
const { init: initdependencies } = require('./util/dependency');
const { init: initlanguages } = require('./util/language');
const { init: initassets } = require('./util/assets');

const { DeepMerge } = require('../utils/deep-merge');
const { cleanup: watchCleanup } = require('./util/watch');

process.on('EXIT', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

let cleanupcalls = 0;
function cleanup() {
  if (cleanupcalls > 0) return;
  cleanupcalls++;

  watchCleanup();

  process.exit(0);  // This is important to ensure the process actually terminates
}

let CONFIG = {
  port: 3000
};
try {
  LOCAL_CONFIG = JSON.parse(fs.readFileSync(path.join(viewfolder, '.config'), 'utf-8'))
  CONFIG = DeepMerge(CONFIG, LOCAL_CONFIG);
}
catch { }

// first we init dependencies
initdependencies();
// then languages
initlanguages();
// then finally the assets 
initassets();

start(CONFIG);
