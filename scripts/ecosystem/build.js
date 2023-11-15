const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

const packagelock = JSON.parse(fs.readFileSync(path.join(__dirname, "../../package-lock.json")));

const map = {};
const set = new Set();

for (const name in packagelock.packages) 
{
  if (name.startsWith("node_modules/@papit") && name !== "node_modules/@papit/ecosystem")
  {
    const mapname = name.split("node_modules/")[1];
    if (!map[mapname]) 
    {
      map[mapname] = { dep: [], has: [] };
    }

    if (!fs.existsSync(path.resolve(packagelock.packages[name].resolved, ".scripts/combine.sh"))) 
    {
      map[mapname].skip = true;
      console.log(mapname, 'its added?', map[mapname])
      // continue;
    }

    set.add(mapname);

    const package = packagelock.packages[packagelock.packages[name].resolved];
    const dependencies = [];

    map[mapname].location = packagelock.packages[name].resolved;

    for (const dep in package.dependencies) 
    {
      if (dep.startsWith("@papit") && dep !== mapname)
      {
        if (!map[dep]) map[dep] = { dep: [], has: [] };
        map[dep].has.push(mapname);
        dependencies.push(dep);
      }
    }
    map[mapname].dep = dependencies
  }
}

function execute(name) {
  return new Promise((res, rej) => {
    if (map[name].skip) 
    {
      console.log("\t[skipped]\t", name);
      res();
      return
    } 

    exec(path.join(__dirname, `individual.sh ${map[name].location}`), (error, stdout, stderr) => {
      if (error) {
        if (error.code === 2)
        {
          console.log("\t[skipped]\t", name);
        }
        else 
        {
          console.log("\t[failed]\t", name);
        }
      }
      // else if (stderr) {
      //   console.log("ST-ERROR", stderr);
      // }
      else if (stdout) {
        console.log("\t[success]\t", name);
        // console.log("\t[success]\t", name);
      }

      res();
    })
  });
}

let attempts = 0;
async function run() {
  const list = [];
  const arr = Array.from(set);
  for (const name of arr) 
  {
    if (map[name].dep.length === 0)
    {
      set.delete(name);
      list.push(name);
    }
    /** NOTE could do improvement here to check what has been build already, 
     * was gonna check the package.version but this would not trigger any change ever.. 
     * need to somehow increase the version each time build is called - if something has changed I guess ? 
     * no could extend the build of indivdual packages so it increases package version by major, minor and the third 
     * - with a flag to be able to cancel this response like for watch we wish maybe not to call with updating etc
     * 
     * only when npm run build is called we could have this running 
     * so when we run "npm run build" within the watch script we could run as: "npm run build -n" -n for no? no 
     */
    // else if (latestjson[name] && latestjson[name] !== )
  }

  console.log(`package-batch, size=${list.length}`)
  // this is a batch that could all be run in parallel 
  for (const name of list) 
  {
    await execute(name);
  }

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
    run();
  }
}

async function init() {
  await run();
}
init();