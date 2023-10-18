// packages
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// local imports
const { update: socketupdate, error: socketerror } = require('./socket');

const outputfolder = path.join(process.env.VIEW_DIR, '.temp');

// Plugin for handling rebuilds with esbuild
const RebuildPlugin = {
  name: 'rebuild',
  setup(build) 
  {
    // When build ends, handle recompilation logic
    build.onEnd(result => 
    {
      try 
      {
        // Get entry point name; assume single entry point for simplicity
        const name = build.initialOptions.entryPoints[0];
        // Track number of rebuilds for the entry point
        contexts[name].builds++;
        // Process only if more than one build has occurred
        if (contexts[name].builds > 1) 
        {
          // Handle errors, if any, using a socket communication function
          if (result.errors.length > 0) 
          {
            // Assumes socketerror is a predefined function elsewhere
            socketerror(filename, result.errors)
            return
          }

          // Extract filename from path and read the output file
          const filename = name.split('/').pop();
          const url = path.join(outputfolder, filename);
          const file = fs.readFileSync(url, 'utf-8');
          // Send updated file content to client via socket
          socketupdate(filename, file);
        }
      }
      catch (error) 
      {
        // Log errors that occur during the rebuild handling
        console.log(error)
        console.log('something went wrong')
      }
    })
  },
}

// Store build contexts for entry points
const contexts = {};
const output_dir = path.join(process.env.VIEW_DIR, '.temp');

// Function to initiate watch mode on a file path with esbuild
async function watch(file_path) 
{
  if (!contexts[file_path]) 
  {
    console.log('[esbuild - watch]', file_path)
    const outfile = path.join(output_dir, strip(file_path));

    await build(file_path, outfile);

    // Set up context for rebuilds with the RebuildPlugin
    const ctx = await esbuild.context({
      entryPoints: [file_path],
      bundle: true,
      outfile: outfile,
      plugins: [RebuildPlugin],
    });
    // Save the context for later disposal and rebuild tracking
    contexts[file_path] = { ctx, builds: 0 };
    // Start the watcher
    await ctx.watch();
  }
}

async function build(file_path, outfile = null)
{
  if (outfile === null) 
  {
    console.log('[esbuild - build]', file_path)
    outfile = path.join(output_dir, strip(file_path));
  }

  // Perform initial build
  await esbuild.build({
    entryPoints: [file_path],
    bundle: true,
    outfile,
  });
}

function strip(url)
{
  const stripped = url
    .replace(process.env.VIEW_DIR + "/", '')
  return stripped;
}

// Clean up all contexts
function cleanup() 
{
  console.log('disposing esbuild context')
  Object.values(contexts).forEach(v => v.ctx.dispose());
}

// Export the watch and cleanup functions, and the contexts object
module.exports = {
  watch,
  build,
  cleanup,
  contexts,
}