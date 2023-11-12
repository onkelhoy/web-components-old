const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const { parse } = require('node-html-parser');

// locale files
const { deepMerge } = require('./util');
const { server:socketserver, update:socketupdate, error:socketerror } = require('./socket');

const app = express();
app.use(cookieParser());

const SCRIPT_DIR = process.argv[2];
const PACKAGE_DIR = process.argv[3];
const ROOT_DIR = process.argv[4];
const SUBFOLDER = process.argv[5];
const HTMLFILE = process.argv[6];

const htmlfilename = HTMLFILE.split('/').pop()

const viewfolder = path.join(PACKAGE_DIR, "views", SUBFOLDER);
const localAssetFolder = path.join(PACKAGE_DIR, "asset");
const globalAssetFolder = path.join(ROOT_DIR, "asset");

const outputfolder = path.join(viewfolder, '.devserver-temp');

process.on('EXIT', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

const LOCKFILE = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package-lock.json')));
const PACKAGE_JSON = JSON.parse(fs.readFileSync(path.join(PACKAGE_DIR, "package.json")));

const DEPENDENCY = {}

function build_dependency(name) 
{
  let packagejson = null;
  try 
  {
    packagejson = LOCKFILE.packages[LOCKFILE.packages[`node_modules/${name}`].resolved];
  }
  catch (e) 
  {
    throw e;
  }

  const destinations = ["dependencies", "devDependencies"];
  for (let destination of destinations)
  {
    for (let packagename in packagejson[destination])
    {
      if (packagename.startsWith("@henry2"))
      {
        if (!DEPENDENCY[packagename]) 
        {
            if (packagename.startsWith("@papit"))
            {
                if (!DEPENDENCY[packagename]) {
                    DEPENDENCY[packagename] = getLocalModule(packagename);

          build_dependency(packagename);
        }
      }
    }
  }
}
build_dependency(PACKAGE_JSON.name);

function getLocalModule(name) {
    if (!name.startsWith('@papit')) return null;

  const data = LOCKFILE.packages[`node_modules/${name}`];
  if (!data) return null;
  if (!data.resolved) return null;

  return path.join(ROOT_DIR, data.resolved);
}


let cleanupcalls = 0;
function cleanup() 
{
  if (cleanupcalls > 0) return;
  cleanupcalls++;

  console.log('disposing esbuild context')
  Object.values(contexts).forEach(v => v.ctx.dispose());

  process.exit(0);  // This is important to ensure the process actually terminates
}

let CONFIG = {
  port: 3000
};
try 
{
  LOCAL_CONFIG = JSON.parse(fs.readFileSync(path.join(viewfolder, '.config'), 'utf-8'))
  CONFIG = deepMerge(CONFIG, LOCAL_CONFIG);
}
catch {}

const clientHTML = fs
  .readFileSync(path.join(SCRIPT_DIR, "client.html"), 'utf-8')
  .replace('PORT', CONFIG.port);

app.get('*', async (req, res) => 
{
  const url = correctUrl(req._parsedUrl.pathname, req, res);

  const [status, file] = await getFile(url);
  if (status === 200 && url.endsWith('.js'))
  {
    res.setHeader('Content-Type', 'application/javascript');
  }
  res.status(status).end(file);
});

const RebuildPlugin = {
  name: 'rebuild',
  setup(build) 
  {
    build.onEnd(result => 
    {
      try 
      {
        const name = build.initialOptions.entryPoints[0];
        contexts[name].builds++;
        if (contexts[name].builds > 1)
        {
          if (result.errors.length > 0) 
          {
            socketerror(filename, result.errors)
            return 
          } 
    
          const filename = name.split('/').pop();
          const url = path.join(outputfolder, filename);
          const file = fs.readFileSync(url, 'utf-8');
          socketupdate(filename, file);
        }
      }
      catch (error) 
      {
        console.log(error)
        console.log('something went wrong')
      }
    })
  },
}

async function watch(file_path, output_dist) 
{
  if (!contexts[file_path])
  {
    // build once
    await esbuild.build({
      entryPoints: [file_path],
      bundle: true,
      outfile: output_dist,
    });

    // watcher build
    const ctx = await esbuild.context({
      entryPoints: [file_path],
      bundle: true,
      outfile: output_dist,
      plugins: [RebuildPlugin],
    });
    contexts[file_path] = {ctx, builds: 0};
    await ctx.watch();
  }
}

function isFilePath(p) 
{
  // Extract the extension from the path
  const extension = path.extname(p);

  // If the extension is not empty, it's likely a file path
  return extension.length > 0;
}
function getFileName(url) 
{
  return path.basename(url);
}
function getFolderName(url) 
{
  return path.dirname(url);
}
function correctUrl(url, req, res) 
{
  if (url.endsWith('/'))
  {
    url += htmlfilename;
  }

  let folder_path = url;
  let file_path = undefined;
  if (isFilePath(url))
  {
    file_path = getFileName(url);
    folder_path = getFolderName(url);
  }
  else 
  {
    if (!folder_path.endsWith('/')) 
    {
      folder_path += '/';
    }
  }

  const dynamic_route = req.cookies.dynamic_route;
  if (fs.existsSync(path.join(viewfolder, folder_path)))
  {
    if (dynamic_route) res.clearCookie('dynamic_route');
  }
  else 
  {
    if (dynamic_route && dynamic_route !== "/" && folder_path.startsWith(dynamic_route))
    {
      folder_path = folder_path.slice(dynamic_route.length, folder_path.length);
    }

    // static folders 
    if (folder_path.startsWith('/asset/')) return returnURL(folder_path, file_path);
    if (folder_path.startsWith('/themes/')) return returnURL(folder_path, file_path);
    if (folder_path.startsWith('/public/')) return returnURL(folder_path, file_path);
    if (folder_path.startsWith('/translations/')) return returnURL(folder_path, file_path);

    if (!fs.existsSync(path.join(viewfolder, folder_path)))
    {
      // folder_path doesnt exists - we should remove the shit until we get a path that exists  
      const queue = folder_path.split('/').reverse();
      let folder_path_loop = folder_path;
      let remove_part = '';
      while (queue.length > 0)
      {
        const popped = queue.pop();
        if (popped === '') 
        {
          continue;
        }
        else if (popped)
        {
          remove_part += ('/' + popped);
          folder_path_loop = folder_path_loop.slice(('/' + popped).length, folder_path_loop.length);
          if (fs.existsSync(path.join(viewfolder, folder_path_loop)))
          {
            res.cookie('dynamic_route', remove_part);
            folder_path = folder_path.slice(remove_part.length, folder_path.length);
            break;
          }
        }
        else 
        {
          // this should not happend I guess 
          console.log('[ERROR] I should not be printed!');
          break;
        }
      }
    }
  }
    
  return returnURL(folder_path, file_path);
}
function returnURL(folder_path, file_path) 
{
  if (file_path) 
  {
    return path.join(folder_path, file_path);
  }

  return folder_path;
}

const contexts = {};
async function getFile(url) 
{
  try 
  {
    let file_path = path.join(viewfolder, url);

    if (!fs.existsSync(file_path))
    // check if its dynamic routes 
    
    // check if file exists in other places (local & global asset folder)
    // then individually the dependency packages's asset folder
      if (/public/.test(url)) 
      {
        {
          const urlwithoutpublic = url.replace("/public", "");
          const localurl = path.join(localAssetFolder, urlwithoutpublic);
          const globalurl = path.join(globalAssetFolder, urlwithoutpublic);

          let target = null;
                
          if (fs.existsSync(localurl))
          {
            target = localurl;
          }
          else if (fs.existsSync(globalurl))
          {
            target = globalurl;
          }
          else // search individually dependencies  
          {
            for (let dep in DEPENDENCY) 
            {
              const filepath = path.join(DEPENDENCY[dep], "asset", urlwithoutpublic);
              if (fs.existsSync(filepath))
              {
                target = filepath;
                break;
              }
            }
          }

          if (target) 
          {
            const file = fs.readFileSync(target);
            return [200, file];
          }
        }
      }

    if (url.includes('favicon')) 
    {
      // Check if file exists
      if (fs.existsSync(file_path)) 
      {
        // If the file exists, read it and return
        const faviconFile = fs.readFileSync(file_path);
        return [200, faviconFile];
      }
      else 
      {
        // If the file doesn't exist, read the default one and return
        const defaultFaviconPath = path.join(SCRIPT_DIR, 'favicon.ico');
        const defaultFaviconFile = fs.readFileSync(defaultFaviconPath);
        return [200, defaultFaviconFile];
      }
    }

    if (url.endsWith('.html'))
    {
      const html = fs.readFileSync(file_path, 'utf-8');
      const document = parse(html);
      document.querySelector('head').appendChild(parse(clientHTML));

      return [200, document.toString()];
    }
    if (url.endsWith('.map'))
    {
      const file = fs.readFileSync(path.join(outputfolder, url), 'utf-8');
      return [200, file];
    }

    const themematch = url.match(/\/?themes\/(\w+)/);
    if (themematch)
    {
      const file = fs.readFileSync(path.resolve(SCRIPT_DIR, '../../themes/', themematch[1], 'tokens.css'))
      return [200, file]
    }
    const translationmatch = url.match(/\/?translation\/(\w+)/);
    if (translationmatch)
    {
      const file = fs.readFileSync(path.resolve(SCRIPT_DIR, '../../translations/', translationmatch[1] + '.json'))
      return [200, file]
    }
    if (/\.(jpe?g|png|gif)$/i.test(url))
    {
      const image = fs.readFileSync(path.join(viewfolder, url));
      return [200, image];
    }
    if (!url.endsWith('.js') && !url.endsWith('.css'))
    {
      const file = fs.readFileSync(path.join(viewfolder, url), 'utf-8');
      return [200, file];
    }

    const filename = url.split('/').pop();
    const output_dist = path.join(outputfolder, filename);

    await watch(file_path, output_dist);

    try 
    {
      const output = fs.readFileSync(output_dist, 'utf-8');
      return [200, output];
    }
    catch (error) 
    {
      console.log(error);

      return [404, "file not found"]
    } 
  }
  catch (error) 
  {
    console.log(error);

    return [500, "server crashed"]
  }
}

let server_start_attempts = 0;
function StartServer() 
{
  const port = Number(CONFIG.port) + server_start_attempts;
  const httpServer = app.listen(port, () => 
  {
    console.log(`devserver started on port ${port}`);
  }).on('error', () => 
  {
    server_start_attempts++;
    if (server_start_attempts < 1000)
    {
      StartServer();
    }
    else 
    {
      console.log(`[ERROR] port spaces between [${CONFIG.PORT}, ${port}] are all taken, please free up some ports`);
    }
  });

  httpServer.on('upgrade', (request, socket, head) => 
  {
    socketserver.handleUpgrade(request, socket, head, (socket) => 
    {
      socketserver.emit('connection', socket, request);
    });
  });
}

StartServer();
