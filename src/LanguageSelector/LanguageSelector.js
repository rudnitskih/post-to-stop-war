import React from 'react';
import s from './LanguageSelector.module.scss';
import Select from 'react-select';
import {t} from "../utils/translate";
import {getLocaleDisplayName} from "../utils/localeUtils";
import {useLocation, useNavigate} from "react-router";

export function LanguageSelector(props) {
  const navigate = useNavigate();
  const [,locale, language] = useLocation().pathname.split('/');
  let {locales } = props;

  locales = locales.map((code) => ({
    code,
    displayName: getLocaleDisplayName(code),
  })).sort((a, b) => a.displayName.localeCompare(b.displayName));

  const options = locales.map(({code, displayName}) => ({
    value: code,
    label: (
      <div className={s.option}>
        {displayName}
      </div>
    ),
  }));

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
      options={options}
      value={language && options.find(({value}) => language === value)}
      styles={{
        control: (provided) => ({
          ...provided,
          textAlign: 'center',
          height: '50px',
          border: '2px solid #E18888',
        }),
      }}
    />
  );
}

