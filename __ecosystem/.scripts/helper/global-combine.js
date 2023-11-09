const path = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');

const PACKAGENAME = process.argv[2];
const ATOMICTYPE = process.argv[3];
const CLASSNAME = process.argv[4];

const FOLDERNAME = `${ATOMICTYPE}-${PACKAGENAME}`;
const IDNAME = `${ATOMICTYPE}_${PACKAGENAME}`
    .replace('.', '_')
    .replace('-', '_');

// helper function
function fixCSS(css) {
  const section = `div[data-target="${IDNAME}"]`;
  // const idselector = new RegExp(`#(${ids.join('|')})`);

  const lines = css.split(/\n/);
  for (let i=0; i<lines.length; i++) 
  {
      if (/^(\s+)?(@font-face|:root|@media|--)/g.test(lines[i])) continue
      if (/\{/.test(lines[i]))
      {
          const startline_match = lines[i].match(/^(body)?([^\{,]*)(\{|,)\W*$/);
          if (startline_match) lines[i] = lines[i].replace(startline_match[2], ` ${section} ${startline_match[2]}`);
      }
  }
  return lines.join('\n');

}
function fixJS(js, folder_path) {
  const section = `div[data-target="${IDNAME}"]`;

  const lines = js.split(/\n/);
  for (let i=0; i<lines.length; i++) {
    // checking for all other query selectors (not !ID)
    const queryselector_match = lines[i].match(/querySelector(All)?\([\'\"\`]?/);
    if (queryselector_match)
    {
      lines[i] = lines[i].replace(queryselector_match[0], `${queryselector_match[0]}${section} `);
    }

    // check for relative imports (that goes up)
    const relativeimport_match = lines[i].match(/(import[^\"\']+\"?\'?\.\.)/)
    if (relativeimport_match)
    {
      lines[i] = lines[i].replace(relativeimport_match[1], relativeimport_match[1]+"/../..")
    }

    const directrelativeimport_macth = lines[i].match(/^import\s+(.*from\s+)?["'](\.\/[^"']*)["'];?$/);
    if (directrelativeimport_macth) 
    {
      // we need to fix it 
      jsimportfix(directrelativeimport_macth[2]);
    }

    // replace direct window events
    const windowfunction_match = lines[i].match(/window\.on(\w+)/);
    if (windowfunction_match)
    {
      lines[i] = lines[i].replace(`window.on${windowfunction_match[1]}`, `const windowFunc${IDNAME}_${windowfunction_match[1]}`);

      lines.push(`\nwindow.addEventListener("${windowfunction_match[1]}", windowFunc${IDNAME}_${windowfunction_match[1]})`);
    }
  }
  return lines.join('\n');
}
function jsimportfix(src) {
  const filepath = path.resolve(FOLDER, src);
  const content = fixJS(fs.readFileSync(filepath, 'utf-8'));

  fs.writeFileSync(filepath, content, 'utf-8');
}

// main 
let mainjs = fs.readFileSync("views/combined/main.js", "utf-8");
const document = parse(fs.readFileSync("views/combined/index.html", "utf-8"));
const targetdoc = parse(fs.readFileSync(path.join("views/combined", FOLDERNAME, "index.html"), "utf-8"));
const combinedHEAD = document.querySelector('head');
const FOLDER = path.resolve("views/combined", FOLDERNAME);

// append the body 
document
  .querySelector('main')
  .appendChild(
    parse(`<div class="package" data-target="${IDNAME}">${targetdoc.querySelector('body').innerHTML}</div>`)
  );

// add the link in the sidebar 
const navbaritem = document
  .querySelector(`o-navbar-item#${ATOMICTYPE}`)

if (navbaritem)
{
  navbaritem.setAttribute('count', Number(navbaritem.getAttribute('count') || 0) + 1)
  navbaritem.appendChild(
    parse(`<o-navbar-item id="${IDNAME}" text="${CLASSNAME}"></o-navbar-item>`)
  )
}

// fix the links 
targetdoc
  .querySelectorAll('link[rel="stylesheet"]')
  .forEach(link => {
    
    let url = `${FOLDERNAME}/${link.getAttribute('href')}`;
    const css = fixCSS(fs.readFileSync(path.resolve("views/combined", url), 'utf-8'));
    
    let name = link.getAttribute('href').split('/').pop();
    let href = link.getAttribute('href').replace(name, IDNAME+name);
    url = `${FOLDERNAME}/${href}`;

    fs.writeFileSync(path.join("views/combined", url), css, 'utf-8');

    link.setAttribute("href", `${url}`)
    combinedHEAD.appendChild(link);
  });

// fix the scripts 
targetdoc
  .querySelectorAll("script[src]")
  .forEach(script => {
    const url = `${FOLDERNAME}/${script.getAttribute('src')}`;
    const js = fixJS(fs.readFileSync(path.resolve("views/combined", url), 'utf-8'));
    
    fs.writeFileSync(path.join("views/combined", url), js, 'utf-8');
    mainjs += `\nimport "./${url}";`
  });

// save the file 
fs.writeFileSync("views/combined/index.html", document.toString(), "utf-8");
fs.writeFileSync("views/combined/main.js", mainjs, "utf-8");
