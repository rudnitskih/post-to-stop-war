const keys = {
  'main.title.1': {
    ua: 'Зроби ПОСТ —',
  },
  'main.title.2': {
    ua: 'ЗУПИНИ ВІЙНУ',
  },
  'main.title.3': {
    ua: 'в УКРАЇНІ',
  },
  'main.aim': {
    ua: 'Мета',
  },
  'main.description': {
    ua: 'Цей ресурс створений, щоб легко і швидко передавати закордон найважливіші месиджі про війну. Всі вони вже' +
      ' перекладені мовами цих країн. Можете також використовувати картинки з нашої галереї постерів. Сподіваємося, наш ресурс стане вам надійним помічником! Постимо, репостимо, поширюємо, щоб зупинити війну!',
    en: 'This resource is designed to quickly and easily share abroad the most important messages about the war. All of the messages have already been translated into the languages of different countries. You can also use pictures from our poster gallery. We hope our resource will be a reliable assistant to you! Let\'s post, repost, and share to stop the war!',
  },
  'country_selector.title': {
    ua: 'Обери країну (А-Я)',
  },
  'mode.selector.messages': {
    ua: 'МЕСИДЖІ',
    en: 'Messages',
  },
  'mode.selector.visuals': {
    ua: 'Візуал',
    en: 'Visuals',
  },
  'footer.description': {
    uk: 'Команда проєкту: студенти і випускники УКУ із залученням бійців креативного фронту та іноземних експертів з' +
      ' комунікацій.',
    en: 'The project team includes students and alumni of Ukrainian Catholic University as well as creative front fighters and international  communication experts.'
  },
  'footer.link': {
    uk: 'Залишити відгук',
    en: 'Leave your review here',
  }
}

export function getLang() {
  return (window.location.pathname || '').replace('/', '') || 'ua';
}

export function t(key) {
  let lang = getLang();

  if (lang !== 'en') {
    lang = 'ua';
  }

  return keys[key][lang] || (keys[key] ? Object.values(keys[key])[0] : '');
}
