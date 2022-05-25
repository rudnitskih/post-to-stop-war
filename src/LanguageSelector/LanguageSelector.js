import React from 'react';
import s from './LanguageSelector.module.scss';
import Select from 'react-select';
import {t} from "../utils/translate";
import {availableLanguages, getLocaleDisplayName} from "../utils/localeUtils";
import {useLocation, useNavigate} from "react-router";
import {logEvent} from "../utils/anayliticsUtils";

export function LanguageSelector() {
  const navigate = useNavigate();
  const [,locale, language] = useLocation().pathname.split('/');

  const languages = availableLanguages.map((code) => ({
    code,
    displayName: getLocaleDisplayName(code),
  })).sort((a, b) => a.displayName.localeCompare(b.displayName));

  const options = languages.map(({code, displayName}) => ({
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
        navigate(locale ? `/${locale}/${value}` : `/en/${value}`);
        logEvent('CHANGE_LANGUAGE', {value});
      }}
      filterOption={({value}, searchValue) => {
        const {displayName} = languages.find(({code}) => code === value);

        return !displayName || displayName.toLowerCase().includes((searchValue || '').toLowerCase());
      }}
      placeholder={t('main.select.placeholder')}
      autoFocus={true}
      options={options}
      value={language && options.find(({value}) => language === value)}
      styles={{
        control: (provided, {isFocused}) => {
          return {
            ...provided,
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: isFocused ? '0 0 10px 1px rgba(225, 136, 136, 0.3)' : undefined,
            height: '50px',
            border: '2px solid #E18888',
            '&:hover': {
              borderColor: '#E18888'
            },
          };
        },
      }}
    />
  );
}

