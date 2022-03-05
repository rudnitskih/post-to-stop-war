import React from 'react';
import s from './App.module.scss';
import './global.scss';
import Papa from 'papaparse';
import {CountrySelector} from "./CountrySelector";
import {Messages} from "./Messages";
import {Main} from "./Main";
import {Info} from "./Info";
import {Footer} from "./Footer";
import {getCountryDisplayName} from "./helpers";
import {Gallery} from "./Gallery";
import {ModeSelector, ViewMode} from "./ModeSelector";

export class App extends React.Component {
  state = {
    isReady: false,
    messages: {},
    countries: [],
    gallery: [],
    selectedMode: ViewMode.MESSAGES
  };

  componentDidMount() {
    const messages_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsewWgD4f1l2Zs5nS-ZrT7oQLo4XORX1xOBuw-xSx51t1lmYL_p5wtId4GsE8-jPIh6CBDrzqzW11g/pub?output=csv';

    const gallery_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFb-ylDtmHAIzlBLulHm57kpFMIKcixeySaUEl1u-P-GTiJfPDf9LX_Lx5jxDUcRIKTGnKvxuCyOW4/pub?output=csv';

    Papa.parse(messages_spreadsheet_url, {
      download: true,
      header: true,
      complete: (results) => {
        const messages = groupBy(results.data, 'Country');
        const countries = Object.keys(messages)
          .map((countryCode) => {
            return {
              countryCode,
              displayName: getCountryDisplayName(countryCode),
            };
          })
          .sort((a, b) => a.displayName.localeCompare(b.displayName));

        this.setState({
          messages,
          countries,
          selectedCountry: countries[0].countryCode,
          isReady: true,
        });
      }
    });

    Papa.parse(gallery_spreadsheet_url, {
      download: true,
      header: true,
      complete: (results) => {
        const gallery = Object.values(results.data).map(({ID}) => ID.match(/\/d\/(.*)\//)[1]);

        this.setState({
          gallery,
        });
      }
    });
  }

  render() {
    return (
      <div className={s.root}>
        <Main />

        {
          this.state.isReady && (
            <>
              <CountrySelector
                countries={this.state.countries}
                selectedCountry={this.state.selectedCountry}
                onChange={(country) => this.setState({selectedCountry: country, selectedMode: ViewMode.MESSAGES})}
              />

              <ModeSelector
                value={this.state.selectedMode}
                onChange={(selectedMode) => this.setState({selectedMode})}
              />

              <div className={s.mainInfo}>
                {
                  this.state.selectedMode === ViewMode.MESSAGES ? (
                    <Messages
                      data={this.state.messages[this.state.selectedCountry]}
                      selectedCountry={this.state.selectedCountry}
                    />
                  ) : (
                    <Gallery driveIds={this.state.gallery}/>
                  )
                }
              </div>
            </>
          )
        }

        <Info/>
        <Footer/>
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

