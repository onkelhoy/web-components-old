/* eslint-disable indent */
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
  console.log(`::group::${info.name} 📦`);
  if (info.name.endsWith('-depricated')) {
    CONFIRMLIST.push({ status: 'depricated', title: info.name });
    console.log('[STATUS]: 🚫 depricated');
    console.log(`::endgroup::`);
    return;
  }

  const scriptPath = path.join(__dirname, 'individual.sh');
  const args = [info.location, SEMANTIC_VERSION, package_version, CICD_NODE_TOKEN];

  const childProcess = spawn(scriptPath, args);
  const status = await spawnLogs(childProcess);
  CONFIRMLIST.push({ status, title: info.name });

  let icon = ""
  if (status === "success") {
    icon = "✅";
  }
  else if (status === "failed") {
    icon = "❎";
  }
  else if (status === "warning") {
    icon = "⚠️";
  }
  console.log(`[STATUS]: ${icon} ${status}`);
  console.log(`::endgroup::`);

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
            console.log(`[NOTICE] ${trimmed}`); // Log for debugging
          }
        }
      }
    });

    process.stderr.on('data', (data) => {
      const lines = data.toString().split('\n');

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (line === "npm") {
          let next = lines[i + 1];
          if (next) {
            next = next.toString().trim();
            line += " " + next;
            i++;
          }
          else {
            console.log("[DEBUG] <something is wrong with this line>", data.toString());
            continue;
          }
        }

        let state = 'NOTICE';

        if (line.startsWith('npm WARN') || line.startsWith('WARN')) {
          state = 'WARNING';
        }
        else if (line.startsWith('npm [ERROR]') || line.startsWith('[ERROR]')) {
          state = "ERROR";
        }
        else if (line.startsWith('npm notice') || line.startsWith('notice')) {
          state = "NOTICE";
        }

        console.log(`[${state}] ${line}`); // Log for debugging
        if (state === "ERROR") {
          error = true;
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

function getStatusIcon(status) {
  if (status === "success") return ""
}

async function init() {
  VERSIONDATA = await getjsonData();
  await iterate(execute);

  console.log('\n**Summery Report**')
  let prev = '';
  CONFIRMLIST.sort((a, b) => a.status.indexOf(b.status)).forEach(line => {
    if (prev !== line.status) {
      console.log(`${line.status}: (${getStatusIcon(line.status)})`)
      prev = line.status;
    }

    console.log(`\t- ${line.title}`);
  })
}
const CONFIRMLIST = [];
init();
