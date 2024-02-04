/* eslint-disable indent */
// packages
const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { parse } = require('node-html-parser');

// local packages
const { getFilePath } = require('./file-path');
const { watch, build } = require('./watch');
const { server: socketserver } = require('./socket');
const { get_byreference: asset_getbyreference } = require('./assets');

const app = express();
app.use(cookieParser());

let liveHTML = null;
const commonHTML = fs
  .readFileSync(path.join(process.env.SCRIPT_DIR, "template/common.html"), 'utf-8');

app.get('/@pap-it/assets/:asset', (req, res) => {
  const asset = req.params.asset.toLowerCase();
  let reference;
  switch (asset) {
    case "image":
    case "img":
      reference = "images";
      break;
    case "icon":
    case "ico":
      reference = "icons";
      break;
    case "theme":
      reference = "themes";
      break;
    case "translation":
    case "language":
    case "languages":
      reference = "translations";
      break;
    default:
      reference = asset;
      break;
  }
  const data = asset_getbyreference(reference)
    .map(d => ({ ...d, fullpath: undefined }));

  res.status(200).json(data);
});
app.get('*', async (req, res) => {
  try {
    let filepath = getFilePath(req, res);
    let file = null;

    if (filepath === null) {
      res.status(404).end('Not found');
    }
    else {
      // safety check 
      if (safeCheck(filepath)) {
        return res.status(302).end('forbidden');
      }

      if (process.env.LIVEMODE === "live") {
        if (filepath.endsWith('.js')) {
          if (!filepath.includes('.temp')) {
            await watch(filepath);
            filepath = getFilePath(req, res); // should update to the newly created file inside .temp
          }
        }
        if (liveHTML && filepath.endsWith('.html')) {
          file = fs.readFileSync(filepath, 'utf-8');
          const document = parse(file);
          document.querySelector('head').appendChild(parse(liveHTML));
          document.querySelector('head').appendChild(parse(commonHTML));
          file = document.toString();
        }
      }
      else {
        if (filepath.endsWith('.js')) {
          if (!filepath.includes('.temp')) {
            await build(filepath);
            filepath = getFilePath(req, res); // should update to the newly created file inside .temp
          }
        }
        if (filepath.endsWith('.html')) {
          file = fs.readFileSync(filepath, 'utf-8');
          const document = parse(file);
          if (document.querySelector('head')) document.querySelector('head').appendChild(parse(commonHTML));
          else {
            document.appendChild(parse(`<head>${commonHTML}</head>`));
          }
          file = document.toString();
        }
      }

      if (filepath.endsWith('.js')) {
        // Set Content-Type header for JavaScript files
        res.set('Content-Type', 'application/javascript');
      }

      if (file === null) file = fs.readFileSync(filepath);

      res.status(200).end(file);
    }
  }
  catch (e) {
    console.log('[error] internal error', e);
    res.status(500).end('internal server error');
  }
});

function safeCheck(filepath) {
  const normalizedPath = path.resolve(filepath);

  if (!normalizedPath.startsWith(process.env.ROOT_DIR)) return true;

  // add all file types we dont want clients to see 
  if (filepath.endsWith('.env')) return true;

  // no error
  return false;
}

let server_start_attempts = 0;
function start(CONFIG) {
  const port = Number(CONFIG.port) + server_start_attempts;

  if (process.env.LIVEMODE === "live") {
    liveHTML = fs
      .readFileSync(path.join(process.env.SCRIPT_DIR, "template/live.html"), 'utf-8')
      .replace('PORT', port);
  }

  const httpServer = app.listen(port, () => {
    console.log(`devserver started on port ${port}`);
  }).on('error', () => {
    server_start_attempts++;
    if (server_start_attempts < 1000) {
      start(CONFIG);
    }
    else {
      console.log(`[ERROR] port spaces between [${CONFIG.PORT}, ${port}] are all taken, please free up some ports`);
    }
  });

  httpServer.on('upgrade', (request, socket, head) => {
    socketserver.handleUpgrade(request, socket, head, (socket) => {
      socketserver.emit('connection', socket, request);
    });
  });
}


module.exports = {
  start,
}