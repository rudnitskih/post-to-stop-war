import React from 'react';
import s from './App.module.scss';
import './global.scss';
import {CountrySelector} from "./CountrySelector";
import {Messages} from "./Messages";
import {Main} from "./Main";
import {Info} from "./Info";
import {Footer} from "./Footer";
import {getCountryDisplayName} from "./localeUtils";
import {filterWrongMessages, loadSpreadsheet} from "./utils";
import {Gallery} from "./Gallery";
import {ModeSelector, ViewMode} from "./ModeSelector";
import * as Sentry from "@sentry/react";

const SELECTED_COUNTRY_KEY = 'selectedCountry';

export class App extends React.Component {
  state = {
    isReady: false,
    messages: {},
    countries: [],
    gallery: [],
    selectedMode: ViewMode.MESSAGES
  };

  async componentDidMount() {
    try {
      const [rawMessages, googleDriveUrls] = await Promise.all([
        loadSpreadsheet(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsewWgD4f1l2Zs5nS-ZrT7oQLo4XORX1xOBuw-xSx51t1lmYL_p5wtId4GsE8-jPIh6CBDrzqzW11g/pub?output=csv'
        ),
        loadSpreadsheet(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFb-ylDtmHAIzlBLulHm57kpFMIKcixeySaUEl1u-P-GTiJfPDf9LX_Lx5jxDUcRIKTGnKvxuCyOW4/pub?output=csv'
        ),
      ]);

      const messages = groupBy(filterWrongMessages(rawMessages), 'Country');
      const countries = Object.keys(messages)
        .map((countryCode) => {
          return {
            countryCode,
            displayName: getCountryDisplayName(countryCode),
          };
        })
        .sort((a, b) => a.displayName.localeCompare(b.displayName));

      const selectedCountry = localStorage.getItem(SELECTED_COUNTRY_KEY) || countries[0].countryCode;
      const gallery = Object.values(googleDriveUrls).map(({ID}) => ID.match(/\/d\/(.*)\//)[1]);

      this.setState({
        messages,
        countries,
        gallery,
        selectedCountry,
        isReady: true,
      });
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  setCountry = (country) => {
    this.setState({selectedCountry: country, selectedMode: ViewMode.MESSAGES});
    localStorage.setItem(SELECTED_COUNTRY_KEY, country);
  }

  render() {
    return (
      <div>
        <Main />

        {
          this.state.isReady && (
            <>
              <CountrySelector
                countries={this.state.countries}
                selectedCountry={this.state.selectedCountry}
                onChange={this.setCountry}
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

