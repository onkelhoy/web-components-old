const path = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');

// helper function
function fixCSS(css) 
{
  const section = `div[data-target="${process.env.PREFIXNAME}"]`;
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
function fixJS(js, folder_path) 
{
  const section = `div[data-target="${IDNAME}"]`;

  const lines = js.split(/\n/);
  for (let i=0; i<lines.length; i++) 
  {
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
function jsimportfix(src) 
{
  const filepath = path.resolve(WEBDIR, src);
  const content = fixJS(fs.readFileSync(filepath, 'utf-8'));

  fs.writeFileSync(filepath, content, 'utf-8');
}

process.env.ROOTDIR = process.argv[2]; //.ROOTDIR
process.env.PACKAGE = process.argv[3]; //.PACKAGE
process.env.ATOMICTYPE = process.argv[4]; //.ATOMICTYPE
process.env.NAME = process.argv[5]; //.NAME
process.env.PREFIXNAME = process.argv[6]; //.PREFIXNAME
process.env.CLASSNAME = process.argv[7]; //.CLASSNAME

const IDNAME = process.env.PREFIXNAME;
const WEB_FOLDER = path.join("packages", `${process.env.ATOMICTYPE}-${process.env.NAME}`);
const WEBDIR = path.join(process.env.ROOTDIR, "web", WEB_FOLDER);

const document_path = path.join(WEBDIR, "index.html");
const document = parse(fs.readFileSync(document_path, "utf-8"));

const maindocument_path = path.join(process.env.ROOTDIR, "web", "index.html");
const maindocument = parse(fs.readFileSync(maindocument_path, "utf-8"));
const maindocument_head = maindocument.querySelector('head');

const URL_REMOVE_TEMPLATE = path.join(process.env.ROOTDIR, "web");

// fix the links 
document
  .querySelectorAll('link[rel="stylesheet"]')
  .forEach(link => 
  {
    
    let url = link.getAttribute('href');
    // const file_path = path.join(WEBDIR, url);
    // const css = fixCSS(fs.readFileSync(file_path, 'utf-8'));
    
    // let name = link.getAttribute('href').split('/').pop();
    // let href = link.getAttribute('href').replace(name, IDNAME+name);
    // // url = `./${location}/${href}`;
    link.setAttribute("href", path.join(WEBDIR, url).replace(URL_REMOVE_TEMPLATE, ""));
    // fs.writeFileSync(file_path, css, 'utf-8');

    // // console.log('after', url)

    maindocument_head.appendChild(link);
  });

// fix the scripts 
document
  .querySelectorAll("script[src]")
  .forEach(script => 
  {
    const url = script.getAttribute('src');
    // const file_path = path.join(WEBDIR, url);
    // const js = fixJS(fs.readFileSync(file_path, 'utf-8'));
    script.setAttribute("src", path.join(WEBDIR, url).replace(URL_REMOVE_TEMPLATE, ""));
    
    // fs.writeFileSync(file_path, js, 'utf-8');
    // mainjs += `\nimport "./${url}";`

    maindocument_head.appendChild(script);
  });

// const FOLDERNAME = process.env.PREFIXNAME;
// const IDNAME = `${ATOMICTYPE}_${PACKAGENAME}`
//   .replace('.', '_')
//   .replace('-', '_');

// // main 
// const FOLDER_PATH = path.join(path.join(process.env.WEB_DIR, location));
// const targetdoc = parse(fs.readFileSync(path.join(FOLDER_PATH, "index.html"), "utf-8"));
// const combinedHEAD = document.querySelector('head');

// append the body 
maindocument
  .querySelector('main.designsystem')
  .appendChild(
    parse(`<div class="package" data-target="${IDNAME}">${document.querySelector('body').innerHTML}</div>`)
  );

// const main = maindocument.querySelector('main.designsystem')
// console.log(main.toString())
// // add the link in the sidebar 
// const navbaritem = document
//   .querySelector(`pap-navbar-item#${ATOMICTYPE}`)

// if (navbaritem)
// {
//   navbaritem.setAttribute('count', Number(navbaritem.getAttribute('count') || 0) + 1)
//   navbaritem.appendChild(
//     parse(`<pap-navbar-item id="${IDNAME}" text="${CLASSNAME}"></pap-navbar-item>`)
//   )
// }


// save the file 
fs.writeFileSync(maindocument_path, maindocument.toString(), "utf-8");
// fs.writeFileSync("views/combined/main.js", mainjs, "utf-8");