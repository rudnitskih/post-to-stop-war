import React, {Component} from 'react';
import s from './CountrySelector.module.scss';
import 'flag-icons/css/flag-icons.min.css';
import classNames from 'classnames';
import {getCountryDisplayName} from "../helpers";

export class CountrySelector extends Component {
  render() {
    console.log(this.props.countries);

    return (
      <div className={s.root}>
        {
          this.props.countries
            .sort((a, b) => getCountryDisplayName(a) > getCountryDisplayName(b) ? 1 : -1)
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
    )
  }
}

