const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');
const { iterate, initializePackages } = require('../utils/package-list-dependency-order');

// variables
const SEMANTIC_VERSION = process.argv[2];
const CICD_NODE_TOKEN = process.argv[3];
const ROOT_DIR = path.join(__dirname, "../../");
const LOCKFILE = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "package-lock.json")));
let VERSIONDATA = null;

// setup 
initializePackages(ROOT_DIR, LOCKFILE);

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

async function execute(list) 
{
  let executions = [];
  for (const info of list) 
  {
    if (CICD_NODE_TOKEN)
    {
      await execute_individual(info, VERSIONDATA);
      await wait();
    }
    else 
    {
      executions.push(execute_individual(info, VERSIONDATA))
    }
  }

  if (executions.length > 0) return Promise.all(executions);
}

function wait(n = 1000) 
{
  return new Promise(res => setTimeout(res, n));
}

function execute_individual(info) 
{
  return new Promise((res, rej) => 
  {
    if (info.name.endswith('-depricated')) 
    {
      console.log("\t[depricated]\t", info.name);
      res();
      return;
    }
    let package_version = VERSIONDATA.find(d => d.name === info.name)?.version || '-0.0.0';
    exec(path.join(__dirname, `individual.sh ${info.location} ${SEMANTIC_VERSION} ${package_version} ${CICD_NODE_TOKEN || ""}`), (error, stdout, stderr) => 
    {
      if (error) 
      {
        if (error.code === 2)
        {
          console.log("\t[skipped]\t", info.name);
        }
        else 
        {
          console.log("\t[failed]\t", info.name);
        }
      }
      else if (stdout) 
      {
        console.log("\t[success]\t", info.name);
        // console.log("\t[success]\t", name);
      }

      res();
    })
  })
}

async function init() 
{
  VERSIONDATA = await getjsonData();
  await iterate(execute);
}
init();
