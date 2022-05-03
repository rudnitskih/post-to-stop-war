import React, {Component} from 'react';
import s from './CountrySelector.module.scss';
import classNames from 'classnames';
import Select from 'react-select';
import {Content} from "../Content";
import {t} from "../../utils/translate";

export class CountrySelector extends Component {
  render() {
    const {countries, selectedCountry, onChange} = this.props;

    return (
      <Content>
        <h2 className={s.heading}>{t('country_selector.title')}</h2>

        <div className={s.content}>
          <div className={s.desktopSelector}>
            {
              countries
                .map(({countryCode, displayName}) => {
                  return (
                    <button
                      key={countryCode}
                      className={classNames(s.country, {
                        [s.selected]: selectedCountry === countryCode,
                      })}
                      onClick={() => onChange(countryCode)}
                    >
                      <span className={`${s.flag} fi fi-${countryCode.toLowerCase()}`}/>
                      <span className={s.name}>{displayName}</span>

                    </button>
                  );
                })
            }
          </div>

          {
            <Select
              className={s.mobileSelect}
              isSearchable={true}
              onChange={({value}) => {
                onChange(value);
              }}
              filterOption={({value}, searchValue) => {
                const {displayName} = countries.find(({countryCode}) => countryCode === value);

                return !displayName || displayName.toLowerCase().includes((searchValue || '').toLowerCase());
              }}
              placeholder={t('country_selector.title')}
              defaultMenuIsOpen={true}
              autoFocus={true}
              options={countries.map(({countryCode, displayName}) => ({
                value: countryCode,
                label: (
                  <div className={s.mobileOption}>
                    <span className={`${s.mobileFlag} fi fi-${countryCode.toLowerCase()}`}/>
                    {displayName}
                  </div>
                ),
              }))}
              defaultValue={selectedCountry}
            />
          }
        </div>
      </Content>
    )
  }
}

