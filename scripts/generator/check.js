const fs = require('fs');
const path = require('path');

let LOCKFILE;
try 
{
  const url = path.join(process.argv[2], "package-lock.json");
  LOCKFILE = JSON.parse(fs.readFileSync(url));
  if (LOCKFILE)
  {
    const packagename = process.argv[3];
    const destination = process.argv[4].slice(2);

    
    const pkg = LOCKFILE.packages[`node_modules/${packagename}`];
    if (pkg)
    {
      if (pkg.resolved === destination)
      {
        console.log(4);
      }
      else 
      {
        console.log(1);
      }
    }
    else 
    {
      console.log(0)
    }
  }
  else 
  {
    console.log(3);
  }
}
catch (error)
{
  console.log(2);
}

