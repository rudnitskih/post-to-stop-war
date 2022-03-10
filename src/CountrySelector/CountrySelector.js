import React, {Component} from 'react';
import s from './CountrySelector.module.scss';
import classNames from 'classnames';
import {Content} from "../Content";
import {t} from "../translate";

export class CountrySelector extends Component {
  render() {
    return (
      <Content>
        <h2 className={s.heading}>{t('country_selector.title')}</h2>

        <div className={s.content}>
          <div className={s.contentInner}>
            {
              this.props.countries
                .map(({countryCode, displayName}) => {
                  return (
                    <button
                      key={countryCode}
                      className={classNames(s.country, {
                        [s.selected]: this.props.selectedCountry === countryCode,
                      })}
                      onClick={() => this.props.onChange(countryCode)}
                    >
                      <span className={`${s.flag} fi fi-${countryCode.toLowerCase()}`}/>
                      <span className={s.name}>{displayName}</span>

                    </button>
                  );
                })
            }
          </div>
        </div>
      </Content>
    )
  }
}

