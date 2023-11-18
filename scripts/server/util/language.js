const fs = require('fs');
const path = require('path');
const { AssetMerge } = require('./asset-merge');

const SHORTINGS = {
  chinese: 'ch',
  dutch: 'nl',
  english: 'en',
  french: 'fe',
  german: 'de', 
  hungarian: 'hu', 
  nepalli: 'np',
  'north-korean': 'kp',
  norweigian: 'no',
  portoghese: 'pt',
  slovenian: 'si',
  'south-korean': 'kr',
  spannish: 'es',
  swedish: 'se',
  yemeni: 'ye'
}

function mergeLanguage(output, type, languages) 
{
  if (!output[type]?.files) return;
  
  for (let file of output[type].files) 
  {
    try 
    {
      let name = file.filename.split('.json')[0];
      if (SHORTINGS[name]) name = SHORTINGS[name];

      const content = JSON.parse(file.content || '{}') || {};
      languages[name] = { ...languages[name], ...content };
    }
    catch (e) 
    {
      console.log('[TRANSLATION ERROR]', type, file.filename)
    }
  }
}

function run() 
{
  // create the folder first
  fs.mkdirSync(path.join(process.env.VIEW_DIR, '.temp/translations'));

  AssetMerge("translations", (output, save) => 
  {
    const languages = {};
    mergeLanguage(output, "global", languages);
    mergeLanguage(output, "package", languages);
    mergeLanguage(output, "view", languages);
  
    for (let lang in languages) 
    {
      save('translations/' + lang + '.json', JSON.stringify(languages[lang]))
    }
  });
}

module.exports = {
  run,
}