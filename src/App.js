import React from 'react';
import s from './App.module.scss';
import Papa from 'papaparse';
import {CountrySelector} from "./CountrySelector";

export class App extends React.Component {
  state = {
    messages: {}
  }

  componentDidMount() {
    const public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsewWgD4f1l2Zs5nS-ZrT7oQLo4XORX1xOBuw-xSx51t1lmYL_p5wtId4GsE8-jPIh6CBDrzqzW11g/pub?output=csv';

    Papa.parse(public_spreadsheet_url, {
      download: true,
      header: true,
      complete: (results) => {
        this.setState({
          messages: groupBy(results.data, 'Country'),
        })
       }
    });
  }

  render() {
    return (
      <div className={s.root}>

        <h3>Choose the country (A-Z)</h3>
        <CountrySelector countries={Object.keys(this.state.messages)} />
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

