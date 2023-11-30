const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const { DeepMerge } = require('../utils/deep-merge');

// constants
const SCRIPTDIR = process.argv[2];
const CLASSNAME = process.argv[3];
const DEFAULT_CONFIG = JSON.parse(fs.readFileSync(path.join(SCRIPTDIR, 'defaultconfig.json')));
let LOCAL_CONFIG = {}; 
try 
{
  LOCAL_CONFIG = JSON.parse(fs.readFileSync(".config"));
}
catch {}

// create the fallback config 
const config = DeepMerge(DEFAULT_CONFIG, LOCAL_CONFIG);

// variables 
const combinedIndex_path = path.join("views", "combined", "index.html");
const combinedIndexSRC = fs.readFileSync(combinedIndex_path, 'utf-8');
const document = parse(combinedIndexSRC);

const tabs = document.querySelectorAll('body > pap-tabs > pap-tab')
  .sort((a, b) => 
  {
    let aIndex = config.tabs.order.indexOf(a.getAttribute('id'));
    let bIndex = config.tabs.order.indexOf(b.getAttribute('id'));

    // if a is not in order, set its index high to sort at the end
    if (aIndex === -1) aIndex = Number.MAX_SAFE_INTEGER;

    // if b is not in order, set its index high to sort at the end
    if (bIndex === -1) bIndex = Number.MAX_SAFE_INTEGER;

    return aIndex - bIndex;
  });

tabs[0].setAttribute('class', 'selected');
document.querySelector('title').set_content(`${CLASSNAME} Component`);

const tabcontainer = document.querySelector('pap-tabs');
tabs.forEach(element => 
{
  element.parentNode.removeChild(element);
  tabcontainer.appendChild(element);
});

function listDirectories(folderPath) 
{
  try 
  {
    const filesAndDirs = fs.readdirSync(folderPath, { withFileTypes: true });
    const directories = filesAndDirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    return directories;
  }
  catch (error) 
  {
    console.error('Error reading the directory:', error);
  }
}

// add translations

// add themes 
const themes = listDirectories(path.resolve(SCRIPTDIR, '../../themes'));
if (themes.length > 1)
{
  document.appendChild(parse(`
        <script defer>
            window.addEventListener("load", () => {
            ${themes.map(theme => 
  {
    let color = undefined;
    let text = theme;
    try 
    {
      const themeconfig = fs.readFileSync(path.resolve(SCRIPTDIR, '../../themes', theme, ".config"));
      if (themeconfig)
      {
        const config = JSON.parse(themeconfig);
        color = config.color;

        if (config.text) text = theme.text;
      }
    }
    catch {}
    if (!color)
    {
      const colors = ["cornflowerblue", "coral", "chocolate", "salmon", "firebrick", "khaki"];
      color = colors[Math.round(Math.random() * (colors.length - 1))]
    }
                
    return `window.oTheme.add({ name: "${text}", href: "themes/${theme}", representColor: "${color}" });`
  }).join('\n')}
            });
        </script>
    `));
}

fs.writeFileSync(combinedIndex_path, document.toString(), "utf-8");

