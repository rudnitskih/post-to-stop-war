import React, {Component} from 'react';
import s from './CountrySelector.module.scss';
import 'flag-icons/css/flag-icons.min.css';

const countryCodeToInfo = [
  {
    code: 'DE',
    name: 'Germany',
  },
  {
    code: 'CN',
    name: 'China'
  },
  {
    code: 'DK',
    name: 'Denmark'
  }
];

export class CountrySelector extends Component {
  render() {
    console.log(this.props.countries);

    return (
      <div className={s.root}>
        {
          this.props.countries.map((country) => {
            return (
              <button key={country} className={s.country}>
                <span className={`${s.flag} fi fi-${country.toLowerCase()}`} />

              </button>
            );
          })
        }
      </div>
    )
  }
}

