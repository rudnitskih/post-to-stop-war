const converter = (initialData) => {
  return initialData.records.map(({fields}) => fields)
    .reduce((acc, row) => {
      const date = row['Date'];

      if (!acc[date]) {
        acc[date] = {
          Tags: [],
          Poster: [],
        };
      }

      const group = acc[date];

      try {
        group[codeLocaleToEnglish[ukrainianToCodeLocale[row['Language']]]] = row['Message'];

        row['Tags'].forEach((tag) => {
          if (!group['Tags'].includes(tag)) {
            group['Tags'].push(tag);
          }
        });

        const attachmentUrl = row['Attachment'][0].url;
        const attachmentName = attachmentUrl.split('/').at(-1);
        const currentAttachmentNames = group['Poster'].map((url) => url.split('/').at(-1))

        if (!currentAttachmentNames.includes(attachmentName)) {
          group['Poster'].push(attachmentUrl);
        }
      } catch (e) {
        console.log('Error', e);
        console.log('Item', row);
      }

      return acc;
    }, {})
}

const codeLocaleToUkrainian = {
  ar: 'Арабська',
  be: 'Білоруська',
  bs: 'Боснійська',
  cs: 'Чеська',
  da: 'Данська',
  de: 'Німецька',
  en: 'Англійська',
  es: 'Іспанська',
  fa: 'Перська',
  fi: 'Фінська',
  fr: 'Французька',
  he: 'Іврит',
  hi: 'Гінді',
  hr: 'Хорватська',
  hu: 'Угорська',
  hy: 'Вірменська',
  it: 'Італійська',
  ja: 'Японська',
  ka: 'Грузинська',
  lt: 'Литовська',
  lv: 'Латиська',
  no: 'Норвезька',
  pl: 'Польська',
  pt: 'Португальська',
  ro: 'Румунська',
  ru: 'Російська',
  sk: 'Словацька',
  sq: 'Албанська',
  srp: 'Сербська',
  sv: 'Шведська',
  tl: 'Філіппінська',
  tr: 'Турецька',
  uk: 'Українська',
  zh: 'Китайська'
};

const codeLocaleToEnglish = {
  ar: 'Arabic',
  be: 'Belarusian',
  bs: 'Bosnian',
  cs: 'Czech',
  da: 'Danish',
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fa: 'Persian',
  fi: 'Finnish',
  fr: 'French',
  he: 'Hebrew',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  it: 'Italian',
  ja: 'Japanese',
  ka: 'Georgian',
  lt: 'Lithuanian',
  lv: 'Latvian',
  no: 'Norwegian',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sq: 'Albanian',
  srp: 'Serbian',
  sv: 'Swedish',
  tl: 'Filipino',
  tr: 'Turkish',
  uk: 'Ukrainian',
  zh: 'Chinese'
}
const ukrainianToCodeLocale = swapKeysAndValues(codeLocaleToUkrainian);

// https://bobbyhadz.com/blog/javascript-swap-object-key-and-value#:~:text=To%20swap%20the%20keys%20and,with%20swapped%20keys%20and%20values.
function swapKeysAndValues(obj) {
  const swapped = Object.entries(obj).map(
    ([key, value]) => [value, key]
  );

  return Object.fromEntries(swapped);
}

module.exports = converter;


