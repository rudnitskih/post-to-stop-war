import React, {Component} from 'react';
import s from './CountrySelector.module.scss';
import 'flag-icons/css/flag-icons.min.css';
import classNames from 'classnames';
import {getCountryDisplayName} from "../helpers";
import {Content} from "../Content";

export class CountrySelector extends Component {
  render() {
    return (
      <Content>
        <h2 className={s.heading}>Обери країну (А-Я)</h2>

        <div className={s.content}>
          <div className={s.contentInner}>
            {
              this.props.countries
                .sort((a, b) => getCountryDisplayName(a).localeCompare(getCountryDisplayName(b)))
                .map((country) => {
                  return (
                    <button
                      key={country}
                      className={classNames(s.country, {
                        [s.selected]: this.props.selectedCountry === country,
                      })}
                      onClick={() => this.props.onChange(country)}
                    >
                      <span className={`${s.flag} fi fi-${country.toLowerCase()}`}/>
                      <span className={s.name}>{getCountryDisplayName(country)}</span>

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

