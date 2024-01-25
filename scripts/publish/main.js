const fs = require("fs");
const path = require("path");
const { spawn } = require('child_process');
const { iterate, initializePackages } = require('../utils/package-list-dependency-order');

// variables
const SEMANTIC_VERSION = process.argv[2];
const CICD_NODE_TOKEN = process.argv[3];
const ROOT_DIR = path.join(__dirname, "../../");
const LOCKFILE = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "package-lock.json")));
let VERSIONDATA = null;

// setup 
initializePackages(ROOT_DIR, LOCKFILE);

async function getjsonData() {
  return new Promise((res, rej) => {
    let jsonData = '';
    process.stdin.on('data', (chunk) => {
      jsonData += chunk;
    });

    process.stdin.on('end', () => {
      res(JSON.parse(jsonData));
    });

    process.stdin.on("error", (e) => {
      rej(e);
    })
  })
}

async function execute(list) {
  let executions = [];
  for (const info of list) {
    await execute_individual(info, VERSIONDATA);
    await wait(!!CICD_NODE_TOKEN ? 1000 : 10);
  }

  if (executions.length > 0) return Promise.all(executions);
}

function wait(n = 1000) {
  return new Promise(res => setTimeout(res, n));
}

async function execute_individual(info, VERSIONDATA) {
  let package_version = VERSIONDATA.find(d => d.name === info.name)?.version || '-0.0.0';
  const title = `${info.name} @${package_version}`
  console.log(title);

  if (info.name.endsWith('-depricated')) {
    CONFIRMLIST.push({ status: 'depricated', title });
    console.log('\t[STATUS]: depricated');
    return;
  }

  const scriptPath = path.join(__dirname, 'individual.sh');
  const args = [info.location, SEMANTIC_VERSION, package_version, CICD_NODE_TOKEN || ""];

  const childProcess = spawn(scriptPath, args);
  const status = await spawnLogs(childProcess);
  CONFIRMLIST.push({ status, title });
  console.log(`\t[STATUS]: ${status}`);

  // printLogChunks(title, status, logs);
}

function spawnLogs(process) {
  let errors = false;

  return new Promise((res) => {
    process.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes("[individual]: skipped")) {
        res('skipped');
        return;
      }
      else if (output.includes("[individual]: complete")) {
        if (errors) {
          res("warning");
        }
        else {
          res("success");
        }
        return;
      }
      else {
        const lines = output.split("\n");
        for (let line of lines) {
          const trimmed = line.toString().trim();
          if (trimmed !== "") {
            console.log(`\t[LOG]:\t${trimmed}`); // Log for debugging
          }
        }
      }
    });

    process.stderr.on('data', (data) => {
      const lines = data.toString().split("\n");
      for (let line of lines) {
        const trimmed = line.toString().trim();
        if (trimmed !== "") {
          errors = true;
          console.log(`\t[ERROR]:\t${trimmed}`); // Log for debugging
        }
      }
    });

    process.on('close', (code) => {
      if (code !== 0) {
        res("failed");
        return
      }
    });
  })
}

// function printLogChunks(title, status, logs = []) {
//   console.log(`\t[${status}]\t${title}`);
//   CONFIRMLIST.push({ status, title })

//   for (let log of logs) {
//     console.log(log);
//   }
// }

async function init() {
  VERSIONDATA = await getjsonData();
  await iterate(execute);

  console.log('\n**Summery Report**')
  let prev = '';
  CONFIRMLIST.sort((a, b) => a.status.indexOf(b.status)).forEach(line => {
    if (prev !== line.status) {
      console.log(`[${line.status}]:`)
      prev = line.status;
    }

    console.log(`\t- ${line.title}`);
  })
}
const CONFIRMLIST = [];
init();
