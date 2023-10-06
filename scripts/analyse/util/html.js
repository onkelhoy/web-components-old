const fs = require('fs');
const http = require('http');
const path = require('path');
const { parse } = require('node-html-parser');
const { chromium } = require('playwright');

let server;

function build_html(package_dir, component_name, script_dir) {
  const analysecode = fs.readFileSync(path.join(package_dir, "dist/analyse.bundle.js"), 'utf-8');

  const html = `
    <html>
      <head>
        <script type="module">
          ${analysecode}

          window.COMPONENT_HTML_EXTRACTOR_FUNCTION = () => {
            const temp_component = new ${component_name}();
            const html = temp_component.render();

            if (typeof html === 'string') return html;

            if ('children' in html) return Array.from(html.children).map(node => node.outerHTML).join(' ')
            
            return html;
          }
        </script>
      </head>
    </html>
  `

  fs.writeFileSync(path.join(script_dir, 'index.html'), html, 'utf-8');
}

function startserver (script_dir, port = 3004) {
  server = http.createServer((req, res) => {
    if (req.url === '/') {
      fs.readFile(path.join(script_dir, 'index.html'), (err, data) => {

        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.write('Internal server error');
          res.end();
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        }
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not found');
      res.end();
    }
  });

  server.listen(port, () => {
    // console.log(`html-extraction-server is running at http://localhost:${port}`);
  });
}
function closeserver () {
  if (server) 
  {
    server.close();
    // console.log('closing html-extraction-server');
  }
}

// NOTE if slots are conditional based on some attributes it wont be included and a more extensive solution should take place 
// to handle this (using .config file or something)
async function playwright_extract(port) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load your HTML, assuming it is stored in the 'html' variable
  await page.goto(`http://localhost:${port}`);

  // Execute your function on the page and get the result
  const result = await page.evaluate(() => {
    // Here you can access any global functions available in your page's script
    return window.COMPONENT_HTML_EXTRACTOR_FUNCTION();
  });

  await browser.close();

  return result;
}

function parser(html) {
  const DOM = parse(html);

  const slots = DOM.querySelectorAll('slot');
  const parts = DOM.querySelectorAll('*[part]');

  return {
    slots: slots.map(slot => {
      return {
        name: slot.getAttribute('name') || "default",
        html: slot.innerHTML
      }
    }),
    parts: parts.map(part => {
      return {
        name: part.getAttribute('part'),
        tag: part.tagName
      }
    })
  }
}

async function html_extractor(package_dir, component_name, script_dir) {
  try {
    console.log('componentname', component_name, package_dir)
    build_html(package_dir, component_name, script_dir);
  
    const port = 3004;
  
    startserver(script_dir, port);
    const html = await playwright_extract(port);
    closeserver();

    return parser(html);
  }
  catch (e)
  {
    console.log(e)
    closeserver();
  }
}

module.exports = {
  html_extractor
}