import React from 'react';
import s from './App.module.scss';
import './global.scss';
import {CountrySelector} from "./CountrySelector";
import {Messages} from "./Messages";
import {Main} from "./Main";
import {Info} from "./Info";
import {Footer} from "./Footer";
import {getCountryDisplayName} from "./utils/localeUtils";
import {combineMessages, loadSpreadsheet} from "./utils/dataUtils";
import {Gallery} from "./Gallery";
import {ModeSelector, ViewMode} from "./ModeSelector";
import {logError} from "./utils/errorHandlingUtils";

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
      const [rawMessages, rawMessagesOfTheDay, googleDriveUrls] = await Promise.all([
        loadSpreadsheet('2PACX-1vRsewWgD4f1l2Zs5nS-ZrT7oQLo4XORX1xOBuw-xSx51t1lmYL_p5wtId4GsE8-jPIh6CBDrzqzW11g'),
        loadSpreadsheet('2PACX-1vSNHdspxZB5vCFxPXQzSmjSVeeYfu99andRTmljGxN94f6u1VlsU8-MB129shMSwNdhHf7pnPkl5VWB'),
        loadSpreadsheet('2PACX-1vRFb-ylDtmHAIzlBLulHm57kpFMIKcixeySaUEl1u-P-GTiJfPDf9LX_Lx5jxDUcRIKTGnKvxuCyOW4'),
      ]);

      const combinedMessages = combineMessages(rawMessages, rawMessagesOfTheDay);
      const countries = Object.keys(combinedMessages)
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
        messages: combinedMessages,
        countries,
        gallery,
        selectedCountry,
        isReady: true,
      });
    } catch (error) {
      logError(error);
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

export default App;

