import {getSiteLang} from "./urlUtils";

const rtlLocales = ['ar', 'he', 'fa'];

const getLocale = () => getSiteLang() === 'ua' ? 'uk' : 'en';
export const getLocaleDisplayName = (code) => capitalizeFirstLetter(
  (new Intl.DisplayNames([getLocale()], {type: 'language'})).of(code)
);

export const getLocaleDirection = (locale) => {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
};

export const ukrainianToCodeLocale = {
  Албанська: 'sq',
  Англійська: 'en',
  Арабська: 'ar',
  Білоруська: 'be',
  Боснійська: 'bs',
  Вірменська: 'hy',
  Гінді: 'hi',
  Грузинська: 'ka',
  Данська: 'da',
  Іврит: 'he',
  Іспанська: 'es',
  Італійська: 'it',
  Китайська: 'zh',
  Латиська: 'lv',
  Литовська: 'lt',
  Німецька: 'de',
  Норвезька: 'no',
  Перська: 'fa',
  Польська: 'pl',
  Португальська: 'pt',
  Російська: 'ru',
  Румунська: 'ro',
  Сербська: 'srp',
  Словацька: 'sk',
  Турецька: 'tr',
  Угорська: 'hu',
  Українська: 'uk',
  Філіппінська: 'tl',
  Фінська: 'fi',
  Французька: 'fr',
  Хорватська: 'hr',
  Чеська: 'cs',
  Шведська: 'sv',
  Японська: 'ja',
};


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
