import React from 'react';
import s from './LanguageSelector.module.scss';
import Select from 'react-select';
import {t} from "../utils/translate";
import {getLocaleDisplayName} from "../utils/localeUtils";
import {useLocation, useNavigate} from "react-router";

export function LanguageSelector(props) {
  const navigate = useNavigate();
  const locale = useLocation().pathname.split('/')[1];
  let {locales, selectedLocale } = props;

  locales = locales.map((code) => ({
    code,
    displayName: getLocaleDisplayName(code),
  })).sort((a, b) => a.displayName.localeCompare(b.displayName));

  return (
    <Select
      className={s.root}
      isSearchable={true}
      onChange={({value}) => {
        navigate(locale ? `/${locale}/${value}` : `/ua/${value}`);
      }}
      filterOption={({value}, searchValue) => {
        const {displayName} = locales.find(({code}) => code === value);

        return !displayName || displayName.toLowerCase().includes((searchValue || '').toLowerCase());
      }}
      placeholder={t('main.select.placeholder')}
      autoFocus={true}
      options={locales.map(({code, displayName}) => ({
        value: code,
        label: (
          <div className={s.option}>
            {/*<span className={`${s.mobileFlag} fi fi-${countryCode.toLowerCase()}`}/>*/}
            {displayName}
          </div>
        ),
      }))}
      defaultValue={selectedLocale}
    />
  );
}

