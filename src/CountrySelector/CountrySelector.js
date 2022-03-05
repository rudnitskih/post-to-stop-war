import React, {Component} from 'react';
import s from './CountrySelector.module.scss';
import 'flag-icons/css/flag-icons.min.css';
import classNames from 'classnames';
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

