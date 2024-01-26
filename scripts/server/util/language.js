const fs = require('fs');
const path = require('path');
const { merge } = require('./assets');

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
  spanish: 'es',
  swedish: 'sv',
  yemeni: 'ye'
}

// const languageNameInEnglish = new Intl.DisplayNames(['en'], { type: 'language' });

function mergeLanguage(output, type, languages) {
  if (!output[type]?.files) return;

  for (let file of output[type].files) {
    try {
      let name = file.filename.split('.json')[0].toLowerCase();
      if (SHORTINGS[name]) name = SHORTINGS[name];
      // name = languageNameInEnglish.of(name).toLowerCase();

      const content = JSON.parse(file.content || '{}') || {};
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

  merge("translations", (output, save) => {
    const languages = {};
    mergeLanguage(output, "global", languages);
    mergeLanguage(output, "package", languages);
    mergeLanguage(output, "view", languages);

    for (let lang in languages) {
      save('translations/' + lang + '.json', JSON.stringify(languages[lang]))
    }
  });
}

module.exports = {
  init,
}