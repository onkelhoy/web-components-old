const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

const packagelock = JSON.parse(fs.readFileSync(path.join(__dirname, "../../package-lock.json")));

const map = {};
const set = new Set();

const SEMANTIC_VERSION = process.argv[2];
const CICD_NODE_TOKEN = process.argv[3];

async function getjsonData() 
{
  return new Promise((res, rej) => 
  {
    let jsonData = '';
    process.stdin.on('data', (chunk) => 
    {
      jsonData += chunk;
    });
    
    process.stdin.on('end', () => 
    {
      res(JSON.parse(jsonData));
    });

    process.stdin.on("error", (e) => 
    {
      rej(e);
    })
  })
}

for (const name in packagelock.packages) 
{
  if (name.startsWith("node_modules/@pap-it") && name !== "node_modules/@pap-it/server")
  {
    const mapname = name.split("node_modules/")[1];
    if (!map[mapname]) map[mapname] = { dep: [], has: [] };

    set.add(mapname);

    const packagejson = packagelock.packages[packagelock.packages[name].resolved];
    if (!packagejson) 
    {
      console.log('failes', name, packagejson, packagelock.packages[name].resolved)
      continue;
    }
    const dependencies = [];

    map[mapname].location = packagelock.packages[name].resolved;

    for (const dep in packagejson.dependencies) 
    {
      if (dep.startsWith("@pap-it") && dep !== mapname)
      {
        if (!map[dep]) map[dep] = { dep: [], has: [] };
        map[dep].has.push(mapname);
        dependencies.push(dep);
      }
    }
    map[mapname].dep = dependencies
  }
}
// // we also add the @pap-it/server 
// map['@pap-it/server'] = { dep: [], has: [], location: packagelock.packages['node_modules/@pap-it/server'].resolved }

async function execute(list, versionData) 
{
  let executions = [];
  for (const name of list) 
  {
    if (CICD_NODE_TOKEN)
    {
      await execute_individual(name, versionData);
      await wait();
    }
    else 
    {
      executions.push(execute_individual(name, versionData))
    }
  }

  if (executions.length > 0) return Promise.all(executions);
}

function wait(n = 1000) 
{
  return new Promise(res => setTimeout(res, n));
}

function execute_individual(name, versionData) 
{
  return new Promise((res, rej) => 
  {
    let package_version = versionData.find(d => d.name === name)?.version || '-0.0.0';
    exec(path.join(__dirname, `individual.sh ${map[name].location} ${SEMANTIC_VERSION} ${package_version} ${CICD_NODE_TOKEN || ""}`), (error, stdout, stderr) => 
    {
      if (error) 
      {
        if (error.code === 2)
        {
          console.log("\t[skipped]\t", name);
        }
        else 
        {
          console.log("\t[failed]\t", name);
        }
      }
      else if (stdout) 
      {
        console.log("\t[success]\t", name);
        // console.log("\t[success]\t", name);
      }

      res();
    })
  })
}

let attempts = 0;
async function run(versionData) 
{
  const list = [];
  const arr = Array.from(set);
  for (const name of arr) 
  {
    if (map[name].dep.length === 0)
    {
      set.delete(name);
      list.push(name);
    }
  }

  console.log(`package-batch, size=${list.length}`)
  // this is a batch that could all be run in parallel 
  await execute(list, versionData);
  console.log('');

  for (const name of list) 
  {
    // remove this package as dependency for rest 
    for (const other of map[name].has) 
    {
      map[other].dep = map[other].dep.filter(n => n !== name);
    }
  }

  if (set.size > 0)
  {
    if (list.length === 0)
    {
      if (attempts >= 10)
      {
        console.log(set, map)
        throw new Error("could not reach all packages");
      }
      attempts++;
    }
    run(versionData);
  }
}

async function init() 
{
  const versionData = await getjsonData();
  run(versionData);
}
init();
