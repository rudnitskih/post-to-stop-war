import React from 'react';
import s from './App.module.scss';
import './global.scss';
import Papa from 'papaparse';
import {CountrySelector} from "./CountrySelector";
import {Messages} from "./Messages";

export class App extends React.Component {
  state = {
    isReady: false,
    messages: {},
    selectedCountry: 'DE',
  }

  componentDidMount() {
    const public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsewWgD4f1l2Zs5nS-ZrT7oQLo4XORX1xOBuw-xSx51t1lmYL_p5wtId4GsE8-jPIh6CBDrzqzW11g/pub?output=csv';

    Papa.parse(public_spreadsheet_url, {
      download: true,
      header: true,
      complete: (results) => {
        this.setState({
          messages: groupBy(results.data, 'Country'),
          isReady: true,
        })
       }
    });
  }

  render() {
    return (
      <div className={s.root}>

        <h3>Обери країну (А-Я)</h3>

        {
          this.state.isReady && (
            <>
              <CountrySelector
                countries={Object.keys(this.state.messages)}
                selectedCountry={this.state.selectedCountry}
                onChange={(country) => this.setState({selectedCountry: country})}
              />

              <Messages data={this.state.messages[this.state.selectedCountry]} selectedCountry={this.state.selectedCountry}/>
            </>
          )
        }


      </div>
    );
  }
}

// https://stackoverflow.com/a/34890276
const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default App;

