const fs = require('fs');
const path = require('path');
const { merge, TRANSLATION_META: META } = require('./assets');

function mergeLanguage(output, type, languages) {
  if (!output[type]?.files) return;

  for (let file of output[type].files) {
    try {
      const name = file.filename.split('.json')[0].toLowerCase();

      const content = JSON.parse(file.content || '{}') || {};
      // think its better to use DeepMerge
      languages[name] = { ...languages[name], ...content };
    }
    catch (e) {
      console.log('[TRANSLATION ERROR]', type, file.filename)
    }
  }
}

function init() {
  // create the folder first
  fs.mkdirSync(path.join(process.env.VIEW_DIR, '.temp/translations'));

  const languages = {};
  merge("translations", (output, save) => {
    mergeLanguage(output, "global", languages);
    mergeLanguage(output, "package", languages);
    mergeLanguage(output, "view", languages);

    for (let lang in languages) {

      if (!languages[lang].meta) languages[lang].meta = { region: lang, language: lang };
      META[lang] = languages[lang].meta;
      save('translations/' + lang + '.json', JSON.stringify(languages[lang]))
    }
  });
}

module.exports = {
  init,
}