import {getSiteLang} from "./urlUtils";

const keys = {
  'main.title.1': {
    ua: 'Зроби ПОСТ —',
    en: 'POST to',
  },
  'main.title.2': {
    ua: 'ЗУПИНИ ВІЙНУ',
    en: 'STOP WAR',
  },
  'main.title.3': {
    ua: 'в УКРАЇНІ',
    en: 'in UKRAINE'
  },
  'main.aim': {
    ua: 'Мета',
    en: 'Goal',
  },
  'main.description': {
    ua: 'Цей ресурс створений, щоб легко і швидко передавати за кордон найважливіші месиджі про війну. Всі вони вже' +
      ' перекладені мовами цих країн. Можете також використовувати картинки з нашої галереї постерів. Сподіваємося, наш ресурс стане вам надійним помічником! Постимо, репостимо, поширюємо, щоб зупинити війну!',
    en: 'This resource is designed to quickly and easily share abroad the most important messages about the war. All of the messages have already been translated into the languages of different countries. You can also use pictures from our poster gallery. We hope our resource will be a reliable assistant to you! Let\'s post, repost, and share to stop the war!',
  },
  'country_selector.title': {
    ua: 'Обери країну (А-Я)',
    en: 'Choose Country (A-Z)'
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

export function t(key) {
  let lang = getSiteLang();

  if (lang !== 'en') {
    lang = 'ua';
  }

  return keys[key][lang] || (keys[key] ? Object.values(keys[key])[0] : '');
}
